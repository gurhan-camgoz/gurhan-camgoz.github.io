import { NavLink, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AINavProps {
    /** Title suffix shown after "GURHAN_CAMGOZ ::" */
    pageTitle?: string;
}

export function AINav({ pageTitle = 'AI_LAB' }: AINavProps) {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-white'
            : 'text-slate-400 hover:text-blue-400 transition-colors';

    return (
        <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" aria-label="Back to home" className="text-slate-400 hover:text-white transition-colors flex items-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded">
                    <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
                </Link>
                <div className="text-blue-400 font-bold tracking-wider">
                    GURHAN_CAMGOZ :: {pageTitle}
                </div>
                <div className="hidden md:flex space-x-6 text-sm">
                    <NavLink to="/ai" end className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded`}>
                        Overview
                    </NavLink>
                    <NavLink to="/ai/projects" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded`}>
                        Projects
                    </NavLink>
                    <NavLink to="/ai/architecture" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded`}>
                        Architecture
                    </NavLink>
                    <NavLink to="/ai/evaluation" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded`}>
                        Evaluation
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
