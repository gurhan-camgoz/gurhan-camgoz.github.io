import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SeoHead } from '../../components/shared/SeoHead';
import { AINav } from '../../components/ai/AINav';
import { aiProjects } from '../../data/aiProjects';

const statusStyles = {
    COMPLETED: 'text-green-400 bg-green-400/10',
    ACTIVE: 'text-blue-400 bg-blue-400/10',
    EXPERIMENTAL: 'text-yellow-400 bg-yellow-400/10',
};

export function AIProjects() {
    return (
        <>
            <SeoHead
                title="Thesis Projects | Gurhan Camgoz"
                description="Thesis-aligned research artifacts: agentic LLM system, human feedback interface, synthetic data pipeline."
                path="/ai/projects"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="PROJECTS" />

                <main className="container mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto"
                    >
                        <header className="mb-12 border-b border-slate-800 pb-8">
                            <h1 className="text-4xl font-bold mb-4">Thesis Projects</h1>
                            <p className="text-lg text-slate-400 max-w-3xl">
                                Research artifacts from my AI master's thesis. Each maps to a specific layer of the system architecture.
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
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                                <Icon className="text-blue-400 mr-4" size={28} />
                                                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[project.status]}`}>
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
                                            <div className="flex gap-4 text-xs">
                                                {project.links.repo && (
                                                    <span className="flex items-center text-slate-500">
                                                        <ExternalLink size={12} className="mr-1" />
                                                        Repo: {project.links.repo === 'TBD' ? <span className="text-slate-600 ml-1">TBD</span> : <a href={project.links.repo} className="text-blue-400 hover:underline ml-1">{project.links.repo}</a>}
                                                    </span>
                                                )}
                                                {project.links.demo && (
                                                    <span className="flex items-center text-slate-500">
                                                        <ExternalLink size={12} className="mr-1" />
                                                        Demo: {project.links.demo === 'TBD' ? <span className="text-slate-600 ml-1">TBD</span> : <a href={project.links.demo} className="text-blue-400 hover:underline ml-1">{project.links.demo}</a>}
                                                    </span>
                                                )}
                                                {project.links.thesis && (
                                                    <span className="flex items-center text-slate-500">
                                                        <ExternalLink size={12} className="mr-1" />
                                                        Thesis: {project.links.thesis === 'TBD' ? <span className="text-slate-600 ml-1">TBD</span> : <a href={project.links.thesis} className="text-blue-400 hover:underline ml-1">{project.links.thesis}</a>}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
