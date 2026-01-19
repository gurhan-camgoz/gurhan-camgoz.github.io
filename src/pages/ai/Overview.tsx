import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Network, ShieldCheck } from 'lucide-react';

export function AIOverview() {
    return (
        <div className="min-h-screen bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">

            {/* Simple AI Nav for now */}
            <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center text-sm">
                        <ArrowLeft size={16} className="mr-2" />
                    </Link>
                    <div className="text-blue-400 font-bold tracking-wider">GURHAN_CAMGOZ :: AI_LAB</div>
                    <div className="hidden md:flex space-x-6 text-sm text-slate-400">
                        <span className="text-white">Overview</span>
                        <span className="hover:text-blue-400 cursor-not-allowed opacity-50">Architecture</span>
                        <span className="hover:text-blue-400 cursor-not-allowed opacity-50">Systems</span>
                        <span className="hover:text-blue-400 cursor-not-allowed opacity-50">CV</span>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block px-3 py-1 mb-6 border border-blue-500/30 rounded-full text-blue-400 text-xs tracking-widest uppercase bg-blue-500/10">
                        System Status: Online
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Building <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">Digital Colleagues</span>,<br /> Not Just Chatbots.
                    </h1>

                    <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl">
                        I am an Agentic AI Engineer specializing in human-in-the-loop systems, alignment, and scalable LLM architectures. I bridge the gap between academic theory and production-grade engineering.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors">
                            <Network className="text-blue-400 mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">Agentic Systems</h3>
                            <p className="text-sm text-slate-400"> designing multi-agent workflows that can reason, plan, and execute complex tasks.</p>
                        </div>
                        <div className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors">
                            <ShieldCheck className="text-blue-400 mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">Alignment & Safety</h3>
                            <p className="text-sm text-slate-400">Implementing safeguards and human feedback loops (RLHF/Vector-HCAS) for reliable deployment.</p>
                        </div>
                        <div className="p-6 border border-slate-800 rounded bg-slate-800/20 hover:border-blue-500/50 transition-colors">
                            <Cpu className="text-blue-400 mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">Engineering</h3>
                            <p className="text-sm text-slate-400">Full-stack deployment skills. Docker, GCP, Python, React, and Vector Databases.</p>
                        </div>
                    </div>

                    <div className="mt-16 p-8 border border-yellow-500/20 bg-yellow-500/5 rounded text-center">
                        <p className="text-yellow-200/80 mb-4">🚧 This branch is currently under active construction.</p>
                        <Link to="/anthro" className="text-blue-400 hover:text-blue-300 underline">Visit the Media & Anthropology portfolio</Link> for the complete existing works.
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
