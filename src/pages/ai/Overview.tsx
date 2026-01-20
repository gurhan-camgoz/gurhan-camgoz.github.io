import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Network, Layers, ClipboardCheck } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';

export function AIOverview() {
    return (
        <>
            <SeoHead
                title="AI Lab | Gurhan Camgoz"
                description="Agentic AI engineering, human-in-the-loop systems, alignment research, and scalable LLM architectures."
                path="/ai"
            />
            <div className="min-h-screen bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">

                <AINav pageTitle="AI_LAB" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="inline-block px-3 py-1 mb-6 border border-blue-500/30 rounded-full text-blue-400 text-xs tracking-widest uppercase bg-blue-500/10">
                            System Status: Online
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Building <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Digital Colleagues</span>,<br />Not Just Chatbots.
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl">
                            I am an Agentic AI Engineer specializing in human-in-the-loop systems, alignment, and scalable LLM architectures. I bridge the gap between academic theory and production-grade engineering.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link to="/ai/projects" className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors group">
                                <Network className="text-blue-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">Projects</h3>
                                <p className="text-sm text-slate-400">Thesis artifacts and active investigations.</p>
                            </Link>
                            <Link to="/ai/architecture" className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors group">
                                <Layers className="text-blue-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">Architecture</h3>
                                <p className="text-sm text-slate-400">System design: modules, data flow, and deployment layers.</p>
                            </Link>
                            <Link to="/ai/evaluation" className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors group">
                                <ClipboardCheck className="text-blue-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">Evaluation</h3>
                                <p className="text-sm text-slate-400">Human-in-the-loop evaluation, Vector-HCAS scoring, failure modes.</p>
                            </Link>
                            <div className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors">
                                <Cpu className="text-blue-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold mb-2">Engineering</h3>
                                <p className="text-sm text-slate-400">Docker, GCP, Python, React, Vector DBs.</p>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
