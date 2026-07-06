import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { kMeans, elbowCurve, type Point2D } from './kmeans';

export interface ClusterPoint {
    id: string;
    x: number;
    y: number;
    comment: string;
    topTerms: string[];
}

export interface ClusteringData {
    points: ClusterPoint[];
    precomputed: { tfidfNote: string };
}

/** Thesis cluster-figure palette, used verbatim at k=3. */
const THESIS_3 = ['#472d7b', '#21918c', '#f4e04d'];
/** Standard viridis stops, sampled evenly for other k. */
const VIRIDIS_8 = ['#440154', '#46327e', '#365c8d', '#277f8e', '#1fa187', '#4ac16d', '#a0da39', '#fde725'];

function clusterColors(k: number): string[] {
    if (k === 3) return THESIS_3;
    if (k <= 1) return [VIRIDIS_8[0]];
    return Array.from({ length: k }, (_, i) => VIRIDIS_8[Math.round((i * (VIRIDIS_8.length - 1)) / (k - 1))]);
}

const EMPIRICAL_CLUSTERS = [
    'response quality & context handling',
    'analytical vs. narrative balance',
    'questioning competence',
];

const THEORETICAL_DIMENSIONS = [
    ['Narrative Discipline', '50.8%'],
    ['Productive Defamiliarization', '43.0%'],
    ['Analytical Grounding', '42.0%'],
    ['Ethical Scrutiny', '8.8%'],
    ['Creative Synthesis', '6.1%'],
] as const;

const K_MIN = 2;
const K_MAX = 8;
const DEFAULT_SEED = 42;

/** Scatter drawing area in viewBox units. */
const PLOT = { w: 640, h: 460, pad: 24 };

