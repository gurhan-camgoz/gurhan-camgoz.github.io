/**
 * Stage renderers for the RLHF Pipeline Walkthrough.
 *
 * Each is a pure function of scroll progress (0..1 within its scene's step)
 * returning SVG content for the shared 640x480 stage. Rendering with
 * progress=1 gives the scene's final state, used as a static inline figure on
 * mobile and under prefers-reduced-motion. Scene prose and ordering live in
 * rlhfScenes.ts.
 */

export interface LossPoint {
    step: number;
    loss: number;
}

export interface HistogramBin {
    score: number;
    count: number;
}

export interface MarginPoint {
    step: number;
    margin: number;
}

export interface ScatterPoint {
    x: number;
    y: number;
    cluster: number;
}

export interface SeriesState<T> {
    status: 'loading' | 'error' | 'ready';
    data: T | null;
}

export interface StageCtx {
    sftLoss: SeriesState<LossPoint[]>;
    scoreHistogram: SeriesState<HistogramBin[]>;
    ipoMargins: SeriesState<MarginPoint[]>;
    /** Synthetic-tier comment coords with precomputed k=3 assignments. */
    clusterPoints: SeriesState<ScatterPoint[]>;
}

export interface StageProps {
    progress: number;
    ctx: StageCtx;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Progress of a sub-beat that runs from `start` for `duration` of the scene. */
const beat = (progress: number, start: number, duration: number) => clamp01((progress - start) / duration);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const MONO_GREY = '#64748b'; // slate-500
const TEXT_GREY = '#94a3b8'; // slate-400
const AXIS_GREY = '#334155'; // slate-700
const NEAR_BLACK = '#020617'; // slate-950
/** Thesis cluster-figure palette, matching the Clustering Playground at k=3. */
const THESIS_3 = ['#472d7b', '#21918c', '#f4e04d'];

function SeriesNotice({ state, label }: { state: SeriesState<unknown>; label: string }) {
    if (state.status === 'ready') return null;
    return (
        <text x={320} y={240} fontSize={13} fill={MONO_GREY} textAnchor="middle">
            {state.status === 'loading' ? `loading ${label}…` : `${label} unavailable (see repo)`}
        </text>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 1: loss curve draws in; taxonomy donut assembles beside it    */
/* ------------------------------------------------------------------ */

const TAXONOMY = [
    { label: 'Descriptive', pct: 37.8, color: 'var(--lab-violet-text)' },
    { label: 'Structural', pct: 34.4, color: 'var(--lab-teal)' },
    { label: 'Contrast', pct: 27.8, color: 'var(--lab-yellow)' },
];

export function Scene1Stage({ progress, ctx }: StageProps) {
    const drawP = beat(progress, 0, 0.55);
    const X0 = 70;
    const X1 = 600;
    const Y0 = 55;
    const Y1 = 235;

    let path = '';
    if (ctx.sftLoss.data && ctx.sftLoss.data.length > 1) {
        const series = ctx.sftLoss.data;
        const minStep = series[0].step;
        const maxStep = series[series.length - 1].step;
        const minLoss = Math.min(...series.map((p) => p.loss));
        const maxLoss = Math.max(...series.map((p) => p.loss));
        path = series
            .map((p, i) => {
                const x = X0 + ((p.step - minStep) / (maxStep - minStep)) * (X1 - X0);
                const y = Y0 + ((maxLoss - p.loss) / (maxLoss - minLoss || 1)) * (Y1 - Y0);
                return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');
    }

    const donut = { cx: 150, cy: 385, r: 52, width: 24 };

    return (
        <g>
            {/* Loss chart */}
            <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke={AXIS_GREY} strokeWidth={1} />
            <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke={AXIS_GREY} strokeWidth={1} />
            <text x={X0} y={Y0 - 14} fontSize={13} fill={MONO_GREY}>
                training loss
            </text>
            <text x={X1} y={Y1 + 20} fontSize={12} fill={MONO_GREY} textAnchor="end">
                3 epochs, lr 2e-4
            </text>
            <SeriesNotice state={ctx.sftLoss} label="loss series" />
            {path && (
                <>
                    <path
                        d={path}
                        fill="none"
                        stroke="var(--lab-teal)"
                        strokeWidth={2.5}
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={1 - drawP}
                    />
                    {drawP > 0.02 && (
                        <text x={X0 + 8} y={Y0 + 16} fontSize={14} fill="#f8fafc">
                            1.77
                        </text>
                    )}
                    {drawP >= 0.99 && (
                        <text x={X1 - 4} y={Y1 - 10} fontSize={14} fill="#f8fafc" textAnchor="end">
                            0.83
                        </text>
                    )}
                </>
            )}

            {/* Taxonomy donut */}
            {TAXONOMY.map((seg, i) => {
                const segP = beat(progress, 0.5 + i * 0.15, 0.15);
                const shown = seg.pct * segP;
                const offset = TAXONOMY.slice(0, i).reduce((s, t) => s + t.pct, 0);
                return (
                    <circle
                        key={seg.label}
                        cx={donut.cx}
                        cy={donut.cy}
                        r={donut.r}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={donut.width}
                        pathLength={100}
                        strokeDasharray={`${shown} ${100 - shown}`}
                        strokeDashoffset={-offset}
                        transform={`rotate(-90 ${donut.cx} ${donut.cy})`}
                    />
                );
            })}
            <text x={donut.cx} y={donut.cy + 5} fontSize={13} fill={TEXT_GREY} textAnchor="middle">
                511
            </text>
            {TAXONOMY.map((seg, i) => {
                const segP = beat(progress, 0.5 + i * 0.15, 0.15);
                return (
                    <g key={seg.label} opacity={segP > 0.6 ? 1 : 0}>
                        <rect x={250} y={340 + i * 30} width={12} height={12} fill={seg.color} rx={2} />
                        <text x={270} y={351 + i * 30} fontSize={14} fill={TEXT_GREY}>
                            {seg.label} {seg.pct}%
                        </text>
                    </g>
                );
            })}
            <text x={250} y={320} fontSize={12} fill={MONO_GREY}>
                Spradley question taxonomy, 511 examples
            </text>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 2: deployment error log ticks through, resolves to online     */
/* ------------------------------------------------------------------ */

const DEPLOY_EVENTS = [
    'response rejected: JSON wrapper schema mismatch',
    'exec format error: arm64 image on amd64 host',
    'IAM: permission denied',
    'rebuild queued: multi-GB Docker context',
];

export function Scene2Stage({ progress }: StageProps) {
    const onlineP = beat(progress, 0.78, 0.12);
    return (
        <g>
            {/* Terminal frame */}
            <rect x={50} y={60} width={540} height={360} rx={10} fill={NEAR_BLACK} stroke={AXIS_GREY} strokeWidth={1} />
            <circle cx={78} cy={86} r={5} fill={AXIS_GREY} />
            <circle cx={96} cy={86} r={5} fill={AXIS_GREY} />
            <circle cx={114} cy={86} r={5} fill={AXIS_GREY} />
            <text x={560} y={91} fontSize={12} fill={MONO_GREY} textAnchor="end">
                deploy.log
            </text>

            {DEPLOY_EVENTS.map((event, i) => {
                const lineP = beat(progress, 0.1 + i * 0.16, 0.1);
                const settled = onlineP > 0;
                return (
                    <g key={event} opacity={lineP > 0.5 ? 1 : 0}>
                        <text x={80} y={140 + i * 42} fontSize={14} fill={settled ? MONO_GREY : '#f87171'}>
                            ✗
                        </text>
                        <text x={104} y={140 + i * 42} fontSize={14} fill={settled ? MONO_GREY : TEXT_GREY}>
                            {event}
                        </text>
                    </g>
                );
            })}

            <g opacity={onlineP > 0.5 ? 1 : 0}>
                <line x1={80} y1={318} x2={560} y2={318} stroke={AXIS_GREY} strokeWidth={1} strokeDasharray="4 4" />
                <text x={80} y={352} fontSize={14} fill="var(--lab-teal)">
                    ● endpoint online
                </text>
                <text x={104} y={384} fontSize={14} fill={TEXT_GREY}>
                    7 researchers · one week · 64 feedback instances
                </text>
            </g>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 3: selection bars build; Ambiguous rises last and tallest     */
/* ------------------------------------------------------------------ */

const SELECTIONS = [
    { label: 'A is better', count: 20, color: '#60a5fa' },
    { label: 'B is better', count: 14, color: '#818cf8' },
    { label: 'Ambiguous', count: 30, color: 'var(--lab-yellow)' },
];

export function Scene3Stage({ progress }: StageProps) {
    const BASE_Y = 380;
    const MAX_H = 270;
    const MAX_COUNT = 32;
    return (
        <g>
            <line x1={60} y1={BASE_Y} x2={580} y2={BASE_Y} stroke={AXIS_GREY} strokeWidth={1} />
            <text x={60} y={70} fontSize={13} fill={MONO_GREY}>
                selections, n=64
            </text>
            {SELECTIONS.map((sel, i) => {
                const barP = beat(progress, 0.08 + i * 0.28, 0.24);
                const h = (sel.count / MAX_COUNT) * MAX_H * barP;
                const x = 90 + i * 170;
                const isAmbiguous = sel.label === 'Ambiguous';
                return (
                    <g key={sel.label}>
                        <rect x={x} y={BASE_Y - h} width={120} height={h} fill={sel.color} fillOpacity={0.85} rx={3} />
                        <text x={x + 60} y={BASE_Y + 24} fontSize={14} fill={TEXT_GREY} textAnchor="middle">
                            {sel.label}
                        </text>
                        {barP > 0.95 && (
                            <text
                                x={x + 60}
                                y={BASE_Y - h - 12}
                                fontSize={isAmbiguous ? 20 : 15}
                                fill={isAmbiguous ? 'var(--lab-yellow)' : '#f8fafc'}
                                fontWeight={isAmbiguous ? 'bold' : 'normal'}
                                textAnchor="middle"
                            >
                                {sel.count}
                                {isAmbiguous ? ' · 46.9%' : ''}
                            </text>
                        )}
                    </g>
                );
            })}
            <g opacity={beat(progress, 0.92, 0.08) > 0.5 ? 1 : 0}>
                <text x={60} y={444} fontSize={13} fill={MONO_GREY}>
                    within Ambiguous: 63.3% judged both poor · 23.3% no response arrived
                </text>
            </g>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 4: five dimension bars squeeze into one scalar line, which    */
/* then populates the bimodal score histogram                          */
/* ------------------------------------------------------------------ */

const DIMENSION_BARS = [
    { label: 'Narrative Discipline', w: 0.72 },
    { label: 'Productive Defamiliarization', w: 0.55 },
    { label: 'Analytical Grounding', w: 0.63 },
    { label: 'Ethical Scrutiny', w: 0.38 },
    { label: 'Creative Synthesis', w: 0.45 },
];

export function Scene4Stage({ progress, ctx }: StageProps) {
    const appearP = beat(progress, 0, 0.18);
    const squeezeP = beat(progress, 0.26, 0.28);
    const histP = beat(progress, 0.58, 0.34);
    const LINE_Y = 190;
    const BASE_Y = 430;
    const HIST_X0 = 90;
    const HIST_W = 44;
    const bins = ctx.scoreHistogram.data;
    const maxCount = bins ? Math.max(...bins.map((b) => b.count)) : 1;

    return (
        <g>
            {/* Five dimension bars converging on one line */}
            {DIMENSION_BARS.map((dim, i) => {
                const shown = beat(appearP, i * 0.15, 0.4);
                const y = lerp(60 + i * 32, LINE_Y, squeezeP);
                const h = lerp(14, 2.5, squeezeP);
                const w = lerp(dim.w * 320, 460, squeezeP);
                const emergent = i >= 3;
                return (
                    <g key={dim.label} opacity={shown}>
                        <rect
                            x={90}
                            y={y}
                            width={w}
                            height={h}
                            rx={2}
                            fill={emergent ? 'var(--lab-yellow)' : 'var(--lab-teal)'}
                            fillOpacity={lerp(0.8, 0.5, squeezeP)}
                        />
                        <text x={420} y={60 + i * 32 + 12} fontSize={12} fill={TEXT_GREY} opacity={1 - squeezeP}>
                            {dim.label}
                        </text>
                    </g>
                );
            })}
            {squeezeP > 0.9 && (
                <text x={320} y={LINE_Y - 14} fontSize={13} fill={TEXT_GREY} textAnchor="middle">
                    one number per response
                </text>
            )}

            {/* Bimodal histogram fed by the scalar line */}
            {histP > 0 && <SeriesNotice state={ctx.scoreHistogram} label="score histogram" />}
            {bins && histP > 0 && (
                <g>
                    <line x1={70} y1={BASE_Y} x2={570} y2={BASE_Y} stroke={AXIS_GREY} strokeWidth={1} />
                    {bins.map((bin, i) => {
                        const barP = beat(histP, i * 0.06, 0.4);
                        const h = (bin.count / maxCount) * 160 * barP;
                        return (
                            <g key={bin.score}>
                                <rect
                                    x={HIST_X0 + i * (HIST_W + 4)}
                                    y={BASE_Y - h}
                                    width={HIST_W}
                                    height={h}
                                    fill="var(--lab-violet-text)"
                                    fillOpacity={0.75}
                                    rx={2}
                                />
                                <text x={HIST_X0 + i * (HIST_W + 4) + HIST_W / 2} y={BASE_Y + 16} fontSize={11} fill={MONO_GREY} textAnchor="middle">
                                    {bin.score}
                                </text>
                            </g>
                        );
                    })}
                    {histP > 0.9 && (
                        <text x={320} y={BASE_Y + 38} fontSize={13} fill={TEXT_GREY} textAnchor="middle">
                            1,024 triplets · bimodal · mean 4.09 · median 3.00
                        </text>
                    )}
                </g>
            )}
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 5: 72.5% set huge; the histogram it was trained on ghosts in  */
/* ------------------------------------------------------------------ */

export function Scene5Stage({ progress, ctx }: StageProps) {
    const numberP = beat(progress, 0.05, 0.3);
    const ghostP = beat(progress, 0.5, 0.35);
    const bins = ctx.scoreHistogram.data;
    const maxCount = bins ? Math.max(...bins.map((b) => b.count)) : 1;

    return (
        <g>
            {/* The histogram from scene 4, ghosted behind the number */}
            {bins && (
                <g opacity={ghostP * 0.35}>
                    {bins.map((bin, i) => {
                        const h = (bin.count / maxCount) * 260;
                        return (
                            <rect
                                key={bin.score}
                                x={90 + i * 48}
                                y={400 - h}
                                width={44}
                                height={h}
                                fill="var(--lab-violet-text)"
                                rx={2}
                            />
                        );
                    })}
                </g>
            )}

            <g opacity={numberP}>
                <text x={320} y={250} fontSize={104} fontWeight="bold" fill="#f8fafc" textAnchor="middle">
                    72.5%
                </text>
                <text x={320} y={292} fontSize={16} fill={TEXT_GREY} textAnchor="middle">
                    validation accuracy
                </text>
            </g>
            <g opacity={ghostP > 0.85 ? 1 : 0}>
                <text x={320} y={442} fontSize={13} fill={TEXT_GREY} textAnchor="middle">
                    accurate at reproducing the flattening
                </text>
            </g>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 6: the wall. VRAM gauge overflows; cut to the raw error line  */
/* ------------------------------------------------------------------ */

export function Scene6Stage({ progress }: StageProps) {
    const gaugeP = beat(progress, 0.05, 0.15);
    const policyP = beat(progress, 0.22, 0.2);
    const refP = beat(progress, 0.45, 0.2);
    const errorP = beat(progress, 0.72, 0.18);

    const G = { x: 240, w: 160, top: 90, bottom: 400 };
    const gaugeH = G.bottom - G.top;
    // The two blocks together need ~4/3 of the gauge: the second one overflows.
    const blockH = (gaugeH * 2) / 3;
    const policyH = blockH * policyP;
    const refH = blockH * refP;
    const refTopY = G.bottom - policyH - refH;
    const overflowing = refTopY < G.top;
    const gaugeOpacity = 1 - errorP * 0.75;

    return (
        <g>
            <rect x={0} y={0} width={640} height={480} fill={NEAR_BLACK} />
            <g opacity={gaugeOpacity}>
                {/* Gauge outline */}
                <g opacity={gaugeP}>
                    <rect x={G.x} y={G.top} width={G.w} height={gaugeH} fill="none" stroke={AXIS_GREY} strokeWidth={1.5} rx={4} />
                    <text x={G.x - 12} y={G.top + 8} fontSize={13} fill={MONO_GREY} textAnchor="end">
                        15GB
                    </text>
                    <text x={G.x - 12} y={G.bottom} fontSize={13} fill={MONO_GREY} textAnchor="end">
                        0
                    </text>
                    <text x={G.x + G.w / 2} y={G.bottom + 26} fontSize={13} fill={TEXT_GREY} textAnchor="middle">
                        one T4
                    </text>
                </g>
                {/* Policy block */}
                {policyP > 0 && (
                    <g>
                        <rect x={G.x + 6} y={G.bottom - policyH} width={G.w - 12} height={policyH} fill="var(--lab-teal)" fillOpacity={0.5} rx={3} />
                        {policyP > 0.9 && (
                            <text x={G.x + G.w / 2} y={G.bottom - policyH / 2 + 5} fontSize={13} fill="#f8fafc" textAnchor="middle">
                                policy · 7B
                            </text>
                        )}
                    </g>
                )}
                {/* Frozen reference block, overflowing the top */}
                {refP > 0 && (
                    <g>
                        <rect
                            x={G.x + 6}
                            y={refTopY}
                            width={G.w - 12}
                            height={refH}
                            fill="var(--lab-violet-text)"
                            fillOpacity={0.5}
                            rx={3}
                        />
                        {refP > 0.9 && (
                            <text x={G.x + G.w / 2} y={refTopY + refH / 2 + 5} fontSize={13} fill="#f8fafc" textAnchor="middle">
                                frozen reference · 7B
                            </text>
                        )}
                    </g>
                )}
                {overflowing && (
                    <g>
                        <line x1={G.x - 30} y1={G.top} x2={G.x + G.w + 30} y2={G.top} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 4" />
                        <text x={G.x + G.w + 36} y={G.top + 4} fontSize={12} fill="#f87171">
                            over budget
                        </text>
                    </g>
                )}
            </g>

            {/* The cut to the raw error */}
            <g opacity={errorP}>
                <text x={320} y={220} fontSize={22} fill="#f87171" textAnchor="middle">
                    CUDA error: out of memory
                </text>
                <text x={320} y={258} fontSize={13} fill={MONO_GREY} textAnchor="middle">
                    Vertex AI: RESOURCE_EXHAUSTED · Colab: usage cap reached
                </text>
                <text x={320} y={296} fontSize={13} fill={TEXT_GREY} textAnchor="middle">
                    step 0 of training was never reached
                </text>
            </g>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 7: IPO reward margins climb                                   */
/* ------------------------------------------------------------------ */

export function Scene7Stage({ progress, ctx }: StageProps) {
    const drawP = beat(progress, 0.05, 0.55);
    const X0 = 80;
    const X1 = 590;
    const Y0 = 80;
    const Y1 = 380;

    let path = '';
    if (ctx.ipoMargins.data && ctx.ipoMargins.data.length > 1) {
        const series = ctx.ipoMargins.data;
        const minStep = series[0].step;
        const maxStep = series[series.length - 1].step;
        const minM = Math.min(...series.map((p) => p.margin));
        const maxM = Math.max(...series.map((p) => p.margin));
        path = series
            .map((p, i) => {
                const x = X0 + ((p.step - minStep) / (maxStep - minStep)) * (X1 - X0);
                const y = Y1 - ((p.margin - minM) / (maxM - minM || 1)) * (Y1 - Y0);
                return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');
    }

    return (
        <g>
            <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke={AXIS_GREY} strokeWidth={1} />
            <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke={AXIS_GREY} strokeWidth={1} />
            <text x={X0} y={Y0 - 20} fontSize={13} fill={MONO_GREY}>
                reward margin
            </text>
            <text x={X1} y={Y1 + 22} fontSize={12} fill={MONO_GREY} textAnchor="end">
                training steps
            </text>
            <SeriesNotice state={ctx.ipoMargins} label="margin series" />
            {path && (
                <path
                    d={path}
                    fill="none"
                    stroke="var(--lab-teal)"
                    strokeWidth={2.5}
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1 - drawP}
                />
            )}
            <g opacity={beat(progress, 0.62, 0.12) > 0.5 ? 1 : 0}>
                <text x={X1 - 8} y={Y0 + 34} fontSize={14} fill={TEXT_GREY} textAnchor="end">
                    margin = chosen − rejected
                </text>
            </g>
            <g opacity={beat(progress, 0.82, 0.12) > 0.5 ? 1 : 0}>
                <text x={X0} y={442} fontSize={13} fill={MONO_GREY}>
                    IPO via DPOTrainer, β=0.1 · loss 25.0 → ~21.2 · 3 epochs, ~7h, one T4
                </text>
            </g>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 8: the scalar un-flattens into k=3 clusters; dimension        */
/* presence stacks in beside                                           */
/* ------------------------------------------------------------------ */

const DIMENSION_PRESENCE = [
    { label: 'Narrative Discipline', pct: 50.8, emergent: false },
    { label: 'Productive Defamiliarization', pct: 43.0, emergent: false },
    { label: 'Analytical Grounding', pct: 42.0, emergent: false },
    { label: 'Ethical Scrutiny', pct: 8.8, emergent: true },
    { label: 'Creative Synthesis', pct: 6.1, emergent: true },
];

export function Scene8Stage({ progress, ctx }: StageProps) {
    const settleP = beat(progress, 0.05, 0.4);
    const colorOn = settleP > 0.75;
    const barsP = beat(progress, 0.52, 0.4);
    const pts = ctx.clusterPoints.data;

    // Scatter area (left)
    const S = { x0: 40, x1: 360, y0: 70, y1: 400 };
    const midY = (S.y0 + S.y1) / 2;

    return (
        <g>
            <SeriesNotice state={ctx.clusterPoints} label="cluster points" />
            {pts && (
                <g>
                    {pts.map((p, i) => {
                        // Data coords are roughly [-1, 1]; map into the scatter box.
                        const px = S.x0 + ((p.x + 1) / 2) * (S.x1 - S.x0);
                        const py = S.y0 + ((1 - (p.y + 1) / 2)) * (S.y1 - S.y0);
                        const y = lerp(midY, py, settleP);
                        return (
                            <circle
                                key={i}
                                cx={px}
                                cy={y}
                                r={3.2}
                                fill={colorOn ? THESIS_3[p.cluster] : MONO_GREY}
                                fillOpacity={0.85}
                            />
                        );
                    })}
                    <text x={S.x0} y={S.y1 + 30} fontSize={12} fill={MONO_GREY}>
                        {settleP < 0.5 ? 'one scalar per comment' : 'k=3 · synthetic-tier comments'}
                    </text>
                </g>
            )}

            {/* Dimension presence bars (right) */}
            <g opacity={barsP > 0 ? 1 : 0}>
                <text x={400} y={100} fontSize={12} fill={MONO_GREY}>
                    dimension presence in comments
                </text>
                {DIMENSION_PRESENCE.map((dim, i) => {
                    const barP = beat(barsP, i * 0.12, 0.4);
                    const w = (dim.pct / 50.8) * 170 * barP;
                    const y = 122 + i * 56;
                    return (
                        <g key={dim.label}>
                            <text x={400} y={y + 10} fontSize={11} fill={TEXT_GREY}>
                                {dim.label}
                            </text>
                            <rect
                                x={400}
                                y={y + 16}
                                width={w}
                                height={12}
                                rx={2}
                                fill={dim.emergent ? 'var(--lab-yellow)' : 'var(--lab-teal)'}
                                fillOpacity={0.8}
                                stroke={dim.emergent ? 'var(--lab-yellow)' : 'none'}
                                strokeDasharray={dim.emergent ? '4 3' : undefined}
                                strokeWidth={dim.emergent ? 1 : 0}
                            />
                            {barP > 0.9 && (
                                <text x={400 + w + 8} y={y + 26} fontSize={11} fill={TEXT_GREY}>
                                    {dim.pct}%
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>
        </g>
    );
}

/* ------------------------------------------------------------------ */
/* Scene 9: one axis morphs into the five-axis Vector-HCAS radar       */
/* ------------------------------------------------------------------ */

const RADAR_AXES = [
    { label: 'Narrative Discipline', emergent: false },
    { label: 'Productive Defamiliarization', emergent: false },
    { label: 'Analytical Grounding', emergent: false },
    { label: 'Ethical Scrutiny', emergent: true },
    { label: 'Creative Synthesis', emergent: true },
];

export function Scene9Stage({ progress }: StageProps) {
    const morphP = beat(progress, 0.08, 0.42);
    const webP = beat(progress, 0.55, 0.2);
    const labelP = beat(progress, 0.6, 0.2);
    const taglineP = beat(progress, 0.84, 0.12);

    const C = { x: 320, y: 235 };
    const R = 145;
    const angle = (i: number) => ((-90 + 72 * i * morphP) * Math.PI) / 180;
    const point = (i: number, r: number) => ({
        x: C.x + r * Math.cos(angle(i)),
        y: C.y + r * Math.sin(angle(i)),
    });

    const ring = (r: number) =>
        RADAR_AXES.map((_, i) => {
            const p = point(i, r);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        }).join(' ');

    return (
        <g>
            {/* Web rings */}
            <g opacity={webP * 0.7}>
                <polygon points={ring(R * 0.5)} fill="none" stroke={AXIS_GREY} strokeWidth={1} />
                <polygon points={ring(R)} fill="none" stroke={AXIS_GREY} strokeWidth={1} />
            </g>
            {/* Axes */}
            {RADAR_AXES.map((axis, i) => {
                const tip = point(i, R);
                return (
                    <line
                        key={axis.label}
                        x1={C.x}
                        y1={C.y}
                        x2={tip.x}
                        y2={tip.y}
                        stroke={axis.emergent ? 'var(--lab-yellow)' : 'var(--lab-teal)'}
                        strokeWidth={2}
                        strokeDasharray={axis.emergent ? '6 5' : undefined}
                        opacity={i === 0 ? 1 : 0.35 + 0.65 * morphP}
                    />
                );
            })}
            {/* Labels */}
            {morphP >= 1 &&
                RADAR_AXES.map((axis, i) => {
                    const p = point(i, R + 24);
                    const anchor = Math.abs(p.x - C.x) < 10 ? 'middle' : p.x > C.x ? 'start' : 'end';
                    return (
                        <text
                            key={axis.label}
                            x={p.x}
                            y={p.y + 4}
                            fontSize={11.5}
                            fill={axis.emergent ? 'var(--lab-yellow)' : TEXT_GREY}
                            textAnchor={anchor}
                            opacity={labelP}
                        >
                            {axis.label}
                            {axis.emergent ? ' (emergent)' : ''}
                        </text>
                    );
                })}
            <text x={C.x} y={452} fontSize={14} fill="#f8fafc" textAnchor="middle" opacity={taglineP}>
                alignment as a vector, not a scalar
            </text>
        </g>
    );
}
