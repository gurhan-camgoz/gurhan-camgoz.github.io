/**
 * prepare-preference-data.ts — dev-only, never bundled (tsconfig includes src/ only).
 *
 * Converts the thesis repo's synthetic-tier JSONL
 * (ethno-colleague-llm/data-scaling/synthetic_dataset.jsonl) into the shape
 * served at public/data/preference-explorer.json.
 *
 * Usage:
 *   npx tsx scripts/prepare-preference-data.ts <input.jsonl> [options]
 *
 * Options:
 *   --out <path>        Output path (default: public/data/preference-explorer.json)
 *   --force             Allow overwriting an existing output file
 *   --anonymize-check   Scan text fields for names/emails/phones/URLs and flag
 *                       them for manual review; exits 1 if anything is flagged.
 *
 * DATA POLICY (Phase 3 addendum — synthetic tier only): the public demo ships
 * only synthetic-tier items. This script hard-excludes any record whose
 * provenance does not explicitly mark it as synthetic (fail closed): records
 * with a human participant id, or with no provenance at all, are dropped with
 * a warning. Human-study findings are cited as statistics in the UI, never
 * shipped as data. Run --anonymize-check anyway — synthetic text can echo
 * seed content.
 *
 * After conversion, curation is manual: pick 5–8 items, assign the 0–10
 * author scores per Vector-HCAS dimension (this script writes zeros), and
 * list flip-verified item ids in `featured`.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import * as process from 'node:process';

interface RawResponse {
    temperature?: number;
    text?: string;
}

interface RawSyntheticRecord {
    prompt?: string;
    response_a?: RawResponse;
    response_b?: RawResponse;
    selection?: string;
    feedback_comment?: string;
    participant_id?: string;
}

interface DimensionScores {
    narrativeDiscipline: number;
    productiveDefamiliarization: number;
    analyticalGrounding: number;
    ethicalScrutiny: number;
    creativeSynthesis: number;
}

interface OutputItem {
    id: string;
    tier: 'synthetic';
    scoring: 'author';
    vignette: string;
    responseA: string;
    responseB: string;
    scores: { A: DimensionScores; B: DimensionScores };
    originalSelection: 'A' | 'B' | 'Ambiguous';
    feedbackComment: string;
}

const ZERO_SCORES: DimensionScores = {
    narrativeDiscipline: 0,
    productiveDefamiliarization: 0,
    analyticalGrounding: 0,
    ethicalScrutiny: 0,
    creativeSynthesis: 0,
};

/**
 * Hard guard: include ONLY records whose provenance explicitly marks them as
 * synthetic. In the thesis JSONL, synthetic records carry
 * participant_id: "Synthetic_Generator_V1"; human-study records carry real
 * participant codes. Missing/unknown provenance fails closed.
 */
function isExplicitlySynthetic(record: RawSyntheticRecord): boolean {
    return String(record.participant_id ?? '').toLowerCase().startsWith('synthetic');
}

const ANONYMIZE_CHECKS: { name: string; re: RegExp }[] = [
    { name: 'email', re: /[\w.+-]+@[\w-]+\.[\w.]{2,}/g },
    { name: 'url', re: /https?:\/\/\S+/g },
    { name: 'phone-like', re: /\+?\d[\d ()\-./]{7,}\d/g },
    { name: 'honorific + name', re: /\b(?:Dr|Prof|Professor|Mr|Mrs|Ms)\.? +[A-Z][a-z]+/g },
    // Two consecutive capitalized words: noisy on purpose ("New York" will
    // match) — this pass flags candidates for manual review, it doesn't decide.
    { name: 'possible full name', re: /\b[A-Z][a-z]{2,} +[A-Z][a-z]{2,}\b/g },
];

