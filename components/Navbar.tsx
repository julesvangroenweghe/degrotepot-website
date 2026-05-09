import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  onNavigate: (view: PageView) => void;
  currentView: PageView;
}

// Mini lottospelbal als inline "punt" — rode cirkel met wit getal, geen streep
const LottoBallDot: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '1px', marginLeft: '2px' }}
  >
    {/* Rode cirkel */}
    <circle cx="8" cy="8" r="7.5" fill="#c8102e" />
    {/* Subtiele glans rechtsboven */}
    <circle cx="10.5" cy="5" r="2.5" fill="white" opacity="0.12" />
    {/* Getal 7 in wit */}
    <text
      x="8"
      y="11.5"
      textAnchor="middle"
      fill="white"
      fontSize="8.5"
      fontWeight="700"
      fontFamily="Georgia, serif"
      letterSpacing="-0.5"
    >7</text>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Speelpotten', view: 'directory' },
    { label: 'Hoe werkt het?', view: 'hoe-werkt-het' },
    { label: 'Voor winkeliers', view: 'winkeliers' },
  ];

  const isActive = (view: PageView) => currentView === view;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center hover:opacity-85 transition-opacity"
          aria-label="Naar startpagina"
        >
          <span
            className="font-black text-xl tracking-tight text-gray-900 leading-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            deGrotePot<LottoBallDot />
          </span>
          <span
            className="ml-1 text-xs font-semibold tracking-widest uppercase text-gray-400 leading-none self-end mb-0.5"
            style={{ letterSpacing: '0.12em' }}
          >
            .be
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(item.view)
                  ? 'bg-red-50 text-red-700 font-semibold'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('winkeliers')}
            className="ml-3 flex items-center gap-1.5 text-sm font-semibold text-white px-5 py-2 rounded-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#c8102e' }}
          >
            Start gratis <ChevronRight size={14} />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
          <div className="space-y-1 mb-3">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => { onNavigate(item.view); setMenuOpen(false); }}
                className={`flex w-full text-left items-center py-3 px-3 rounded-lg text-sm font-medium transition ${
                  isActive(item.view) ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { onNavigate('winkeliers'); setMenuOpen(false); }}
            className="flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-white py-3 px-4 rounded-lg transition hover:opacity-90"
            style={{ background: '#c8102e' }}
          >
            Start gratis <ChevronRight size={14} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
