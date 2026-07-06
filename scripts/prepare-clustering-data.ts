/**
 * prepare-clustering-data.ts — dev-only, never bundled (tsconfig includes src/ only).
 *
 * Converts the thesis repo's synthetic-tier JSONL
 * (ethno-colleague-llm/data-scaling/synthetic_dataset.jsonl) into the shape
 * served at public/data/clustering.json: TF-IDF vectorization and 2-D PCA of
 * feedback comments, done OFFLINE here. Only k-means runs live in the browser.
 *
 * Usage:
 *   npx tsx scripts/prepare-clustering-data.ts <input.jsonl> [options]
 *
 * Options:
 *   --out <path>   Output path (default: public/data/clustering.json)
 *   --force        Allow overwriting an existing output file
 *
 * DATA POLICY (synthetic tier only — see src/components/ai/lab/README.md):
 * the provenance guard fail-closes exactly like prepare-preference-data.ts —
 * records not explicitly marked synthetic are excluded with a warning. The
 * anonymize screen here is always on: points whose comment matches a
 * name/email/phone/URL pattern are EXCLUDED (not just flagged) and printed
 * for manual review, since this script's output ships wholesale rather than
 * being hand-curated afterwards.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import * as process from 'node:process';

interface RawSyntheticRecord {
    feedback_comment?: string;
    participant_id?: string;
}

function isExplicitlySynthetic(record: RawSyntheticRecord): boolean {
    return String(record.participant_id ?? '').toLowerCase().startsWith('synthetic');
}

const ANONYMIZE_CHECKS: { name: string; re: RegExp }[] = [
    { name: 'email', re: /[\w.+-]+@[\w-]+\.[\w.]{2,}/ },
    { name: 'url', re: /https?:\/\/\S+/ },
    { name: 'phone-like', re: /\+?\d[\d ()\-./]{7,}\d/ },
    { name: 'honorific + name', re: /\b(?:Dr|Prof|Professor|Mr|Mrs|Ms)\.? +[A-Z][a-z]+/ },
    // Deliberately noisy — better to drop a "New York" than ship a name.
    { name: 'possible full name', re: /\b[A-Z][a-z]{2,} +[A-Z][a-z]{2,}\b/ },
];

const STOPWORDS = new Set(
    (
        'a an and are as at be been being but by can could did do does doing for from had has have having he her hers him his how i if in into is it its itself just me more most my no nor not of off on once only or other our ours out over own same she should so some such than that the their theirs them then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours ' +
        // Domain boilerplate that appears in nearly every feedback comment and
        // carries no discriminative weight.
        'response responses better worse both neither'
    ).split(/\s+/),
);

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z]+/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

/** Power iteration for the top principal component of centered matrix X (n×d). */
function topComponent(X: number[][], d: number, iterations = 200): number[] {
    let v = Array.from({ length: d }, (_, i) => Math.sin(i + 1)); // deterministic init
    for (let iter = 0; iter < iterations; iter++) {
        // w = X^T (X v)  — proportional to covariance · v
        const Xv = X.map((row) => row.reduce((s, x, j) => s + x * v[j], 0));
        const w = new Array<number>(d).fill(0);
        X.forEach((row, i) => {
            const scale = Xv[i];
            for (let j = 0; j < d; j++) w[j] += row[j] * scale;
        });
        const norm = Math.hypot(...w);
        if (norm === 0) break;
        v = w.map((x) => x / norm);
    }
    return v;
}

