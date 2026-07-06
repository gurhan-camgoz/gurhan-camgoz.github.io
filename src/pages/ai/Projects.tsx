import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, FlaskConical } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';
import { NextStop } from '../../components/ai/NextStop';
import { aiProjects } from '../../data/aiProjects';

// Same badge geometry as the Lab's StatusBadge so the two vocabularies
// (project lifecycle vs demo status) still read as one design system.
const statusStyles = {
    COMPLETED: 'text-teal-300 bg-teal-400/10 border-teal-400/30',
    ACTIVE: 'text-blue-300 bg-blue-400/10 border-blue-400/30',
    EXPERIMENTAL: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30',
};

export function AIProjects() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            <SeoHead
                title="Thesis Projects | Gurhan Camgoz"
                description="The system behind the Lab: agentic LLM pipeline, human feedback interface (64 instances, 7 researchers), and the synthetic data pipeline (448 items) powering the interactive demos."
                path="/ai/projects"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="PROJECTS" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl font-bold mb-4">Thesis Projects</h1>
                            <p className="text-lg text-slate-400 max-w-3xl">
                                The system the Lab demos are built from. Each component maps to a layer of the
                                architecture, lives in the thesis repo, and has a live demonstration in the Lab.
                            </p>
                        </header>

                        <div className="space-y-8">
                            {aiProjects.map((project) => {
                                const Icon = project.icon;
                                return (
                                    <div
                                        key={project.id}
                                        className="group border border-slate-800 rounded-lg p-8 bg-slate-800/20 hover:border-blue-500/50 transition-all hover:bg-slate-800/40"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4 gap-3">
                                            <div className="flex items-center min-w-0">
                                                <Icon className="text-blue-400 mr-4 shrink-0" size={28} aria-hidden="true" />
                                                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <span className={`px-2 py-1 text-[11px] font-bold rounded-full border shrink-0 ${statusStyles[project.status]}`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        {/* Role in System */}
                                        <div className="mb-4 text-sm">
                                            <span className="text-slate-500">Role in System:</span>{' '}
                                            <span className="text-slate-300">{project.roleInSystem}</span>
                                        </div>

                                        {/* Description */}
                                        <ul className="text-slate-400 mb-6 space-y-2 text-sm">
                                            {project.description.map((item, idx) => (
                                                <li key={idx}>• {item}</li>
                                            ))}
                                        </ul>

                                        {/* Footer: Stack + Links */}
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
                                                {project.stack.map((tech) => (
                                                    <span key={tech} className="px-2 py-1 bg-slate-800 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-xs">
                                                {project.links.demo && (
                                                    <Link
                                                        to={project.links.demo}
                                                        className="inline-flex items-center font-bold text-teal-300 hover:text-teal-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                                    >
                                                        <FlaskConical size={12} className="mr-1" aria-hidden="true" />
                                                        See it live in the Lab
                                                    </Link>
                                                )}
                                                {project.links.repo && (
                                                    <a
                                                        href={project.links.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                                    >
                                                        <ExternalLink size={12} className="mr-1" aria-hidden="true" />
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.links.thesis && (
                                                    <a
                                                        href={project.links.thesis}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                                    >
                                                        <ExternalLink size={12} className="mr-1" aria-hidden="true" />
                                                        Thesis PDF
                                                    </a>
                                                )}
                                                {project.links.article && (
                                                    <a
                                                        href={project.links.article}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                                    >
                                                        <ExternalLink size={12} className="mr-1" aria-hidden="true" />
                                                        Article PDF
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <NextStop
                            to="/ai/architecture"
                            label="Architecture"
                            description="How these components fit together: the system flow as it was actually built."
                        />
                    </motion.div>
                </main>
            </div>
        </>
    );
}
