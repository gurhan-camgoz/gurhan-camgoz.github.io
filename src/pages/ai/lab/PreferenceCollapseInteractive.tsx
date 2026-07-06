import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Info, RotateCcw, ArrowRight } from 'lucide-react';

export interface DimensionScores {
    narrativeDiscipline: number;
    productiveDefamiliarization: number;
    analyticalGrounding: number;
    ethicalScrutiny: number;
    creativeSynthesis: number;
}

export type DimensionKey = keyof DimensionScores;

export interface PreferenceItem {
    id: string;
    /** Public data ships synthetic-tier items only; the union keeps the door open. */
    tier: 'human' | 'synthetic';
    /** Dimension scores are author-assigned during curation — illustrative, not study data. */
    scoring: 'author';
    vignette: string;
    responseA: string;
    responseB: string;
    scores: { A: DimensionScores; B: DimensionScores };
    originalSelection: 'A' | 'B' | 'Ambiguous';
    feedbackComment: string;
    thesisRef?: string;
}

export interface PreferenceExplorerData {
    /** Item ids whose winner flips under a plausible dimension reweighting. */
    featured: string[];
    meta: {
        tier: string;
        scoring: string;
        curation: string;
    };
    items: PreferenceItem[];
}

type Side = 'A' | 'B';
type Choice = Side | 'Ambiguous';
type Winner = Side | 'tie' | null;

interface DimensionMeta {
    key: DimensionKey;
    label: string;
    /**
     * 'robust': theorized AND visible in the k=3 empirical structure.
     * 'emergent': present in under 9% of human feedback — context-dependent.
     */
    group: 'robust' | 'emergent';
    /** Presence in the human-study feedback (thesis figures). */
    presence: string;
}

const DIMENSIONS: DimensionMeta[] = [
    { key: 'narrativeDiscipline', label: 'Narrative Discipline', group: 'robust', presence: '50.8%' },
    { key: 'productiveDefamiliarization', label: 'Productive Defamiliarization', group: 'robust', presence: '43.0%' },
    { key: 'analyticalGrounding', label: 'Analytical Grounding', group: 'robust', presence: '42.0%' },
    { key: 'ethicalScrutiny', label: 'Ethical Scrutiny', group: 'emergent', presence: '8.8%' },
    { key: 'creativeSynthesis', label: 'Creative Synthesis', group: 'emergent', presence: '6.1%' },
];

const EQUAL_WEIGHTS: DimensionScores = {
    narrativeDiscipline: 5,
    productiveDefamiliarization: 5,
    analyticalGrounding: 5,
    ethicalScrutiny: 5,
    creativeSynthesis: 5,
};

function cloneScores(scores: { A: DimensionScores; B: DimensionScores }) {
    return { A: { ...scores.A }, B: { ...scores.B } };
}

function weightedReward(scores: DimensionScores, weights: DimensionScores): number | null {
    const totalWeight = DIMENSIONS.reduce((sum, d) => sum + weights[d.key], 0);
    if (totalWeight === 0) return null;
    const weightedSum = DIMENSIONS.reduce((sum, d) => sum + weights[d.key] * scores[d.key], 0);
    return weightedSum / totalWeight;
}

function LabSlider({
    label,
    value,
    accent,
    onChange,
}: {
    label: string;
    value: number;
    accent: string;
    onChange: (value: number) => void;
}) {
    return (
        <div className="flex items-center gap-2 min-w-0 flex-1">
            <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={value}
                aria-label={label}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full min-w-0 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                style={{ accentColor: accent }}
            />
            <span className="text-xs text-slate-300 tabular-nums w-5 text-right shrink-0" aria-hidden="true">
                {value}
            </span>
        </div>
    );
}

