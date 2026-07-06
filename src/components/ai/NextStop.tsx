import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * "Next stop" trail footer: every /ai page points to the natural next page,
 * forming a loop for linear readers (Overview -> Lab -> Projects ->
 * Architecture -> Evaluation -> Lab).
 */
export function NextStop({ to, label, description }: { to: string; label: string; description: string }) {
    return (
        <div className="mt-16 pt-8 border-t border-slate-800">
            <Link
                to={to}
                className="group flex items-center justify-between p-5 border border-slate-800 rounded-lg bg-slate-800/20 hover:border-blue-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
                <div>
                    <span className="text-xs text-slate-500 tracking-widest uppercase">Next stop</span>
                    <span className="block text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {label}
                    </span>
                    <span className="block text-sm text-slate-400 mt-1">{description}</span>
                </div>
                <ArrowRight
                    className="text-blue-400 shrink-0 ml-4 group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
                    size={20}
                    aria-hidden="true"
                />
            </Link>
        </div>
    );
}
