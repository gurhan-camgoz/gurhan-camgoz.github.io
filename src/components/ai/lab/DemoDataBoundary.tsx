import type { ReactNode } from 'react';
import { Github, AlertCircle } from 'lucide-react';
import type { DemoDataState } from './useDemoData';

interface DemoDataBoundaryProps<T> {
    state: DemoDataState<T>;
    repoUrl: string;
    /** Tailwind height class for the loading/error placeholder. */
    minHeight?: string;
    children: (data: T) => ReactNode;
}

/**
 * Renders the three states every demo's data fetch can be in: a skeleton
 * while loading, a clear repo-linked error on failure, or the real content.
 * Never a blank panel. Skeleton animation respects prefers-reduced-motion
 * via Tailwind's `motion-safe:` variant (no JS media-query needed).
 */
export function DemoDataBoundary<T>({ state, repoUrl, minHeight = 'min-h-64', children }: DemoDataBoundaryProps<T>) {
    if (state.status === 'loading') {
        return (
            <div
                className={`w-full ${minHeight} rounded-lg border border-slate-800 bg-slate-800/20 motion-safe:animate-pulse`}
                role="status"
                aria-busy="true"
                aria-label="Loading demo data"
            />
        );
    }

    if (state.status === 'error') {
        return (
            <div
                className={`w-full ${minHeight} rounded-lg border border-red-500/30 bg-red-500/5 flex flex-col items-center justify-center gap-3 p-6 text-center`}
                role="alert"
            >
                <AlertCircle className="text-red-400" size={24} aria-hidden="true" />
                <p className="text-sm text-slate-300">Couldn't load this demo's data.</p>
                <p className="text-xs text-slate-500 font-mono">{state.message}</p>
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                >
                    <Github size={14} aria-hidden="true" />
                    View the repo
                </a>
            </div>
        );
    }

    return <>{children(state.data)}</>;
}
