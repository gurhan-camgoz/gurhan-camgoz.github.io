import { motion } from 'framer-motion';
import { Layers, Cpu, Database, Settings, Cloud, MessageSquare } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';

export function AIArchitecture() {
    return (
        <>
            <SeoHead
                title="System Architecture | Gurhan Camgoz"
                description="Agentic LLM system architecture: multi-layer design with Vector-HCAS alignment, human-in-the-loop feedback, and resource-aware fine-tuning."
                path="/ai/architecture"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="ARCHITECTURE" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* System Summary */}
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl font-bold mb-4">System Architecture</h1>
                            <p className="text-lg text-slate-300 mb-6">
                                An agentic LLM system for interpretive reasoning with multi-dimensional alignment, human-in-the-loop feedback, and resource-aware fine-tuning.
                            </p>
                            <ul className="text-slate-400 space-y-2 text-sm">
                                <li>• <span className="text-slate-300">Enables:</span> AI systems that support interpretation rather than replace human judgment</li>
                                <li>• <span className="text-slate-300">Different:</span> Vector-based alignment (multi-dimensional) instead of scalar reward optimization</li>
                                <li>• <span className="text-slate-300">Constraints:</span> Designed for limited GPU memory, consumer-grade hardware, modest cloud instances</li>
                            </ul>
                        </header>

                        {/* System Diagram */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <Layers className="mr-3 text-blue-400" size={24} />
                                System Flow
                            </h2>
                            <div className="border border-slate-700 rounded-lg p-6 bg-slate-800/30 font-mono text-sm overflow-x-auto">
                                <pre className="text-slate-300 leading-relaxed">
                                    {`┌─────────────────────────────────────────────────────────────────────────────┐
│                              INFERENCE LOOP                                 │
│                                                                             │
│   User ──► Interface ──► Agent/Orchestration ──► LLM ──► Output             │
│            (React)        (role constraints,                                │
│                            prompt structure,                                │
│                            iterative reasoning)                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             FEEDBACK LOOP                                   │
│                                                                             │
│   Output ──► Feedback UI ──► Vector-HCAS ──► Data Layer ──► Training        │
│               (human         (3 dimensions:   (human +       (LoRA/QLoRA)   │
│               evaluation)    ND, PD, AG)      synthetic)                    │
│                                                                 │           │
│                                                                 ▼           │
│                                                          Updated Model      │
└─────────────────────────────────────────────────────────────────────────────┘

Vector-HCAS Dimensions:
  ND = Narrative Discipline
  PD = Productive Defamiliarization
  AG = Analytical Grounding`}
                                </pre>
                            </div>
                        </section>

                        {/* Modules */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-8">Modules</h2>
                            <div className="space-y-6">

                                {/* Interface Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <MessageSquare className="text-blue-400 mr-3" size={20} />
                                        <h3 className="text-lg font-bold">Interface Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Web-based interface: React frontend + Python backend</li>
                                        <li>• Inputs: open-ended prompts, interpretive tasks, evaluation prompts</li>
                                        <li>• Outputs: model-generated interpretive responses</li>
                                        <li>• Feedback collection UI for structured qualitative evaluation</li>
                                    </ul>
                                </div>

                                {/* Orchestration Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Settings className="text-blue-400 mr-3" size={20} />
                                        <h3 className="text-lg font-bold">Agent / Orchestration Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Manages role constraints and prompt structure</li>
                                        <li>• Iterative reasoning steps (multi-step interaction, not single-shot generation)</li>
                                        <li>• Python-based orchestration using transformer inference APIs</li>
                                        <li>• Designed for interpretive reasoning rather than task automation</li>
                                    </ul>
                                </div>

                                {/* Alignment Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Cpu className="text-blue-400 mr-3" size={20} />
                                        <h3 className="text-lg font-bold">Alignment Layer (Vector-HCAS)</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Multi-dimensional alignment framework preserving qualitative judgment</li>
                                        <li>• 3 scoring dimensions:
                                            <ul className="ml-4 mt-1 space-y-1">
                                                <li>– <span className="text-slate-300">Narrative Discipline:</span> coherence and structure of interpretive output</li>
                                                <li>– <span className="text-slate-300">Productive Defamiliarization:</span> novel perspectives without losing grounding</li>
                                                <li>– <span className="text-slate-300">Analytical Grounding:</span> connection to source material and evidence</li>
                                            </ul>
                                        </li>
                                        <li>• Alignment represented as vector, not scalar reward</li>
                                        <li>• Human evaluators provide qualitative feedback per dimension</li>
                                    </ul>
                                </div>

                                {/* Data Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Database className="text-blue-400 mr-3" size={20} />
                                        <h3 className="text-lg font-bold">Data Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Human feedback data: qualitative, dimension-specific evaluations</li>
                                        <li>• Synthetic data generation: human-seeded augmentation</li>
                                        <li>• Clustering analysis informs synthetic data diversity</li>
                                        <li>• Structured datasets suitable for fine-tuning and analysis</li>
                                    </ul>
                                </div>

                                {/* Training Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Layers className="text-blue-400 mr-3" size={20} />
                                        <h3 className="text-lg font-bold">Training / Adaptation Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• LoRA/QLoRA for parameter-efficient fine-tuning</li>
                                        <li>• Iterative training loop informed by human feedback and synthetic augmentation</li>
                                        <li>• Designed for limited GPU memory and modest compute</li>
                                        <li>• Emphasis on interpretive diversity over optimization</li>
                                    </ul>
                                </div>

                                {/* Deployment Layer */}
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                    <div className="flex items-center mb-4">
                                        <Cloud className="text-blue-400 mr-3" size={20} />
                                        <h3 className="text-lg font-bold">Deployment Layer</h3>
                                    </div>
                                    <ul className="text-sm text-slate-400 space-y-2">
                                        <li>• Local: inference and experimentation on consumer hardware</li>
                                        <li>• Docker: containerized services for reproducibility</li>
                                        <li>• Cloud: GCP (hands-on experience), Azure (familiarity)</li>
                                    </ul>
                                </div>

                            </div>
                        </section>

                        {/* Design Constraints */}
                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-6">Design Constraints</h2>
                            <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20">
                                <ul className="text-slate-400 space-y-4 text-sm">
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[100px]">Compute:</span>
                                        <span>Limited GPU memory; designed for consumer-grade hardware and modest cloud instances. No A100 assumptions.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[100px]">Latency:</span>
                                        <span>Acceptable for interpretive/educational use cases. Not optimized for real-time chat or low-latency production.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[100px]">Reproducibility:</span>
                                        <span>Containerized pipelines. Versioned datasets and model checkpoints. Deterministic where possible.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-400 font-bold mr-3 min-w-[100px]">Cloud:</span>
                                        <span>GCP (hands-on), Azure (familiarity). No Kubernetes at scale; single-node Docker deployments.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </motion.div>
                </main>
            </div>
        </>
    );
}
