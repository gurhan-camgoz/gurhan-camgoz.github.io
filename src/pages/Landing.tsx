import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Video } from 'lucide-react';
import { SeoHead } from '../components/shared/SeoHead';

export function Landing() {
    return (
        <>
            <SeoHead
                title="Gurhan Camgoz | Anthropology & AI Portfolio"
                description="Portfolio of Gurhan Camgoz - bridging Media Anthropology, Cultural Studies, and Agentic AI Engineering."
                path="/"
            />
            <h1 className="sr-only">Gurhan Camgoz Portfolio - Choose a path</h1>
            <div className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden">

                {/* Human/Anthro Path - Left/Top */}
                <Link
                    to="/anthro"
                    className="group relative flex-1 flex flex-col items-center justify-center p-12 bg-stone-200 text-stone-800 transition-all duration-500 hover:flex-[1.2] overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-stone-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Background Decorative */}
                    <div className="absolute top-10 left-10 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                        <Video size={300} strokeWidth={1} />
                    </div>

                    <div className="z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 flex justify-center"
                        >
                            <div className="p-4 rounded-full bg-orange-100/50 text-orange-800 group-hover:bg-orange-200 transition-colors">
                                <Video size={48} />
                            </div>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold font-serif mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Media, Anthropology & Culture
                        </motion.h2>

                        <motion.p
                            className="text-lg text-stone-600 max-w-md mx-auto mb-8 font-serif italic"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Understanding human systems through ethnography, education, and audiovisual production.
                        </motion.p>

                        <motion.div
                            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-orange-800 border-b-2 border-transparent group-hover:border-orange-800 transition-all"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Enter Portfolio <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </div>
                </Link>

                {/* Center Divider/Logo - Optional floating element */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-6 rounded-full shadow-2xl items-center justify-center border-4 border-stone-100">
                    <div className="text-2xl font-bold tracking-tighter text-stone-800">GC</div>
                </div>

                {/* Machine/AI Path - Right/Bottom */}
                <Link
                    to="/ai"
                    className="group relative flex-1 flex flex-col items-center justify-center p-12 bg-slate-900 text-slate-100 transition-all duration-500 hover:flex-[1.2] overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-tl from-slate-800 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Background Decorative */}
                    <div className="absolute bottom-10 right-10 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                        <Code size={300} strokeWidth={1} />
                    </div>

                    <div className="z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 flex justify-center"
                        >
                            <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                <Code size={48} />
                            </div>
                        </motion.div>

                        <motion.h2
                            className="text-3xl md:text-4xl font-bold font-mono mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Agentic AI & Engineering
                        </motion.h2>

                        <motion.p
                            className="text-lg text-slate-400 max-w-md mx-auto mb-8 font-mono text-sm leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Building aligned, human-in-the-loop LLM systems and deployed research engineering.
                        </motion.p>

                        <motion.div
                            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-blue-400 border-b-2 border-transparent group-hover:border-blue-400 transition-all font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Enter Lab <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    </div>
                </Link>
            </div>
        </>
    );
}
