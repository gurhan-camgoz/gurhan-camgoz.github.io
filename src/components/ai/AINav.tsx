import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';

interface AINavProps {
    /** Title suffix shown after "GURHAN_CAMGOZ ::" */
    pageTitle?: string;
}

export function AINav({ pageTitle = 'AI_LAB' }: AINavProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-white'
            : 'text-slate-400 hover:text-blue-400 transition-colors';

    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'text-white block py-2'
            : 'text-slate-400 hover:text-blue-400 transition-colors block py-2';

    return (
        <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" aria-label="Back to home" className="text-slate-400 hover:text-white transition-colors flex items-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded">
                    <ArrowLeft size={16} className="mr-2" aria-hidden="true" />
                </Link>
                <div className="text-blue-400 font-bold tracking-wider text-sm md:text-base">
                    GURHAN_CAMGOZ :: {pageTitle}
                </div>

                {/* Desktop Navigation */}
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
                    <NavLink to="/ai/lab" className={({ isActive }) => `${navLinkClass({ isActive })} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded`}>
                        Lab
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded p-1"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-4 flex flex-col space-y-2 text-sm">
                        <NavLink
                            to="/ai"
                            end
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Overview
                        </NavLink>
                        <NavLink
                            to="/ai/projects"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Projects
                        </NavLink>
                        <NavLink
                            to="/ai/architecture"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Architecture
                        </NavLink>
                        <NavLink
                            to="/ai/evaluation"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Evaluation
                        </NavLink>
                        <NavLink
                            to="/ai/lab"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Lab
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
}
