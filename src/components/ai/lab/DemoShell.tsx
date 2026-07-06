import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Github, ChevronDown, FlaskConical, ArrowLeft } from 'lucide-react';
import type { DemoStatus } from '../../../data/labDemos';
import { StatusBadge } from './status';

export interface DemoShellProps {
    /** Matches the id in labDemos.ts, e.g. "preference-collapse-explorer". */
    demoId: string;
    status: DemoStatus;
    title: string;
    /** One sentence — the argument this demo makes. */
    claim: string;
    /**
     * Small mono-type fieldnote tying this demo back to the thesis section
     * it reproduces. Written as a short note, not just a section number.
     */
    fieldnote: string;
    repoUrl: string;
    /**
     * What's precomputed vs live, and what was anonymized. Optional: essay-style
     * demos (the RLHF walkthrough) suppress the disclosure and render their own
     * "Sources" section instead.
     */
    methodsAndData?: ReactNode;
    /** Widen the frame (max-w-6xl) for two-column scrollytelling layouts. */
    wide?: boolean;
    /** The interactive area. */
    children: ReactNode;
}

/**
 * Consistent frame for every Lab demo: eyebrow + status, title, claim, the
 * interactive area, and a footer strip (fieldnote, GitHub link, collapsible
 * "Methods & data"). See src/components/ai/lab/README.md for how demos plug
 * into this shell.
 */
export function DemoShell({
    demoId,
    status,
    title,
    claim,
    fieldnote,
    repoUrl,
    methodsAndData,
    wide = false,
    children,
}: DemoShellProps) {
    return (
        <div className={`${wide ? 'max-w-6xl' : 'max-w-4xl'} mx-auto`}>
            <Link
                to="/ai/lab"
                className="inline-flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
            >
                <ArrowLeft size={14} className="mr-1.5" aria-hidden="true" />
                Back to Lab
            </Link>

            <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-500 tracking-widest uppercase">LAB :: {demoId}</span>
                <StatusBadge status={status} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">{claim}</p>

            <div className="mb-10">{children}</div>

            <footer className="border-t border-slate-800 pt-6 space-y-5">
                <p className="text-xs text-slate-500 font-mono leading-relaxed max-w-2xl">
                    <span className="text-slate-400">Fieldnote —</span> {fieldnote}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                    >
                        <Github size={16} aria-hidden="true" />
                        Thesis repo
                    </a>
                </div>

                {methodsAndData && (
                    <details className="group border border-slate-800 rounded-lg bg-slate-800/10">
                        <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-sm text-slate-300 hover:text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg">
                            <span className="flex items-center gap-2">
                                <FlaskConical size={14} aria-hidden="true" />
                                Methods &amp; data
                            </span>
                            <ChevronDown
                                className="transition-transform duration-200 group-open:rotate-180"
                                size={16}
                                aria-hidden="true"
                            />
                        </summary>
                        <div className="px-4 pb-4 pt-3 border-t border-slate-800/60 text-sm text-slate-400 leading-relaxed space-y-2">
                            {methodsAndData}
                        </div>
                    </details>
                )}
            </footer>
        </div>
    );
}