function runAnonymizeCheck(items: OutputItem[]): number {
    let flags = 0;
    for (const item of items) {
        const fields: [string, string][] = [
            ['vignette', item.vignette],
            ['responseA', item.responseA],
            ['responseB', item.responseB],
            ['feedbackComment', item.feedbackComment],
        ];
        for (const [field, text] of fields) {
            for (const check of ANONYMIZE_CHECKS) {
                for (const match of text.matchAll(check.re)) {
                    console.warn(`  [anonymize-check] ${item.id} · ${field} · ${check.name}: "${match[0]}"`);
                    flags++;
                }
            }
        }
    }
    return flags;
}

function main() {
    const args = process.argv.slice(2);
    const inputPath = args.find((a) => !a.startsWith('--'));
    if (!inputPath) {
        console.error('Usage: npx tsx scripts/prepare-preference-data.ts <input.jsonl> [--out <path>] [--force] [--anonymize-check]');
        process.exit(1);
    }
    const outFlagIndex = args.indexOf('--out');
    const outPath = outFlagIndex !== -1 ? args[outFlagIndex + 1] : 'public/data/preference-explorer.json';
    const force = args.includes('--force');
    const anonymizeCheck = args.includes('--anonymize-check');

    if (existsSync(outPath) && !force) {
        console.error(`Refusing to overwrite ${outPath} — it may contain curated, author-scored items. Pass --force to overwrite.`);
        process.exit(1);
    }

    const lines = readFileSync(inputPath, 'utf8').split('\n').filter((l) => l.trim() !== '');

    const items: OutputItem[] = [];
    let excludedProvenance = 0;
    let excludedEmpty = 0;

    lines.forEach((line, i) => {
        const lineNo = i + 1;
        let record: RawSyntheticRecord;
        try {
            record = JSON.parse(line) as RawSyntheticRecord;
        } catch {
            console.warn(`  [skip] line ${lineNo}: not valid JSON`);
            return;
        }

        if (!isExplicitlySynthetic(record)) {
            console.warn(
                `  [EXCLUDED — provenance guard] line ${lineNo}: participant_id="${record.participant_id ?? '(missing)'}" is not explicitly synthetic. Human-seed and unmarked records never ship.`,
            );
            excludedProvenance++;
            return;
        }

        const vignette = record.prompt?.trim() ?? '';
        const responseA = record.response_a?.text?.trim() ?? '';
        const responseB = record.response_b?.text?.trim() ?? '';
        if (!vignette || !responseA || !responseB) {
            excludedEmpty++;
            return;
        }

        const selection = record.selection === 'A' || record.selection === 'B' ? record.selection : 'Ambiguous';

        items.push({
            id: `synthetic-${String(lineNo).padStart(3, '0')}`,
            tier: 'synthetic',
            scoring: 'author',
            vignette,
            responseA,
            responseB,
            scores: { A: { ...ZERO_SCORES }, B: { ...ZERO_SCORES } },
            originalSelection: selection,
            feedbackComment: record.feedback_comment?.trim() ?? '',
        });
    });

    console.log(`Read ${lines.length} records: ${items.length} converted, ${excludedProvenance} excluded by provenance guard, ${excludedEmpty} skipped (empty prompt/response).`);

    if (anonymizeCheck) {
        console.log('Running anonymize check…');
        const flags = runAnonymizeCheck(items);
        if (flags > 0) {
            console.error(`\n${flags} potential identifier(s) flagged. Review manually before shipping — when in doubt, drop the item. No file written.`);
            process.exit(1);
        }
        console.log('No identifiers flagged.');
    }

    const output = {
        featured: [] as string[],
        meta: {
            tier: 'synthetic-448 augmentation tier (few-shot generated from the 64-instance human seed set)',
            scoring: 'Author-scored, 0-10 per Vector-HCAS dimension per response, following the thesis coding rubric.',
            curation: 'Converted by scripts/prepare-preference-data.ts — curation pending: select 5-8 items, assign author scores (currently zeros), verify featured flips.',
        },
        items,
    };

    writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');
    console.log(`Wrote ${items.length} items to ${outPath}.`);
    console.log('Next: curate 5-8 items, replace the zero scores with author scores, and fill `featured` with flip-verified ids.');
}

main();
