import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brain, Network } from 'lucide-react';

export function AIResearch() {
    return (
        <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
            <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/ai" className="text-slate-400 hover:text-white transition-colors flex items-center text-sm">
                        <ArrowLeft size={16} className="mr-2" />
                        <span>Back to Overview</span>
                    </Link>
                    <div className="text-blue-400 font-bold tracking-wider hidden md:block">GURHAN_CAMGOZ :: RESEARCH_NOTES</div>
                    <div className="flex space-x-6 text-sm">
                        <Link to="/ai/projects" className="text-slate-400 hover:text-blue-400 transition-colors">Projects</Link>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <header className="mb-16 border-b border-slate-800 pb-8">
                        <h1 className="text-4xl font-bold mb-4">Research & Thinking</h1>
                        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                            Exploring the intersection of scalable engineering and safe AI alignment.
                            My focus is on how we build systems that are not just intelligent, but reliably useful and aligned with human intent.
                        </p>
                    </header>

                    <div className="space-y-12">
                        {/* Topic 1 */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <div className="flex items-center text-blue-400 mb-2">
                                    <Brain size={20} className="mr-2" />
                                    <span className="font-bold text-sm tracking-wider">ALIGNMENT</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Human-in-the-Loop Verification</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-400 mb-4 leading-relaxed">
                                    As agents become more autonomous, the risk of objective mismatch increases. I am researching UI/UX patterns and technical frameworks that allow for seamless human oversight without destroying agent autonomy. The goal is "scalable supervision" where one human can reliably oversee multiple agent workflows.
                                </p>
                            </div>
                        </div>

                        {/* Topic 2 */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <div className="flex items-center text-blue-400 mb-2">
                                    <Network size={20} className="mr-2" />
                                    <span className="font-bold text-sm tracking-wider">ARCHITECTURE</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Multi-Agent State Coherence</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-400 mb-4 leading-relaxed">
                                    Maintaining shared context across distributed agents is non-trivial. I am investigating conflict resolution strategies in shared memory spaces, specifically looking at how different "specialist" agents can update a global state without overwriting critical context from other domains.
                                </p>
                            </div>
                        </div>

                        {/* Topic 3 */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <div className="flex items-center text-blue-400 mb-2">
                                    <BookOpen size={20} className="mr-2" />
                                    <span className="font-bold text-sm tracking-wider">ETHICS</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Interpretability in Production</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-slate-400 mb-4 leading-relaxed">
                                    Black-box decision making is a barrier to adoption in critical industries. My work focuses on generating structurally structured "reasoning traces" that can be audited by non-technical stakeholders, ensuring that the "why" behind an agent's action is as accessible as the "what".
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