function RewardCard({
    side,
    value,
    isWinner,
    sweep,
    reduced,
}: {
    side: Side;
    value: number | null;
    isWinner: boolean;
    sweep: { side: Side; n: number } | null;
    reduced: boolean;
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-lg border p-4 transition-colors ${
                isWinner ? 'bg-slate-800/40' : 'border-slate-800 bg-slate-800/10'
            }`}
            style={isWinner ? { borderColor: 'var(--lab-teal)' } : undefined}
        >
            {!reduced && sweep && sweep.side === side && isWinner && (
                <motion.div
                    key={sweep.n}
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-110%', opacity: 0.9 }}
                    animate={{ x: '110%', opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                        background:
                            'linear-gradient(100deg, transparent 20%, color-mix(in srgb, var(--lab-yellow) 30%, transparent) 50%, transparent 80%)',
                    }}
                    aria-hidden="true"
                />
            )}
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase tracking-widest text-slate-400">Response {side}</span>
                {isWinner && (
                    <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                            background: 'color-mix(in srgb, var(--lab-teal) 25%, transparent)',
                            color: 'var(--lab-teal-text)',
                        }}
                    >
                        WINNER
                    </span>
                )}
            </div>
            <div className="text-2xl font-bold tabular-nums text-slate-100">
                {value === null ? '—' : value.toFixed(2)}
            </div>
        </div>
    );
}

/**
 * The interactive area of the Preference Collapse Explorer. Everything here
 * runs client-side: the only live computation is the weighted scalar reward
 * and the A/B winner, recomputed on every slider move.
 */
export function PreferenceCollapseInteractive({ data }: { data: PreferenceExplorerData }) {
    const reduced = useReducedMotion() ?? false;

    const [index, setIndex] = useState(0);
    const item = data.items[index];

    const [choice, setChoice] = useState<Choice | null>(null);
    const [scores, setScores] = useState(() => cloneScores(item.scores));
    const [weights, setWeights] = useState<DimensionScores>({ ...EQUAL_WEIGHTS });
    const [groupNoteOpen, setGroupNoteOpen] = useState(false);

    const rewardA = useMemo(() => weightedReward(scores.A, weights), [scores, weights]);
    const rewardB = useMemo(() => weightedReward(scores.B, weights), [scores, weights]);

    const winner: Winner = useMemo(() => {
        if (rewardA === null || rewardB === null) return null;
        if (rewardA === rewardB) return 'tie';
        return rewardA > rewardB ? 'A' : 'B';
    }, [rewardA, rewardB]);

    // Winner-flip detection: one orchestrated sweep on the new winner, only
    // when an actual A<->B flip happens after the reveal is open.
    const prevWinnerRef = useRef<Winner>(null);
    const [sweep, setSweep] = useState<{ side: Side; n: number } | null>(null);
    useEffect(() => {
        if (!choice) {
            prevWinnerRef.current = null;
            setSweep(null);
            return;
        }
        const prev = prevWinnerRef.current;
        if ((prev === 'A' || prev === 'B') && (winner === 'A' || winner === 'B') && winner !== prev) {
            setSweep((s) => ({ side: winner, n: (s?.n ?? 0) + 1 }));
        }
        prevWinnerRef.current = winner;
    }, [choice, winner]);

    function goToNext() {
        const next = (index + 1) % data.items.length;
        setIndex(next);
        setChoice(null);
        setScores(cloneScores(data.items[next].scores));
        // Weights deliberately persist across vignettes: the point is to watch
        // one weighting regime judge different material.
    }

    function setScore(side: Side, dim: DimensionKey, value: number) {
        setScores((prev) => ({ ...prev, [side]: { ...prev[side], [dim]: value } }));
    }

    const revealBlock = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.4 } },
    };

    const choiceButtonClass = (active: boolean, accent: 'blue' | 'yellow') => {
        const base =
            'px-4 py-2 rounded border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';
        if (active) {
            return accent === 'yellow'
                ? `${base} border-[color:var(--lab-yellow)] text-[color:var(--lab-yellow)] bg-slate-800/60 font-bold`
                : `${base} border-blue-400 text-blue-300 bg-slate-800/60 font-bold`;
        }
        return `${base} border-slate-700 text-slate-300 hover:border-blue-500/60 hover:text-blue-300`;
    };

    const isFeatured = data.featured.includes(item.id);
    const rejected: Side | null = choice === 'A' ? 'B' : choice === 'B' ? 'A' : null;

    return (
        <div className="space-y-6">
            {/* Vignette header: counter + next */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 tracking-widest uppercase">
                        Vignette {index + 1} / {data.items.length}
                    </span>
                    <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                        style={{
                            borderColor: 'color-mix(in srgb, var(--lab-violet-text) 50%, transparent)',
                            color: 'var(--lab-violet-text)',
                        }}
                    >
                        SYNTHETIC TIER
                    </span>
                    {item.thesisRef && (
                        <span className="text-[10px] text-slate-500 border border-slate-800 px-2 py-0.5 rounded-full">
                            {item.thesisRef}
                        </span>
                    )}
                </div>
                <button
                    type="button"
                    onClick={goToNext}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-blue-300 border border-slate-700 hover:border-blue-500/60 rounded px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                    Next vignette
                    <ArrowRight size={14} aria-hidden="true" />
                </button>
            </div>

            {/* The vignette */}
            <div className="border border-slate-800 rounded-lg p-5 bg-slate-800/20">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Fieldnote vignette</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{item.vignette}</p>
            </div>

            {/* The two responses, presented like the original experiment UI */}
            <div className="grid md:grid-cols-2 gap-4">
                {(['A', 'B'] as const).map((side) => (
                    <div
                        key={`${item.id}-${side}`}
                        className={`border rounded-lg p-5 bg-slate-800/10 ${
                            choice === side ? 'border-blue-500/60' : 'border-slate-800'
                        }`}
                    >
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Response {side}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                            {side === 'A' ? item.responseA : item.responseB}
                        </p>
                    </div>
                ))}
            </div>

            {/* The judgment */}
            <div>
                <p className="text-sm text-slate-300 mb-3">
                    {choice ? 'Your judgment (change it freely):' : 'Which response is the better colleague?'}
                </p>
                <div className="flex flex-wrap gap-3" role="group" aria-label="Choose the better response">
                    <button type="button" aria-pressed={choice === 'A'} onClick={() => setChoice('A')} className={choiceButtonClass(choice === 'A', 'blue')}>
                        A is better
                    </button>
                    <button type="button" aria-pressed={choice === 'B'} onClick={() => setChoice('B')} className={choiceButtonClass(choice === 'B', 'blue')}>
                        B is better
                    </button>
                    <button
                        type="button"
                        aria-pressed={choice === 'Ambiguous'}
                        onClick={() => setChoice('Ambiguous')}
                        className={choiceButtonClass(choice === 'Ambiguous', 'yellow')}
                    >
                        Ambiguous
                    </button>
                </div>
            </div>

            {/* The reveal */}
            {choice && (
                <motion.div
                    key={`${item.id}-${choice}`}
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: reduced ? 0 : 0.3, delayChildren: reduced ? 0 : 0.1 } },
                    }}
                    className="space-y-6"
                >
                    {/* 01 — the bit */}
                    <motion.section variants={revealBlock} className="border border-slate-800 rounded-lg p-5 bg-slate-900/60">
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                            01 · What the dataset keeps
                        </h3>
                        {choice === 'Ambiguous' ? (
                            <>
                                <pre className="text-xs text-slate-400 bg-slate-950/60 border border-slate-800 rounded p-3 overflow-x-auto">
                                    {`preference_pairs.jsonl    — write failed\n{"prompt": "${item.id}", "chosen": ???, "rejected": ???}`}
                                </pre>
                                <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--lab-yellow)' }}>
                                    The chosen/rejected pair format has no field for "Ambiguous." In the original human
                                    study, 46.9% of judgments hit this wall.
                                </p>
                            </>
                        ) : (
                            <>
                                <pre className="text-xs text-slate-400 bg-slate-950/60 border border-slate-800 rounded p-3 overflow-x-auto">
                                    {`preference_pairs.jsonl    +1 row\n{"prompt": "${item.id}", "chosen": "response_${choice.toLowerCase()}", "rejected": "response_${rejected!.toLowerCase()}"}`}
                                </pre>
                                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                                    Everything you just weighed — tone, ethics, analytical grip — collapsed into one bit.
                                </p>
                            </>
                        )}
                    </motion.section>

                    {/* 02 — the five dimensions */}
                    <motion.section variants={revealBlock} className="border border-slate-800 rounded-lg p-5 bg-slate-800/10">
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                            <h3 className="text-xs uppercase tracking-widest text-slate-500">
                                02 · What your judgment contained
                            </h3>
                            <button
                                type="button"
                                aria-expanded={groupNoteOpen}
                                onClick={() => setGroupNoteOpen((open) => !open)}
                                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                            >
                                <Info size={12} aria-hidden="true" />
                                robust vs. emergent?
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">
                            Vector-HCAS scores per response, 0–10. Author-assigned for illustration — nudge them if you
                            disagree.
                        </p>
                        {groupNoteOpen && (
                            <p className="text-xs text-slate-400 leading-relaxed border border-slate-800 rounded p-3 mb-4 bg-slate-900/40">
                                In the human study, Narrative Discipline (50.8%), Productive Defamiliarization (43.0%)
                                and Analytical Grounding (42.0%) appeared robustly across contexts. Ethical Scrutiny
                                (8.8%) and Creative Synthesis (6.1%) surfaced only where the vignette invited them —
                                emergent rather than universal. Dashed tracks mark the emergent pair.
                            </p>
                        )}

                        <div className="hidden md:grid md:grid-cols-[220px_1fr_1fr] gap-x-6 mb-2 text-[11px] uppercase tracking-widest text-slate-500">
                            <span>Dimension</span>
                            <span>Response A</span>
                            <span>Response B</span>
                        </div>
                        <div className="space-y-3">
                            {DIMENSIONS.map((dim) => {
                                const emergent = dim.group === 'emergent';
                                const accent = emergent ? 'var(--lab-yellow)' : 'var(--lab-teal)';
                                return (
                                    <div
                                        key={dim.key}
                                        className={`md:grid md:grid-cols-[220px_1fr_1fr] gap-x-6 gap-y-1 items-center rounded px-2 py-1.5 border-l-2 ${
                                            emergent ? 'border-dashed' : ''
                                        }`}
                                        style={{ borderLeftColor: emergent ? 'var(--lab-yellow)' : 'var(--lab-violet-text)' }}
                                    >
                                        <span className="block text-sm text-slate-300 mb-1 md:mb-0">
                                            {dim.label}
                                            <span className="text-slate-500 text-xs ml-1.5">{dim.presence}</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="md:hidden text-xs text-slate-500 w-3" aria-hidden="true">A</span>
                                            <LabSlider
                                                label={`Response A score: ${dim.label}`}
                                                value={scores.A[dim.key]}
                                                accent={accent}
                                                onChange={(v) => setScore('A', dim.key, v)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="md:hidden text-xs text-slate-500 w-3" aria-hidden="true">B</span>
                                            <LabSlider
                                                label={`Response B score: ${dim.label}`}
                                                value={scores.B[dim.key]}
                                                accent={accent}
                                                onChange={(v) => setScore('B', dim.key, v)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* 03 — reweight and watch the winner */}
                    <motion.section variants={revealBlock} className="border border-slate-800 rounded-lg p-5 bg-slate-800/10">
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                            <h3 className="text-xs uppercase tracking-widest text-slate-500">
                                03 · Re-weight what matters
                            </h3>
                            {isFeatured && (
                                <span className="text-[11px]" style={{ color: 'var(--lab-yellow)' }}>
                                    hint: this pair flips under a plausible re-weighting
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mb-4">
                            The reward model sees one scalar per response:{' '}
                            <span className="text-slate-400">r = Σ (weight × score) / Σ weight</span>. Decide what
                            matters and watch the winner.
                        </p>

                        <div className="grid md:grid-cols-[1fr_240px] gap-6">
                            <div className="space-y-3">
                                {DIMENSIONS.map((dim) => {
                                    const emergent = dim.group === 'emergent';
                                    return (
                                        <div key={dim.key} className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1">
                                            <span className="text-sm text-slate-300 sm:w-[220px] shrink-0">
                                                {dim.label} <span className="text-slate-500 text-xs">weight</span>
                                            </span>
                                            <LabSlider
                                                label={`Weight: ${dim.label}`}
                                                value={weights[dim.key]}
                                                accent={emergent ? 'var(--lab-yellow)' : 'var(--lab-teal)'}
                                                onChange={(v) => setWeights((prev) => ({ ...prev, [dim.key]: v }))}
                                            />
                                        </div>
                                    );
                                })}
                                <button
                                    type="button"
                                    onClick={() => setWeights({ ...EQUAL_WEIGHTS })}
                                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 transition-colors mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    <RotateCcw size={12} aria-hidden="true" />
                                    Reset to equal weights
                                </button>
                            </div>

                            <div aria-live="polite" className="grid grid-cols-2 md:grid-cols-1 gap-3 content-start">
                                <RewardCard side="A" value={rewardA} isWinner={winner === 'A'} sweep={sweep} reduced={reduced} />
                                <RewardCard side="B" value={rewardB} isWinner={winner === 'B'} sweep={sweep} reduced={reduced} />
                                {winner === 'tie' && (
                                    <p className="text-xs text-slate-500 col-span-2 md:col-span-1">
                                        Dead heat — the scalar can't separate them.
                                    </p>
                                )}
                                {winner === null && (
                                    <p className="text-xs text-slate-500 col-span-2 md:col-span-1">
                                        All weights are zero — no signal left to rank with.
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.section>

                    {/* What the dataset actually recorded for this pair */}
                    <motion.section variants={revealBlock} className="border border-slate-800 rounded-lg p-5 bg-slate-800/10">
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                            What the dataset recorded for this pair
                        </h3>
                        <p className="text-sm text-slate-400">
                            <span className="text-slate-300">Selection:</span> {item.originalSelection}
                        </p>
                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                            <span className="text-slate-300">Annotation (synthetic tier):</span> "{item.feedbackComment}"
                        </p>
                    </motion.section>
                </motion.div>
            )}

            {/* Stat strip — always visible; required copy from the data policy */}
            <div
                className="border-l-2 pl-4 py-1 text-xs text-slate-400 leading-relaxed"
                style={{ borderColor: 'var(--lab-yellow)' }}
            >
                In the original human study (n=64 judgments, 7 participants), 46.9% of selections were "Ambiguous" —
                participants resisting the binary. The vignettes shown here are from the study's synthetic tier,
                generated by a human-seeded pipeline; dimension scores are author-assigned for illustration.
            </div>
        </div>
    );
}
