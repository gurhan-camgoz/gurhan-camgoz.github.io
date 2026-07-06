import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Cpu, Database, Settings, Cloud, MessageSquare, ArrowRight } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';
import { NextStop } from '../../components/ai/NextStop';
import { SystemFlowChart } from '../../components/ai/SystemFlowChart';

export function AIArchitecture() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            <SeoHead
                title="System Architecture | Gurhan Camgoz"
                description="Agentic LLM system architecture as built: QLoRA fine-tuning, human-in-the-loop feedback from 7 researchers, a 72.5% reward model, a PPO failure on 15GB VRAM, an IPO pivot, and Vector-HCAS 5-dimensional alignment."
                path="/ai/architecture"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="ARCHITECTURE" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* System Summary */}
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl font-bold mb-4">System Architecture</h1>
                            <p className="text-lg text-slate-300 mb-6">
                                An agentic LLM system for interpretive reasoning with multi-dimensional alignment
                                and human-in-the-loop feedback, built and run entirely on free-tier compute.
                            </p>
                            <ul className="text-slate-400 space-y-2 text-sm">
                                <li>• <span className="text-slate-300">Enables:</span> AI systems that support interpretation rather than replace human judgment</li>
                                <li>• <span className="text-slate-300">Different:</span> alignment as a 5-dimensional vector (Vector-HCAS) instead of a scalar reward</li>
                            </ul>
                        </header>

                        {/* System Diagram */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <Layers className="mr-3 text-blue-400" size={24} aria-hidden="true" />
                                System Flow (as built)
                            </h2>
                            <SystemFlowChart />
                        </section>

                        {/* Modules */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-8">Modules</h2>
                            <div className="space-y-6">

                                {/* Interface Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <MessageSquare className="text-blue-400 mr-3" size={20} aria-hidden="true" />
                                        <h3 className="text-lg font-bold">Interface Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• React frontend + Python backend; open-ended interpretive prompts in, paired responses out</li>
                                        <li>• A/B feedback UI with a third "Ambiguous" option, which 46.9% of judgments used</li>
                                        <li>• One week live on GCP with 7 researchers: 64 feedback instances</li>
                                    </ul>
                                    <Link
                                        to="/ai/lab/rlhf-walkthrough#contact"
                                        className="inline-flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        The deployment story, scene 2: Contact
                                        <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                </div>

                                {/* Orchestration Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Settings className="text-blue-400 mr-3" size={20} aria-hidden="true" />
                                        <h3 className="text-lg font-bold">Agent / Orchestration Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Manages role constraints and prompt structure around the fine-tuned model</li>
                                        <li>• Iterative reasoning steps: multi-step interaction, not single-shot generation</li>
                                        <li>• Python orchestration over transformer inference APIs, designed for interpretive work</li>
                                    </ul>
                                </div>

                                {/* Alignment Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Cpu className="text-blue-400 mr-3" size={20} aria-hidden="true" />
                                        <h3 className="text-lg font-bold">Alignment Layer (Vector-HCAS)</h3>
                                    </div>
                                    <p className="text-sm text-slate-400 mb-3">
                                        Alignment represented as a 5-dimensional vector, not a scalar reward. Presence
                                        in the human feedback was hierarchical:
                                    </p>
                                    <ul className="text-sm space-y-1.5 mb-3">
                                        <li className="border-l-2 pl-3" style={{ borderColor: 'var(--lab-teal)' }}>
                                            <span className="text-slate-300">Narrative Discipline</span>
                                            <span className="text-slate-500"> · core · 50.8%</span>
                                        </li>
                                        <li className="border-l-2 pl-3" style={{ borderColor: 'var(--lab-teal)' }}>
                                            <span className="text-slate-300">Productive Defamiliarization</span>
                                            <span className="text-slate-500"> · core · 43.0%</span>
                                        </li>
                                        <li className="border-l-2 pl-3" style={{ borderColor: 'var(--lab-teal)' }}>
                                            <span className="text-slate-300">Analytical Grounding</span>
                                            <span className="text-slate-500"> · core · 42.0%</span>
                                        </li>
                                        <li className="border-l-2 border-dashed pl-3" style={{ borderColor: 'var(--lab-yellow)' }}>
                                            <span className="text-slate-300">Ethical Scrutiny</span>
                                            <span className="text-slate-500"> · emergent · 8.8%</span>
                                        </li>
                                        <li className="border-l-2 border-dashed pl-3" style={{ borderColor: 'var(--lab-yellow)' }}>
                                            <span className="text-slate-300">Creative Synthesis</span>
                                            <span className="text-slate-500"> · emergent · 6.1%</span>
                                        </li>
                                    </ul>
                                    <p className="text-xs text-slate-500 mb-1">
                                        Full definitions and scoring on the Evaluation page; the collapse argument is
                                        interactive in the Lab.
                                    </p>
                                    <Link
                                        to="/ai/lab/preference-collapse-explorer"
                                        className="inline-flex items-center mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        Feel the collapse: Preference Collapse Explorer
                                        <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                </div>

                                {/* Data Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Database className="text-blue-400 mr-3" size={20} aria-hidden="true" />
                                        <h3 className="text-lg font-bold">Data Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• 512-entry master dataset: 64 human judgments + 448 human-seeded synthetic items</li>
                                        <li>• Clustering analysis (TF-IDF + k-means, elbow at k=3) informed synthetic diversity</li>
                                        <li>• Publishing policy: only the synthetic tier ships publicly; human data is cited as statistics</li>
                                    </ul>
                                    <Link
                                        to="/ai/lab/feedback-clustering-playground"
                                        className="inline-flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        Re-run the clustering yourself
                                        <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                </div>

                                {/* Training Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Layers className="text-blue-400 mr-3" size={20} aria-hidden="true" />
                                        <h3 className="text-lg font-bold">Training / Adaptation Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• SFT: Mistral-7B-Instruct-v0.3, QLoRA 4-bit, r=16, α=32, 3 epochs, lr 2e-4; loss 1.77 → 0.83 on 511 curated examples</li>
                                        <li>• Reward model: same base, one Kaggle T4, ~4.5 hours, 72.5% validation accuracy</li>
                                        <li>• Preference optimization: PPO failed on VRAM; IPO (DPOTrainer, β=0.1) trained in ~7 hours on the same T4</li>
                                    </ul>
                                    <Link
                                        to="/ai/lab/rlhf-walkthrough#detour"
                                        className="inline-flex items-center mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        Why IPO, scene 7: The Detour
                                        <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                </div>

                                {/* Deployment Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Cloud className="text-blue-400 mr-3" size={20} aria-hidden="true" />
                                        <h3 className="text-lg font-bold">Deployment Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Local: inference and experimentation on consumer hardware</li>
                                        <li>• Docker: containerized services; the arm64-vs-amd64 lesson was learned the multi-gigabyte way</li>
                                        <li>• Cloud: GCP (hands-on: Vertex AI, IAM, endpoint serving), Azure (familiarity)</li>
                                    </ul>
                                </div>

                            </div>
                        </section>

                        {/* Constraints as built */}
                        <section className="mb-4">
                            <h2 className="text-2xl font-bold mb-6">Constraints (as built)</h2>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-slate-400 space-y-4 text-sm">
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[110px]">Compute:</span>
                                        <span>
                                            Everything ran on free-tier hardware, and the hardware pushed back: PPO
                                            needs two 7B models resident together, a 15GB T4 said no.{' '}
                                            <Link
                                                to="/ai/lab/rlhf-walkthrough#wall"
                                                className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                            >
                                                See The Wall
                                            </Link>
                                            . No A100 assumptions anywhere in the design.
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[110px]">Latency:</span>
                                        <span>Acceptable for interpretive and educational use; not optimized for real-time chat.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[110px]">Reproducibility:</span>
                                        <span>Containerized pipelines, versioned datasets and checkpoints, seeded where possible; the same discipline carries into the Lab demos (seeded k-means, static data).</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[110px]">Privacy:</span>
                                        <span>Human participants are a small academic network: only the synthetic tier is published, human findings appear as statistics.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <NextStop
                            to="/ai/evaluation"
                            label="Evaluation"
                            description="How the system was judged: Vector-HCAS scoring, the study's numbers, and the failure modes actually observed."
                        />
                    </motion.div>
                </main>
            </div>
        </>
    );
}
