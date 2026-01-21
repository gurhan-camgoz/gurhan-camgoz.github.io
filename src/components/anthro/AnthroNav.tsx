import { NavLink, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AnthroNavProps {
    /** Title suffix shown after "GURHAN_CAMGOZ ::" */
    pageTitle?: string;
}

export function AnthroNav({ pageTitle = 'MEDIA_LAB' }: AnthroNavProps) {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-stone-100'
            : 'text-stone-400 hover:text-amber-400 transition-colors';

    return (
        <nav className="border-b border-amber-800/50 bg-amber-900/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" aria-label="Back to home" className="text-stone-400 hover:text-stone-100 transition-colors flex items-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">
                    <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
                </Link>
                <div className="text-amber-400 font-bold tracking-wider font-mono">
                    GURHAN_CAMGOZ :: {pageTitle}
                </div>
                <div className="hidden md:flex space-x-6 text-sm font-mono">
                    <NavLink to="/anthro" end className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded`}>
                        Overview
                    </NavLink>
                    <NavLink to="/anthro/research" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded`}>
                        Research
                    </NavLink>
                    <NavLink to="/anthro/productions" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded`}>
                        Productions
                    </NavLink>
                    <NavLink to="/anthro/photography" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded`}>
                        Photography
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
