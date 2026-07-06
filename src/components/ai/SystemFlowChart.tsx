import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Interactive system-flow chart for the Architecture page, in the Lab's
 * visual language: hand-rolled SVG, viridis accents, mono labels. Click a
 * stage (or focus it and press Enter) to see the numbers behind it in the
 * detail panel. Fully static and client-side; no animation beyond CSS
 * transitions, so nothing to reduce for prefers-reduced-motion.
 */

type Accent = 'blue' | 'teal' | 'violet' | 'yellow' | 'red';

const ACCENT_COLOR: Record<Accent, string> = {
    blue: '#60a5fa',
    teal: 'var(--lab-teal)',
    violet: 'var(--lab-violet-text)',
    yellow: 'var(--lab-yellow)',
    red: '#f87171',
};

interface FlowNode {
    id: string;
    label: string;
    sublabel?: string;
    x: number;
    y: number;
    w: number;
    accent: Accent;
    /** Dead-end stage: dashed border, rendered in red. */
    failed?: boolean;
    facts: string[];
    link?: { to: string; label: string };
}

const NODE_H = 56;
const ROW1 = 40;
const ROW2 = 190;
const ROW3 = 350;

const NODES: FlowNode[] = [
    {
        id: 'user', label: 'User', x: 16, y: ROW1, w: 72, accent: 'blue',
        facts: [
            'Researchers bring their own fieldnotes and interpretive prompts',
            'The system is designed as a colleague, not an oracle',
        ],
    },
    {
        id: 'interface', label: 'Interface', sublabel: 'React', x: 116, y: ROW1, w: 112, accent: 'blue',
        facts: [
            'React frontend, Python backend, served from GCP',
            'Presents paired responses per vignette',
            'A/B feedback with a third "Ambiguous" option',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#contact', label: 'Scene 2: Contact' },
    },
    {
        id: 'orchestration', label: 'Orchestration', sublabel: 'agent layer', x: 256, y: ROW1, w: 148, accent: 'blue',
        facts: [
            'Role constraints and prompt structure',
            'Iterative reasoning steps, not single-shot generation',
            'Python over transformer inference APIs',
        ],
    },
    {
        id: 'model', label: 'Mistral-7B', sublabel: 'QLoRA 4-bit', x: 432, y: ROW1, w: 136, accent: 'violet',
        facts: [
            'Mistral-7B-Instruct-v0.3; QLoRA r=16, α=32, 3 epochs, lr 2e-4',
            'SFT on 511 curated examples built on Spradley’s taxonomy',
            'Training loss 1.77 to 0.83',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#mirror', label: 'Scene 1: The Mirror' },
    },
    {
        id: 'output', label: 'Output', x: 596, y: ROW1, w: 108, accent: 'blue',
        facts: [
            'Two candidate responses per prompt',
            'Judged side by side in the feedback UI',
        ],
    },
    {
        id: 'feedback', label: 'Feedback UI', sublabel: '7 researchers', x: 506, y: ROW2, w: 198, accent: 'teal',
        facts: [
            'One week live: 64 feedback instances',
            'A won 20, B won 14, "Ambiguous" won 30 (46.9%)',
            'Free-text critique alongside every selection',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#refusal', label: 'Scene 3: The Refusal' },
    },
    {
        id: 'vhcas', label: 'Vector-HCAS', sublabel: '5 dimensions', x: 300, y: ROW2, w: 166, accent: 'violet',
        facts: [
            'Core: Narrative Discipline 50.8%, Productive Defamiliarization 43.0%, Analytical Grounding 42.0%',
            'Emergent: Ethical Scrutiny 8.8%, Creative Synthesis 6.1%',
            'Alignment as a vector, not a scalar',
        ],
        link: { to: '/ai/lab/preference-collapse-explorer', label: 'Preference Collapse Explorer' },
    },
    {
        id: 'data', label: 'Data Layer', sublabel: '512 entries', x: 96, y: ROW2, w: 164, accent: 'teal',
        facts: [
            '64 human judgments + 448 human-seeded synthetic items',
            'Clustering (k=3) guided diversity preservation',
            'Only the synthetic tier ships publicly',
        ],
        link: { to: '/ai/lab/feedback-clustering-playground', label: 'Feedback Clustering Playground' },
    },
    {
        id: 'rm', label: 'Reward Model', sublabel: '72.5% val acc', x: 66, y: ROW3, w: 170, accent: 'violet',
        facts: [
            'Same Mistral base, QLoRA, one Kaggle T4, about 4.5 hours',
            '72.5% validation accuracy',
            'Accurate at reproducing the flattening',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#illusion', label: 'Scene 5: The Illusion of Success' },
    },
    {
        id: 'ppo', label: 'PPO ✗', sublabel: 'CUDA OOM', x: 286, y: ROW3, w: 120, accent: 'red', failed: true,
        facts: [
            'Needs the policy and a frozen reference resident together: two 7B models',
            'One 15GB T4: training never reached step one',
            'Vertex AI answered RESOURCE_EXHAUSTED; Colab answered with usage caps',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#wall', label: 'Scene 6: The Wall' },
    },
    {
        id: 'ipo', label: 'IPO', sublabel: 'β=0.1', x: 446, y: ROW3, w: 120, accent: 'teal',
        facts: [
            'DPOTrainer with loss_type="ipo": no reward model in memory',
            '3 epochs, about 7 hours, the same single T4',
            'Loss 25.0 to ~21.2; reward margins climbing',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#detour', label: 'Scene 7: The Detour' },
    },
    {
        id: 'updated', label: 'Updated Model', sublabel: 'adapters', x: 606, y: ROW3, w: 110, accent: 'yellow',
        facts: [
            'LoRA adapter weights fold back into serving',
            'Calibrated but still scalar: the argument for Vector-HCAS',
            'Next on the roadmap: the Digital Colleague',
        ],
        link: { to: '/ai/lab/rlhf-walkthrough#coda', label: 'Scene 9: Coda' },
    },
];

interface FlowEdge {
    d: string;
    dashed?: boolean;
    color?: string;
    label?: { text: string; x: number; y: number };
}

const EDGES: FlowEdge[] = [
    // Inference row, left to right
    { d: 'M88,68 L112,68' },
    { d: 'M228,68 L252,68' },
    { d: 'M404,68 L428,68' },
    { d: 'M568,68 L592,68' },
    // Output down into the feedback UI
    { d: 'M650,96 L650,186' },
    // Feedback row, right to left
    { d: 'M506,218 L470,218' },
    { d: 'M300,218 L264,218' },
    // Data layer down to the reward model
    { d: 'M178,250 L178,346' },
    // Reward model to PPO (which dead-ends)
    { d: 'M236,378 L282,378' },
    // The detour: data layer straight to IPO, skipping the reward model path
    { d: 'M260,240 C400,258 506,286 506,346', color: 'var(--lab-teal)', label: { text: 'the detour', x: 388, y: 282 } },
    // IPO to the updated model
    { d: 'M566,378 L602,378' },
    // Adapters loop back into serving
    { d: 'M716,378 L736,378 L736,26 L500,26 L500,36', dashed: true, color: 'var(--lab-teal)', label: { text: 'adapters back into serving', x: 600, y: 18 } },
];

export function SystemFlowChart() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const selected = NODES.find((n) => n.id === selectedId) ?? null;

    return (
        <div className="border border-slate-700 rounded-lg bg-slate-800/30 overflow-hidden">
            <div className="overflow-x-auto p-4">
                <svg
                    viewBox="0 0 760 440"
                    className="w-full h-auto min-w-[680px]"
                    role="group"
                    aria-label="System flow chart: inference loop and alignment loop. Select a stage for details."
                >
                    <defs>
                        <marker id="flow-arrow" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
                            <path d="M0,0 L8,4 L0,8 z" fill="#64748b" />
                        </marker>
                    </defs>

                    {/* Loop labels + dividers */}
                    <text x={16} y={24} fontSize={11} fill="#64748b" letterSpacing={2}>
                        INFERENCE LOOP
                    </text>
                    <line x1={16} y1={140} x2={704} y2={140} stroke="#1e293b" strokeWidth={1} />
                    <text x={16} y={168} fontSize={11} fill="#64748b" letterSpacing={2}>
                        ALIGNMENT LOOP
                    </text>

                    {/* Edges under nodes */}
                    {EDGES.map((edge, i) => (
                        <g key={i}>
                            <path
                                d={edge.d}
                                fill="none"
                                stroke={edge.color ?? '#475569'}
                                strokeWidth={1.5}
                                strokeDasharray={edge.dashed ? '5 4' : undefined}
                                markerEnd="url(#flow-arrow)"
                            />
                            {edge.label && (
                                <text x={edge.label.x} y={edge.label.y} fontSize={10.5} fill="#64748b" textAnchor="middle">
                                    {edge.label.text}
                                </text>
                            )}
                        </g>
                    ))}

                    {/* Nodes */}
                    {NODES.map((node) => {
                        const isSelected = node.id === selectedId;
                        const isFocused = node.id === focusedId;
                        const accent = ACCENT_COLOR[node.accent];
                        return (
                            <g
                                key={node.id}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                                aria-label={`${node.label}${node.sublabel ? `, ${node.sublabel}` : ''}. Press Enter for details.`}
                                className="cursor-pointer focus:outline-none"
                                onClick={() => setSelectedId(isSelected ? null : node.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setSelectedId(isSelected ? null : node.id);
                                    }
                                }}
                                onFocus={() => setFocusedId(node.id)}
                                onBlur={() => setFocusedId(null)}
                            >
                                <rect
                                    x={node.x}
                                    y={node.y}
                                    width={node.w}
                                    height={NODE_H}
                                    rx={6}
                                    fill={isSelected ? '#1e293b' : '#0f172a'}
                                    fillOpacity={0.85}
                                    stroke={isSelected || isFocused ? accent : node.failed ? ACCENT_COLOR.red : '#334155'}
                                    strokeWidth={isSelected || isFocused ? 2 : 1.25}
                                    strokeDasharray={node.failed ? '5 4' : undefined}
                                    className="transition-[stroke] duration-150"
                                />
                                <text
                                    x={node.x + node.w / 2}
                                    y={node.y + (node.sublabel ? 25 : 33)}
                                    fontSize={13}
                                    fontWeight="bold"
                                    fill={node.failed ? ACCENT_COLOR.red : '#e2e8f0'}
                                    textAnchor="middle"
                                >
                                    {node.label}
                                </text>
                                {node.sublabel && (
                                    <text x={node.x + node.w / 2} y={node.y + 42} fontSize={10.5} fill="#94a3b8" textAnchor="middle">
                                        {node.sublabel}
                                    </text>
                                )}
                                {/* Accent tick, matching the Lab's dimension coding */}
                                <rect x={node.x} y={node.y + 8} width={3} height={NODE_H - 16} rx={1.5} fill={accent} opacity={0.9} />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Detail panel */}
            <div className="border-t border-slate-800 px-6 py-4 min-h-[7.5rem]" aria-live="polite">
                {selected ? (
                    <div>
                        <h3 className="text-sm font-bold mb-2" style={{ color: ACCENT_COLOR[selected.accent] }}>
                            {selected.label}
                            {selected.sublabel && <span className="text-slate-500 font-normal"> · {selected.sublabel}</span>}
                        </h3>
                        <ul className="text-xs text-slate-400 space-y-1 leading-relaxed">
                            {selected.facts.map((fact) => (
                                <li key={fact}>• {fact}</li>
                            ))}
                        </ul>
                        {selected.link && (
                            <Link
                                to={selected.link.to}
                                className="inline-flex items-center mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                            >
                                {selected.link.label}
                                <ArrowRight size={12} className="ml-1" aria-hidden="true" />
                            </Link>
                        )}
                    </div>
                ) : (
                    <p className="text-xs text-slate-500">
                        Click any stage (or focus it and press Enter) for the numbers behind it. The dashed red
                        stage is the one that failed; the teal curve is the detour around it.
                    </p>
                )}
            </div>

            {/* Provenance caption, Lab convention */}
            <p className="px-6 py-3 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
                fig: pipeline as it actually ran, failures included · source: thesis §3–4 · told scene by scene in
                the{' '}
                <Link
                    to="/ai/lab/rlhf-walkthrough"
                    className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                >
                    RLHF Pipeline Walkthrough
                </Link>
            </p>
        </div>
    );
}
