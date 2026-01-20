import { motion } from 'framer-motion';
import { Users, BarChart3, Database, AlertTriangle, Lightbulb } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';

export function AIEvaluation() {
    return (
        <>
            <SeoHead
                title="Evaluation Design | Gurhan Camgoz"
                description="Human-in-the-loop evaluation, Vector-HCAS multi-dimensional alignment, synthetic data strategy, and failure mode mitigations."
                path="/ai/evaluation"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="EVALUATION" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Evaluation Summary */}
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl font-bold mb-4">Evaluation Design</h1>
                            <p className="text-lg text-slate-300 mb-6">
                                Human-in-the-loop qualitative evaluation with multi-dimensional alignment scoring.
                            </p>
                            <ul className="text-slate-400 space-y-2 text-sm">
                                <li>• <span className="text-slate-300">Purpose:</span> Evaluate interpretive AI outputs where scalar metrics fail</li>
                                <li>• <span className="text-slate-300">Problem:</span> Single-score rewards collapse qualitative nuance into optimization targets</li>
                                <li>• <span className="text-slate-300">Solution:</span> Vector-based alignment preserving dimension-specific feedback</li>
                            </ul>
                        </header>

                        {/* Feedback Loop Mini-Diagram */}
                        <section className="mb-12">
                            <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/30 font-mono text-xs overflow-x-auto">
                                <pre className="text-slate-400 leading-relaxed">
                                    {`Output ──► Human Evaluator ──► Dimension Scores ──► Vector-HCAS ──► Training Signal
               │                    │
               │                    ├── Narrative Discipline
               │                    ├── Productive Defamiliarization
               │                    └── Analytical Grounding
               │
               └── Qualitative feedback (not just thumbs up/down)`}
                                </pre>
                            </div>
                        </section>

                        {/* Human-in-the-Loop Design */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <Users className="text-blue-400 mr-3" size={24} />
                                <h2 className="text-2xl font-bold">Human-in-the-Loop Design</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>• <span className="text-slate-300">Evaluators:</span> Provide qualitative feedback per dimension, not binary ratings</li>
                                    <li>• <span className="text-slate-300">Collection:</span> Lightweight web interface for structured evaluation prompts</li>
                                    <li>• <span className="text-slate-300">Criteria emergence:</span> Evaluation dimensions grounded in participant/user perspectives, not imposed metrics</li>
                                    <li>• <span className="text-slate-300">Goal:</span> Scalable supervision where one human can reliably oversee interpretive quality</li>
                                </ul>
                            </div>
                        </section>

                        {/* Vector-HCAS Scoring */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <BarChart3 className="text-blue-400 mr-3" size={24} />
                                <h2 className="text-2xl font-bold">Vector-HCAS Scoring</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <p className="text-sm text-slate-400 mb-4">Multi-dimensional alignment instead of scalar reward:</p>
                                <div className="space-y-4 mb-6">
                                    <div className="border-l-2 border-blue-500 pl-4">
                                        <h4 className="text-slate-200 font-bold">Narrative Discipline</h4>
                                        <p className="text-sm text-slate-400">Coherence and structure of interpretive output. Does the response maintain logical flow?</p>
                                    </div>
                                    <div className="border-l-2 border-blue-500 pl-4">
                                        <h4 className="text-slate-200 font-bold">Productive Defamiliarization</h4>
                                        <p className="text-sm text-slate-400">Novel perspectives without losing grounding. Does it offer fresh insight while staying connected?</p>
                                    </div>
                                    <div className="border-l-2 border-blue-500 pl-4">
                                        <h4 className="text-slate-200 font-bold">Analytical Grounding</h4>
                                        <p className="text-sm text-slate-400">Connection to source material and evidence. Is the interpretation anchored in the text?</p>
                                    </div>
                                </div>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• Avoids collapsing nuanced judgment into a single optimization target</li>
                                    <li>• Each dimension can be weighted or prioritized depending on use case</li>
                                    <li>• Enables detection of trade-offs (e.g., high novelty but weak grounding)</li>
                                </ul>
                            </div>
                        </section>

                        {/* Synthetic Data Strategy */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <Database className="text-blue-400 mr-3" size={24} />
                                <h2 className="text-2xl font-bold">Synthetic Data Strategy</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>• <span className="text-slate-300">Human-seeded:</span> Synthetic data generation starts from real human feedback, not purely generated</li>
                                    <li>• <span className="text-slate-300">Clustering-informed:</span> Augmentation guided by clustering analysis of feedback patterns</li>
                                    <li>• <span className="text-slate-300">Diversity preservation:</span> Generate variations that cover underrepresented clusters</li>
                                    <li>• <span className="text-slate-300">Purpose:</span> Scale evaluation signals without losing qualitative grounding</li>
                                </ul>
                            </div>
                        </section>

                        {/* Failure Modes & Mitigations */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <AlertTriangle className="text-blue-400 mr-3" size={24} />
                                <h2 className="text-2xl font-bold">Failure Modes & Mitigations</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <h3 className="text-lg font-bold text-red-400 mb-3">Failure Modes</h3>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• <span className="text-slate-300">Dominant style overfitting:</span> Model learns to mimic most common interpretive patterns</li>
                                        <li>• <span className="text-slate-300">Safe/generic collapse:</span> Outputs become bland to avoid negative feedback</li>
                                        <li>• <span className="text-slate-300">Loss of ambiguity:</span> Model resolves interpretive tension prematurely</li>
                                    </ul>
                                </div>
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <h3 className="text-lg font-bold text-green-400 mb-3">Mitigations</h3>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• <span className="text-slate-300">Vector constraints:</span> Multi-dimensional scoring prevents single-axis optimization</li>
                                        <li>• <span className="text-slate-300">Cluster-informed augmentation:</span> Ensure training data includes diverse feedback types</li>
                                        <li>• <span className="text-slate-300">Diversity emphasis:</span> Interpretive range valued over peak performance on any one dimension</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* What I'd Improve Next */}
                        <section className="mb-12">
                            <div className="flex items-center mb-4">
                                <Lightbulb className="text-blue-400 mr-3" size={24} />
                                <h2 className="text-2xl font-bold">What I'd Improve Next</h2>
                            </div>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-sm text-slate-400 space-y-3">
                                    <li>• <span className="text-slate-300">Larger evaluator pool:</span> Expand evaluation with more diverse user groups to reduce bias</li>
                                    <li>• <span className="text-slate-300">Automated pre-filtering:</span> Use lightweight classifiers to triage outputs before human review</li>
                                    <li>• <span className="text-slate-300">Richer tool integration:</span> Connect with retrieval and tool-using agents for grounded interpretation</li>
                                </ul>
                            </div>
                        </section>

                    </motion.div>
                </main>
            </div>
        </>
    );
}
