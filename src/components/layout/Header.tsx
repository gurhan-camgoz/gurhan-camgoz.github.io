import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '../../utils/constants';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-amber-900/95 backdrop-blur-sm shadow-lg border-b border-amber-800' : 'bg-transparent'
      }`}
    >
      
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="text-xl font-bold text-white font-mono opacity-75 hover:opacity-100 transition-opacity focus:outline-none"
          >
            &lt;gurhan-camgoz.github.io&gt;
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-stone-300 hover:text-stone-400 transition-colors font-mono text-sm relative group"
              >
                <span className="text-stone-400 mr-1">0{index + 1}.</span>
                {item.name}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-400 transition-all duration-300 group-hover:w-full"></div>
              </button>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-stone-300 hover:text-stone-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-stone-700 pt-4">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-stone-300 hover:text-stone-400 transition-colors font-mono"
              >
                <span className="text-stone-400 mr-2">0{index + 1}.</span>
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
