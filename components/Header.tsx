import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to trigger logo animation
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navItems = [
    { label: 'Home', value: ViewState.HOME },
    { label: 'Serviços', value: ViewState.SERVICES },
    { label: 'Notícias', value: ViewState.NEWS },
    { label: 'Sobre Nós', value: ViewState.ABOUT },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 shadow-lg shadow-gold-500/5' : 'bg-black/80'} backdrop-blur-md border-b border-white/5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo Optimized with Scroll Animation */}
          <div 
            className={`flex items-center cursor-pointer h-full py-2 transition-all duration-500 ${isScrolled ? 'animate-pulse-gold' : ''}`}
            onClick={() => handleNavClick(ViewState.HOME)}
          >
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-sm font-medium transition-all duration-300 ${
                  currentView === item.value
                    ? 'text-gold-500 scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick(ViewState.CLIENT_AREA)}
              className="hidden md:inline-flex items-center px-4 py-2 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-gold-500/50 transition-colors"
            >
              <span className="material-icons-outlined text-lg mr-2">lock</span>
              Área do Cliente
            </button>
            
            <button 
              onClick={() => handleNavClick(ViewState.SERVICES)}
              className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-bold text-black bg-gold-500 hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/10"
            >
              Solicitar Orçamento
            </button>

            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-icons-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                  currentView === item.value
                    ? 'bg-navy-800 text-gold-500'
                    : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(ViewState.CLIENT_AREA)}
              className="block w-full text-left px-3 py-4 text-base font-medium text-gray-300 hover:bg-navy-800 hover:text-white"
            >
              Área do Cliente
            </button>
          </div>
        </div>
      )}
    </header>
  );
};