function main() {
    const args = process.argv.slice(2);
    const inputPath = args.find((a) => !a.startsWith('--'));
    if (!inputPath) {
        console.error('Usage: npx tsx scripts/prepare-clustering-data.ts <input.jsonl> [--out <path>] [--force]');
        process.exit(1);
    }
    const outFlagIndex = args.indexOf('--out');
    const outPath = outFlagIndex !== -1 ? args[outFlagIndex + 1] : 'public/data/clustering.json';
    if (existsSync(outPath) && !args.includes('--force')) {
        console.error(`Refusing to overwrite ${outPath}. Pass --force to overwrite.`);
        process.exit(1);
    }

    const lines = readFileSync(inputPath, 'utf8').split('\n').filter((l) => l.trim() !== '');

    interface Doc {
        id: string;
        comment: string;
        tokens: string[];
    }
    const docs: Doc[] = [];
    const seenComments = new Set<string>();
    let excludedProvenance = 0;
    let excludedEmpty = 0;
    let excludedDuplicate = 0;
    let excludedFlagged = 0;

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
                `  [EXCLUDED — provenance guard] line ${lineNo}: participant_id="${record.participant_id ?? '(missing)'}" is not explicitly synthetic.`,
            );
            excludedProvenance++;
            return;
        }
        const comment = record.feedback_comment?.trim() ?? '';
        if (comment.length < 10) {
            excludedEmpty++;
            return;
        }
        if (seenComments.has(comment)) {
            excludedDuplicate++;
            return;
        }
        const flagged = ANONYMIZE_CHECKS.find((c) => c.re.test(comment));
        if (flagged) {
            console.warn(`  [EXCLUDED — anonymize screen] line ${lineNo} (${flagged.name}): "${comment.slice(0, 90)}"`);
            excludedFlagged++;
            return;
        }
        seenComments.add(comment);
        docs.push({ id: `c-${String(lineNo).padStart(3, '0')}`, comment, tokens: tokenize(comment) });
    });

    console.log(
        `Read ${lines.length} records: ${docs.length} comments kept, ${excludedProvenance} excluded by provenance guard, ${excludedFlagged} excluded by anonymize screen, ${excludedDuplicate} exact duplicates dropped, ${excludedEmpty} empty/too short.`,
    );

    // --- TF-IDF ---
    const df = new Map<string, number>();
    for (const doc of docs) {
        for (const term of new Set(doc.tokens)) df.set(term, (df.get(term) ?? 0) + 1);
    }
    // Keep terms appearing in >=3 docs but not in more than 60% of them.
    const vocab = [...df.entries()]
        .filter(([, n]) => n >= 3 && n <= docs.length * 0.6)
        .map(([term]) => term)
        .sort();
    const vocabIndex = new Map(vocab.map((t, i) => [t, i]));
    const N = docs.length;
    const d = vocab.length;
    console.log(`Vocabulary: ${d} terms (df >= 3, df <= 60%).`);

    const matrix: number[][] = [];
    const docTopTerms: string[][] = [];
    for (const doc of docs) {
        const row = new Array<number>(d).fill(0);
        const counts = new Map<string, number>();
        for (const t of doc.tokens) counts.set(t, (counts.get(t) ?? 0) + 1);
        const weighted: [string, number][] = [];
        for (const [term, count] of counts) {
            const j = vocabIndex.get(term);
            if (j === undefined) continue;
            const tfidf = (count / Math.max(doc.tokens.length, 1)) * Math.log(N / (1 + df.get(term)!));
            row[j] = tfidf;
            weighted.push([term, tfidf]);
        }
        const norm = Math.hypot(...row);
        if (norm > 0) for (let j = 0; j < d; j++) row[j] /= norm;
        matrix.push(row);
        docTopTerms.push(
            weighted
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([term]) => term),
        );
    }

    // --- PCA to 2-D (mean-center, power iteration with deflation) ---
    const mean = new Array<number>(d).fill(0);
    for (const row of matrix) for (let j = 0; j < d; j++) mean[j] += row[j] / N;
    const centered = matrix.map((row) => row.map((x, j) => x - mean[j]));

    const pc1 = topComponent(centered, d);
    const proj1 = centered.map((row) => row.reduce((s, x, j) => s + x * pc1[j], 0));
    const deflated = centered.map((row, i) => row.map((x, j) => x - proj1[i] * pc1[j]));
    const pc2 = topComponent(deflated, d);
    const proj2 = centered.map((row) => row.reduce((s, x, j) => s + x * pc2[j], 0));

    // Scale both axes by the same factor so relative variance is preserved.
    const maxAbs = Math.max(...proj1.map(Math.abs), ...proj2.map(Math.abs));
    const points = docs.map((doc, i) => ({
        id: doc.id,
        x: Number((proj1[i] / maxAbs).toFixed(4)),
        y: Number((proj2[i] / maxAbs).toFixed(4)),
        comment: doc.comment,
        topTerms: docTopTerms[i],
    }));

    const output = {
        points,
        precomputed: {
            tfidfNote:
                `TF-IDF (${d}-term vocabulary, df in [3, 60%], L2-normalized) and 2-D PCA computed offline by scripts/prepare-clustering-data.ts over ${N} unique synthetic-tier feedback comments. Coordinates are the first two principal components on a shared scale. Only k-means runs live in the browser.`,
        },
    };

    writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');
    console.log(`Wrote ${points.length} points to ${outPath}.`);
}

main();
