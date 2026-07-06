import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Wrench, Github, ArrowRight, FileText } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';
import { labDemos } from '../../data/labDemos';

const flagshipDemo = labDemos.find((d) => d.id === 'preference-collapse-explorer')!;

export function AIOverview() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            <SeoHead
                title="AI Engineering & Alignment Research | Gurhan Camgoz"
                description="Agentic AI engineering, human-in-the-loop systems, alignment research, and scalable LLM architectures."
                path="/ai"
            />
            <div className="min-h-screen bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">

                <AINav pageTitle="OVERVIEW" />

                <main className="container mx-auto px-6 py-16">
                    <motion.div
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="inline-block px-3 py-1 mb-6 border border-blue-500/30 rounded-full text-blue-400 text-xs tracking-widest uppercase bg-blue-500/10">
                            System Status: Online
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            I build <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">AI systems</span> and study the humans inside them.
                        </h1>

                        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-3xl">
                            My thesis built an RLHF pipeline end to end — then used it to show where binary
                            preference optimization flattens human judgment that isn't actually binary. I work
                            the same way now: ship it, then study what shipping it did.
                        </p>

                        <h2 className="sr-only">Choose your path: research or engineering</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 border border-slate-800 rounded-lg bg-slate-800/20">
                                <div className="flex items-center mb-3">
                                    <BookOpen className="text-blue-400 mr-3" size={22} aria-hidden="true" />
                                    <h3 className="text-lg font-bold">For research</h3>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">
                                    Method, theory, and the empirical findings behind Vector-HCAS.
                                </p>
                                <div className="flex flex-col gap-2 text-sm">
                                    <a
                                        href="/master_theses/MasterThesis_AI_GurhanCamgoz.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded w-fit"
                                    >
                                        Read the thesis <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </a>
                                    <Link
                                        to="/ai/lab"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded w-fit"
                                    >
                                        Methods notes in the Lab <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 border border-slate-800 rounded-lg bg-slate-800/20">
                                <div className="flex items-center mb-3">
                                    <Wrench className="text-blue-400 mr-3" size={22} aria-hidden="true" />
                                    <h3 className="text-lg font-bold">For engineering</h3>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">
                                    Shipped, working, interactive things — not just slides.
                                </p>
                                <div className="flex flex-col gap-2 text-sm">
                                    <Link
                                        to="/ai/lab"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded w-fit"
                                    >
                                        Explore the Lab <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                    <Link
                                        to="/ai/projects"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded w-fit"
                                    >
                                        Projects <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                                    </Link>
                                    <a
                                        href="https://github.com/gurhan-camgoz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded w-fit"
                                    >
                                        <Github size={14} className="mr-1.5" aria-hidden="true" />
                                        GitHub
                                    </a>
                                    <a
                                        href="/CV-Gurhan-Camgoz.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded w-fit"
                                    >
                                        <FileText size={14} className="mr-1.5" aria-hidden="true" />
                                        CV (PDF)
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Flagship demo teaser */}
                        <Link
                            to="/ai/lab/preference-collapse-explorer"
                            className="group block p-6 border border-blue-500/20 rounded-lg bg-gradient-to-r from-slate-800/40 to-blue-950/20 hover:border-blue-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                            <span className="text-xs text-blue-400 tracking-widest uppercase">Flagship demo</span>
                            <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-blue-400 transition-colors">
                                {flagshipDemo.title}
                            </h3>
                            <p className="text-sm text-slate-400 mb-3 max-w-2xl">
                                Your one click becomes one bit. Watch five dimensions of human judgment get
                                flattened into it — then re-weight them and watch the winner flip.
                            </p>
                            <span className="inline-flex items-center text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                                Try it <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                            </span>
                        </Link>

                        {/* Cross-link to Anthro branch */}
                        <div className="mt-16 pt-12 border-t border-slate-800">
                            <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                                <h3 className="text-lg font-bold text-slate-200 mb-2">Looking for my other work?</h3>
                                <p className="text-slate-400 mb-4">
                                    Explore my anthropology, communication, and audiovisual production portfolio.
                                </p>
                                <Link
                                    to="/anthro"
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                >
                                    Visit Media & Anthropology →
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
