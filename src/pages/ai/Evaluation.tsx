import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, BarChart3, Database, AlertTriangle, ArrowRight } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';
import { NextStop } from '../../components/ai/NextStop';

const DIMENSIONS = [
    {
        name: 'Narrative Discipline',
        presence: '50.8%',
        group: 'core',
        blurb: 'Coherence and structure of interpretive output. Does the response maintain logical flow?',
    },
    {
        name: 'Productive Defamiliarization',
        presence: '43.0%',
        group: 'core',
        blurb: 'Novel perspectives without losing grounding. Does it offer fresh insight while staying connected?',
    },
    {
        name: 'Analytical Grounding',
        presence: '42.0%',
        group: 'core',
        blurb: 'Connection to source material and evidence. Is the interpretation anchored in the text?',
    },
    {
        name: 'Ethical Scrutiny',
        presence: '8.8%',
        group: 'emergent',
        blurb: 'Attention to consent, positionality, and harm. Surfaces when the material invites it.',
    },
    {
        name: 'Creative Synthesis',
        presence: '6.1%',
        group: 'emergent',
        blurb: 'Connections across registers and sources. Context-dependent rather than universal.',
    },
] as const;

export function AIEvaluation() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            <SeoHead
                title="Evaluation Design | Gurhan Camgoz"
                description="Human-in-the-loop evaluation of an interpretive LLM: 64 judgments from 7 researchers, 46.9% refusing the binary, Vector-HCAS 5-dimensional scoring, and the failure modes actually observed."
                path="/ai/evaluation"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="EVALUATION" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Evaluation Summary */}
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl font-bold mb-4">Evaluation Design</h1>
                            <p className="text-lg text-slate-300 mb-6">
                                Human-in-the-loop qualitative evaluation with multi-dimensional alignment scoring.
                            </p>
                            <ul className="text-slate-400 space-y-2 text-sm mb-6">
                                <li>• <span className="text-slate-300">Purpose:</span> evaluate interpretive AI outputs where scalar metrics fail</li>
                                <li>• <span className="text-slate-300">Problem:</span> single-score rewards collapse qualitative nuance into optimization targets</li>
                                <li>• <span className="text-slate-300">Solution:</span> vector-based alignment preserving dimension-specific feedback</li>
                            </ul>
                            <div
                                className="border-l-2 pl-4 py-1 text-xs text-slate-400 leading-relaxed"
                                style={{ borderColor: 'var(--lab-yellow)' }}
                            >
                                The study's numbers: 64 judgments from 7 researchers over one week; 46.9% chose
                                "Ambiguous" over A or B; the reward model trained on the flattened scores reached
                                72.5% validation accuracy; clustering found k=3 modes beneath the 5-dimension
                                framework.
                            </div>
                        </header>

                        {/* Human-in-the-Loop Design */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <Users className="text-blue-400 mr-3" size={24} aria-hidden="true" />
                                <h2 className="text-2xl font-bold">Human-in-the-Loop Design</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>• <span className="text-slate-300">Evaluators:</span> 7 researchers judging paired responses to real ethnographic vignettes, with free-text critique alongside every selection</li>
                                    <li>• <span className="text-slate-300">Format:</span> A / B / Ambiguous. The third button was the finding: 30 of 64 judgments (46.9%) used it, and within those, 63.3% judged both responses poor</li>
                                    <li>• <span className="text-slate-300">Criteria emergence:</span> evaluation dimensions grounded in participant perspectives, not imposed metrics; 47 of 64 comments carried substantive critique</li>
                                    <li>• <span className="text-slate-300">Goal:</span> supervision that preserves what expert judgment actually contains</li>
                                </ul>
                                <Link
                                    to="/ai/lab/rlhf-walkthrough#refusal"
                                    className="inline-flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    The refusal of the binary, scene 3
                                    <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                </Link>
                            </div>
                        </section>

                        {/* Vector-HCAS Scoring */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <BarChart3 className="text-blue-400 mr-3" size={24} aria-hidden="true" />
                                <h2 className="text-2xl font-bold">Vector-HCAS Scoring</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <p className="text-sm text-slate-400 mb-4">
                                    Five dimensions instead of one scalar. Their presence in the human feedback was
                                    hierarchical: three core dimensions appeared across contexts, two emergent ones
                                    surfaced only where the material called for them.
                                </p>
                                <div className="space-y-4 mb-6">
                                    {DIMENSIONS.map((dim) => (
                                        <div
                                            key={dim.name}
                                            className={`border-l-2 pl-4 ${dim.group === 'emergent' ? 'border-dashed' : ''}`}
                                            style={{ borderColor: dim.group === 'emergent' ? 'var(--lab-yellow)' : 'var(--lab-teal)' }}
                                        >
                                            <h4 className="text-slate-200 font-bold">
                                                {dim.name}{' '}
                                                <span className="text-xs font-normal text-slate-500">
                                                    · {dim.group} · present in {dim.presence} of comments
                                                </span>
                                            </h4>
                                            <p className="text-sm text-slate-400">{dim.blurb}</p>
                                        </div>
                                    ))}
                                </div>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Avoids collapsing nuanced judgment into a single optimization target</li>
                                    <li>• Dimensions can be re-weighted per use case; the A/B winner can flip under a plausible re-weighting</li>
                                    <li>• Enables detection of trade-offs (high novelty but weak grounding, for example)</li>
                                </ul>
                                <Link
                                    to="/ai/lab/preference-collapse-explorer"
                                    className="inline-flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    This argument is interactive: Preference Collapse Explorer
                                    <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                </Link>
                            </div>
                        </section>

                        {/* Synthetic Data Strategy */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <Database className="text-blue-400 mr-3" size={24} aria-hidden="true" />
                                <h2 className="text-2xl font-bold">Synthetic Data Strategy</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>• <span className="text-slate-300">Human-seeded:</span> 448 synthetic items generated in the image of the 64 real judgments, for a 512-entry master dataset</li>
                                    <li>• <span className="text-slate-300">Scored by a "Reflexive Critic":</span> a prompted judge rewarding the Insightful Analyst and penalizing the Narrative Hijacker</li>
                                    <li>• <span className="text-slate-300">Clustering-informed:</span> the k=3 structure guided which feedback patterns the augmentation had to preserve</li>
                                    <li>• <span className="text-slate-300">The cost:</span> collapsing to scalar scores produced a bimodal distribution (mean 4.09, median 3.00); the flattening is the thesis's central finding</li>
                                </ul>
                                <Link
                                    to="/ai/lab/feedback-clustering-playground"
                                    className="inline-flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    Re-run the clustering: Feedback Clustering Playground
                                    <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                </Link>
                            </div>
                        </section>

                        {/* Failure Modes Observed */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <AlertTriangle className="text-blue-400 mr-3" size={24} aria-hidden="true" />
                                <h2 className="text-2xl font-bold">Failure Modes (observed, not hypothetical)</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <h3 className="text-lg font-bold text-red-400 mb-3">What actually failed</h3>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• <span className="text-slate-300">The Narrative Hijacker:</span> the model abandons your fieldnote to write fiction, inventing characters and continuing the story</li>
                                        <li>• <span className="text-slate-300">Degenerate loops:</span> repetitive or empty generations, visible as their own cluster in the feedback data</li>
                                        <li>• <span className="text-slate-300">The format itself:</span> the chosen/rejected binary could not encode 46.9% of the judgments it was given</li>
                                    </ul>
                                </div>
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <h3 className="text-lg font-bold text-teal-300 mb-3">What the design did about it</h3>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• <span className="text-slate-300">Reflexive Critic scoring:</span> synthetic items explicitly rewarded analysis and penalized hijacking</li>
                                        <li>• <span className="text-slate-300">Cluster-informed augmentation:</span> the k=3 structure ensured failure patterns stayed represented in training data</li>
                                        <li>• <span className="text-slate-300">Vector constraints:</span> five dimensions prevent single-axis optimization from hiding the trade-offs</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">
                                The degenerate-loop and hijacking clusters are visible first-hand in the{' '}
                                <Link
                                    to="/ai/lab/feedback-clustering-playground"
                                    className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    Clustering Playground
                                </Link>
                                ; the binary-format failure is scene 3 of the{' '}
                                <Link
                                    to="/ai/lab/rlhf-walkthrough#refusal"
                                    className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    Walkthrough
                                </Link>
                                .
                            </p>
                        </section>

                        {/* Roadmap line */}
                        <p className="text-sm text-slate-400 border border-slate-800 rounded-lg p-5 bg-slate-800/10">
                            <span className="text-slate-300">Next:</span> closing the loop from critique back to a
                            working collaborator. The Digital Colleague is planned in the{' '}
                            <Link
                                to="/ai/lab"
                                className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                            >
                                Lab roadmap
                            </Link>
                            , alongside a larger evaluator pool for the next study round.
                        </p>

                        <NextStop
                            to="/ai/lab"
                            label="The Lab"
                            description="Every argument on this page, interactive: collapse a judgment, re-run the clustering, scroll the pipeline."
                        />
                    </motion.div>
                </main>
            </div>
        </>
    );
}
