import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GitBranch, Terminal, Globe } from 'lucide-react';

export function AIProjects() {
    return (
        <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
            <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/ai" className="text-slate-400 hover:text-white transition-colors flex items-center text-sm">
                        <ArrowLeft size={16} className="mr-2" />
                        <span>Back to Overview</span>
                    </Link>
                    <div className="text-blue-400 font-bold tracking-wider hidden md:block">GURHAN_CAMGOZ :: LAB_PROJECTS</div>
                    <div className="flex space-x-6 text-sm">
                        <Link to="/ai/research" className="text-slate-400 hover:text-blue-400 transition-colors">Research</Link>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <header className="mb-16">
                        <h1 className="text-4xl font-bold mb-4">Lab Projects</h1>
                        <p className="text-xl text-slate-400 max-w-2xl">
                            A collection of active investigations into agentic behaviors, autonomous systems, and tooling.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <div className="group border border-slate-800 rounded-lg p-8 bg-slate-800/20 hover:border-blue-500/50 transition-all hover:bg-slate-800/40">
                            <div className="flex items-center justify-between mb-6">
                                <Terminal className="text-blue-400" size={28} />
                                <span className="px-3 py-1 text-xs font-bold text-green-400 bg-green-400/10 rounded-full">ACTIVE</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Agentic Workflow Engine</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                A Python-based orchestration layer for multi-agent systems. Focuses on reliable state management and recovery in long-running tasks.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
                                <span className="px-2 py-1 bg-slate-800 rounded">Python</span>
                                <span className="px-2 py-1 bg-slate-800 rounded">LangChain</span>
                                <span className="px-2 py-1 bg-slate-800 rounded">Docker</span>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="group border border-slate-800 rounded-lg p-8 bg-slate-800/20 hover:border-blue-500/50 transition-all hover:bg-slate-800/40">
                            <div className="flex items-center justify-between mb-6">
                                <GitBranch className="text-blue-400" size={28} />
                                <span className="px-3 py-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 rounded-full">EXPERIMENTAL</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Semantic Code Search</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Investigating retrieval strategies for large codebases using hybrid keyword + vector search approaches to improve context injection.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
                                <span className="px-2 py-1 bg-slate-800 rounded">TypeScript</span>
                                <span className="px-2 py-1 bg-slate-800 rounded">Vector DB</span>
                                <span className="px-2 py-1 bg-slate-800 rounded">Embeddings</span>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="group border border-slate-800 rounded-lg p-8 bg-slate-800/20 hover:border-blue-500/50 transition-all hover:bg-slate-800/40">
                            <div className="flex items-center justify-between mb-6">
                                <Globe className="text-blue-400" size={28} />
                                <span className="px-3 py-1 text-xs font-bold text-blue-400 bg-blue-400/10 rounded-full">INFRASTRUCTURE</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Cloud Agent Deployer</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Infrastructure-as-code patterns for deploying isolated agent runtimes on GCP with minimal cold start times.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
                                <span className="px-2 py-1 bg-slate-800 rounded">Terraform</span>
                                <span className="px-2 py-1 bg-slate-800 rounded">GCP</span>
                                <span className="px-2 py-1 bg-slate-800 rounded">K8s</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
