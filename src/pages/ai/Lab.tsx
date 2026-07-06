import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FlaskConical, Github, Lock } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';
import { labDemos } from '../../data/labDemos';
import { StatusBadge } from '../../components/ai/lab/status';
import { NextStop } from '../../components/ai/NextStop';

export function AILab() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            <SeoHead
                title="The Lab | Gurhan Camgoz"
                description="Interactive demos rebuilding arguments from my AI master's thesis: preference collapse, feedback clustering, and the RLHF pipeline behind them."
                path="/ai/lab"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="LAB" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-blue-500/30 rounded-full text-blue-400 text-xs tracking-widest uppercase bg-blue-500/10">
                                <FlaskConical size={14} aria-hidden="true" />
                                Interactive
                            </div>
                            <h1 className="text-4xl font-bold mb-4">The Lab</h1>
                            <p className="text-lg text-slate-400 max-w-3xl">
                                My thesis argued that binary preference optimization flattens human judgment
                                that isn't actually binary. These demos let you feel that argument instead of
                                just reading it — precomputed where the thesis analysis was offline, live
                                where the math is cheap enough to run in your browser.
                            </p>
                        </header>

                        <ul className="sr-only">
                            <li>Demo cards below list status: live, building, or planned.</li>
                        </ul>

                        <div className="grid md:grid-cols-2 gap-6">
                            {labDemos.map((demo) => {
                                const isLinkable = demo.status !== 'planned' && !!demo.path;
                                const cardInner = (
                                    <>
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-xs text-slate-500 tracking-widest uppercase">
                                                {demo.id}
                                            </span>
                                            <StatusBadge status={demo.status} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                            {demo.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">{demo.claim}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {demo.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-[11px] bg-slate-800 text-slate-400 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            {demo.thesisRef ? <span>Thesis {demo.thesisRef}</span> : <span>&nbsp;</span>}
                                            {!isLinkable && (
                                                <span className="flex items-center gap-1">
                                                    <Lock size={12} aria-hidden="true" />
                                                    Roadmap
                                                </span>
                                            )}
                                        </div>
                                    </>
                                );

                                if (isLinkable) {
                                    return (
                                        <Link
                                            key={demo.id}
                                            to={demo.path!}
                                            className="group p-6 border border-slate-800 rounded-lg bg-slate-800/20 hover:border-blue-500/50 transition-all hover:bg-slate-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                        >
                                            {cardInner}
                                        </Link>
                                    );
                                }

                                return (
                                    <div
                                        key={demo.id}
                                        className="group p-6 border border-slate-800/60 rounded-lg bg-slate-800/10 opacity-60 cursor-default"
                                        aria-label={`${demo.title}: planned, not yet available`}
                                    >
                                        {cardInner}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
                            <p className="text-sm text-slate-500">
                                All demos are fully client-side: static data, no API keys, no backend calls.
                            </p>
                            <a
                                href="https://github.com/gurhan-camgoz/ethno-colleague-llm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                            >
                                <Github size={16} aria-hidden="true" />
                                Thesis repo
                            </a>
                        </div>

                        <NextStop
                            to="/ai/projects"
                            label="Projects"
                            description="The real system these demos are built from: repo, stack, and what each component produced."
                        />
                    </motion.div>
                </main>
            </div>
        </>
    );
}

export default AILab;