export function FeedbackClusteringInteractive({ data }: { data: ClusteringData }) {
    const [k, setK] = useState(3);
    const [seed, setSeed] = useState(DEFAULT_SEED);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const coords = useMemo<Point2D[]>(() => data.points.map((p) => [p.x, p.y] as const), [data.points]);

    // Map data space -> viewBox space once; PCA coords are already on a shared scale.
    const { plotted, toPx } = useMemo(() => {
        const xs = coords.map((c) => c[0]);
        const ys = coords.map((c) => c[1]);
        const xMin = Math.min(...xs);
        const xMax = Math.max(...xs);
        const yMin = Math.min(...ys);
        const yMax = Math.max(...ys);
        const sx = (PLOT.w - 2 * PLOT.pad) / (xMax - xMin || 1);
        const sy = (PLOT.h - 2 * PLOT.pad) / (yMax - yMin || 1);
        const toPx = ([x, y]: Point2D) => ({
            px: PLOT.pad + (x - xMin) * sx,
            // SVG y grows downward; flip so PC2 points "up".
            py: PLOT.h - PLOT.pad - (y - yMin) * sy,
        });
        return { plotted: coords.map(toPx), toPx };
    }, [coords]);

    const result = useMemo(() => kMeans(coords, k, seed), [coords, k, seed]);
    const elbow = useMemo(() => elbowCurve(coords, K_MIN, K_MAX, seed), [coords, seed]);
    const colors = clusterColors(k);

    // Cluster top terms: most frequent per-point TF-IDF terms among members.
    const clusterSummaries = useMemo(() => {
        return Array.from({ length: k }, (_, cluster) => {
            const termCounts = new Map<string, number>();
            let size = 0;
            data.points.forEach((p, i) => {
                if (result.assignments[i] !== cluster) return;
                size++;
                for (const term of p.topTerms) termCounts.set(term, (termCounts.get(term) ?? 0) + 1);
            });
            const topTerms = [...termCounts.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([term]) => term);
            return { size, topTerms };
        });
    }, [data.points, result, k]);

    const selected = selectedIndex === null ? null : data.points[selectedIndex];
    const selectedCluster = selectedIndex === null ? null : result.assignments[selectedIndex];

    function stepSelection(delta: number) {
        setSelectedIndex((prev) => {
            const n = data.points.length;
            if (prev === null) return delta > 0 ? 0 : n - 1;
            return (prev + delta + n) % n;
        });
    }

    // Elbow plot geometry.
    const ELBOW = { w: 260, h: 140, pad: 26 };
    const maxInertia = Math.max(...elbow.map((e) => e.inertia));
    const elbowXY = (entry: { k: number; inertia: number }) => ({
        x: ELBOW.pad + ((entry.k - K_MIN) / (K_MAX - K_MIN)) * (ELBOW.w - 2 * ELBOW.pad),
        y: ELBOW.h - ELBOW.pad - (entry.inertia / maxInertia) * (ELBOW.h - 2 * ELBOW.pad),
    });

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="border border-slate-800 rounded-lg p-5 bg-slate-800/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
                    <label className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-sm text-slate-300 shrink-0">
                            k = <span className="tabular-nums font-bold text-slate-100">{k}</span>
                        </span>
                        <input
                            type="range"
                            min={K_MIN}
                            max={K_MAX}
                            step={1}
                            value={k}
                            aria-label="Number of clusters (k)"
                            onChange={(e) => setK(Number(e.target.value))}
                            className="w-full min-w-0 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                            style={{ accentColor: 'var(--lab-teal)' }}
                        />
                    </label>
                    <button
                        type="button"
                        onClick={() => setSeed((s) => s + 1)}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-blue-300 border border-slate-700 hover:border-blue-500/60 rounded px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shrink-0"
                    >
                        <RotateCcw size={14} aria-hidden="true" />
                        Re-run k-means
                    </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Views:</span>
                    <button
                        type="button"
                        aria-pressed={k === 3}
                        onClick={() => setK(3)}
                        className={`px-3 py-1 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                            k === 3
                                ? 'border-[color:var(--lab-teal)] text-[color:var(--lab-teal-text)] bg-slate-800/60 font-bold'
                                : 'border-slate-700 text-slate-400 hover:text-blue-300 hover:border-blue-500/60'
                        }`}
                    >
                        k=3 · what the data said
                    </button>
                    <button
                        type="button"
                        aria-pressed={k === 5}
                        onClick={() => setK(5)}
                        className={`px-3 py-1 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                            k === 5
                                ? 'border-[color:var(--lab-violet-text)] text-[color:var(--lab-violet-text)] bg-slate-800/60 font-bold'
                                : 'border-slate-700 text-slate-400 hover:text-blue-300 hover:border-blue-500/60'
                        }`}
                    >
                        k=5 · what the theory said
                    </button>
                    <span className="text-slate-500 tabular-nums ml-auto">
                        seed {seed} · {result.iterations} iterations · SSE {result.inertia.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Scatter + side panel */}
            <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4">
                <div className="border border-slate-800 rounded-lg bg-slate-900/50 p-2">
                    <svg
                        viewBox={`0 0 ${PLOT.w} ${PLOT.h}`}
                        className="w-full h-auto"
                        role="img"
                        aria-label={`2-D PCA scatter of ${data.points.length} synthetic-tier feedback comments, colored by k-means cluster (k=${k}). Use the previous/next comment buttons to browse points.`}
                    >
                        {plotted.map((pos, i) => {
                            const cluster = result.assignments[i];
                            const isSelected = i === selectedIndex;
                            return (
                                <circle
                                    key={data.points[i].id}
                                    cx={pos.px}
                                    cy={pos.py}
                                    r={isSelected ? 8 : 4.5}
                                    fill={colors[cluster]}
                                    fillOpacity={isSelected ? 1 : 0.8}
                                    stroke={isSelected ? '#f8fafc' : '#0f172a'}
                                    strokeWidth={isSelected ? 2 : 0.75}
                                    className="cursor-pointer motion-safe:transition-colors motion-safe:duration-300"
                                    onClick={() => setSelectedIndex(i)}
                                >
                                    <title>{data.points[i].comment}</title>
                                </circle>
                            );
                        })}
                        {result.centroids.map((c, j) => {
                            const { px, py } = toPx(c);
                            return (
                                <g key={`centroid-${j}`} aria-hidden="true">
                                    <line x1={px - 6} y1={py} x2={px + 6} y2={py} stroke="#f8fafc" strokeWidth={1.5} />
                                    <line x1={px} y1={py - 6} x2={px} y2={py + 6} stroke="#f8fafc" strokeWidth={1.5} />
                                </g>
                            );
                        })}
                    </svg>
                    <p className="text-[11px] text-slate-500 px-3 pb-2">
                        Axes: first two principal components of the TF-IDF vectors (precomputed). Crosses mark live
                        k-means centroids.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Elbow plot */}
                    <div className="border border-slate-800 rounded-lg bg-slate-800/10 p-4">
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                            Elbow plot <span className="normal-case tracking-normal">(SSE vs. k, live)</span>
                        </h3>
                        <svg viewBox={`0 0 ${ELBOW.w} ${ELBOW.h}`} className="w-full h-auto" role="img" aria-label={`Elbow plot: sum of squared distances for k from ${K_MIN} to ${K_MAX}. The curve bends around k equals 3.`}>
                            <line x1={ELBOW.pad} y1={ELBOW.h - ELBOW.pad} x2={ELBOW.w - ELBOW.pad} y2={ELBOW.h - ELBOW.pad} stroke="#334155" strokeWidth={1} />
                            <line x1={ELBOW.pad} y1={ELBOW.pad} x2={ELBOW.pad} y2={ELBOW.h - ELBOW.pad} stroke="#334155" strokeWidth={1} />
                            <polyline
                                points={elbow.map((e) => { const p = elbowXY(e); return `${p.x},${p.y}`; }).join(' ')}
                                fill="none"
                                stroke="var(--lab-teal)"
                                strokeWidth={1.5}
                            />
                            {elbow.map((e) => {
                                const p = elbowXY(e);
                                const isCurrent = e.k === k;
                                return (
                                    <g key={e.k}>
                                        <circle cx={p.x} cy={p.y} r={isCurrent ? 5 : 3} fill={isCurrent ? 'var(--lab-yellow)' : 'var(--lab-teal)'} />
                                        <text x={p.x} y={ELBOW.h - ELBOW.pad + 14} textAnchor="middle" fontSize={9} fill={isCurrent ? '#f8fafc' : '#64748b'}>
                                            {e.k}
                                        </text>
                                    </g>
                                );
                            })}
                            <text x={ELBOW.pad - 8} y={ELBOW.pad + 4} textAnchor="end" fontSize={9} fill="#64748b">SSE</text>
                            <text x={ELBOW.w - ELBOW.pad} y={ELBOW.h - ELBOW.pad + 14} textAnchor="start" fontSize={9} fill="#64748b">k</text>
                        </svg>
                    </div>

                    {/* Cluster legend */}
                    <div className="border border-slate-800 rounded-lg bg-slate-800/10 p-4">
                        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Clusters (this run)</h3>
                        <ul className="space-y-2">
                            {clusterSummaries.map((summary, j) => (
                                <li key={j} className="flex items-baseline gap-2 text-xs">
                                    <span className="inline-block w-3 h-3 rounded-full shrink-0 translate-y-0.5" style={{ background: colors[j] }} aria-hidden="true" />
                                    <span className="text-slate-400">
                                        <span className="text-slate-300 tabular-nums">{summary.size}</span> pts ·{' '}
                                        {summary.topTerms.length > 0 ? summary.topTerms.join(', ') : '—'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Selected comment */}
            <div className="border border-slate-800 rounded-lg bg-slate-800/10 p-5" aria-live="polite">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500">Feedback comment</h3>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => stepSelection(-1)}
                            aria-label="Previous comment"
                            className="p-1.5 border border-slate-700 rounded text-slate-300 hover:text-blue-300 hover:border-blue-500/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                            <ChevronLeft size={14} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            onClick={() => stepSelection(1)}
                            aria-label="Next comment"
                            className="p-1.5 border border-slate-700 rounded text-slate-300 hover:text-blue-300 hover:border-blue-500/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                            <ChevronRight size={14} aria-hidden="true" />
                        </button>
                    </div>
                </div>
                {selected && selectedCluster !== null ? (
                    <>
                        <p className="text-sm text-slate-300 leading-relaxed mb-3">"{selected.comment}"</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                                <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: colors[selectedCluster] }} aria-hidden="true" />
                                cluster {selectedCluster + 1} of {k}
                            </span>
                            <span className="text-slate-600">·</span>
                            <span>
                                cluster top terms:{' '}
                                <span className="text-slate-300">{clusterSummaries[selectedCluster].topTerms.join(', ')}</span>
                            </span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-500">{selected.id} (synthetic tier)</span>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-slate-500">
                        Click a point in the scatter — or step through with the arrows — to read the underlying
                        synthetic-tier comment and its cluster's top terms.
                    </p>
                )}
            </div>

            {/* 3-vs-5 caption */}
            {k === 3 && (
                <div className="border border-slate-800 rounded-lg bg-slate-800/10 p-5 text-sm text-slate-400 leading-relaxed">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-2">k=3 — the empirical structure</h3>
                    <p>
                        In the thesis's human-inclusive analysis, the elbow settled at three clusters:{' '}
                        {EMPIRICAL_CLUSTERS.map((name, i) => (
                            <span key={name}>
                                <span style={{ color: 'var(--lab-teal-text)' }}>{name}</span>
                                {i < EMPIRICAL_CLUSTERS.length - 1 ? '; ' : '.'}
                            </span>
                        ))}{' '}
                        Those names are the cited finding — the clusters on screen are re-derived live from
                        synthetic-tier comments only, so their boundaries (and which color lands where) will differ
                        from the thesis figures.
                    </p>
                </div>
            )}
            {k === 5 && (
                <div className="border border-slate-800 rounded-lg bg-slate-800/10 p-5 text-sm text-slate-400 leading-relaxed">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                        k=5 — dimensional compression
                    </h3>
                    <p className="mb-2">
                        The theoretical framework proposed five dimensions:{' '}
                        {THEORETICAL_DIMENSIONS.map(([name, presence], i) => (
                            <span key={name}>
                                <span style={{ color: 'var(--lab-violet-text)' }}>{name}</span>{' '}
                                <span className="text-slate-500">({presence})</span>
                                {i < THEORETICAL_DIMENSIONS.length - 1 ? ', ' : '.'}
                            </span>
                        ))}
                    </p>
                    <p>
                        Forcing k=5 carves the same cloud into five pieces, but the elbow plot shows why the thesis
                        called this <span className="text-slate-300">dimensional compression</span>: past k=3 the SSE
                        barely improves. Five theorized dimensions were legible in how people wrote feedback, yet the
                        comments themselves occupied only three separable regions.
                    </p>
                </div>
            )}

            {/* Tier-vs-citation stat strip */}
            <div className="border-l-2 pl-4 py-1 text-xs text-slate-400 leading-relaxed" style={{ borderColor: 'var(--lab-yellow)' }}>
                The k=3 cluster structure and the dimension-presence percentages are findings from the thesis's
                human-inclusive analysis (64 human judgments from 7 participants, within the 512-entry master
                dataset). The points shown here are synthetic-tier comments only; TF-IDF and PCA are precomputed,
                and only k-means runs live in your browser.
            </div>
        </div>
    );
}
