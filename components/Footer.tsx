import React from 'react';
import { Star } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-base-content text-white/70">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm"
                   style={{ background: 'linear-gradient(135deg, #c8102e, #e8353a)' }}>
                <Star size={14} fill="white" />
              </div>
              <span className="font-editorial text-lg font-bold text-white">
                degrotepot.be
              </span>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              Het platform voor speelpotten bij jouw krantenwinkel.
              Samen spelen, samen winnen — digitaal en zonder gedoe.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-xs text-white/30">Geen kansspeloperator — B2B administratieplatform</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('directory')} className="hover:text-white transition text-left">Alle speelpotten</button></li>
              <li><button onClick={() => onNavigate('hoe-werkt-het')} className="hover:text-white transition text-left">Hoe werkt het?</button></li>
              <li><button onClick={() => onNavigate('winkeliers')} className="hover:text-white transition text-left">Voor winkeliers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition text-left">Privacybeleid</button></li>
              <li><button onClick={() => onNavigate('verantwoord-spelen')} className="hover:text-white transition text-left">Verantwoord spelen</button></li>
              <li>
                <a href="https://www.kenuwlimieten.be" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-1">
                  KenUwLimieten.be
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </li>
              <li className="text-white/40 text-sm">info@degrotepot.be</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">© 2025 degrotepot.be — Alle rechten voorbehouden</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="text-xs text-white/30 hover:text-white/60 transition">Privacybeleid</button>
            <button onClick={() => onNavigate('verantwoord-spelen')} className="text-xs text-white/30 hover:text-white/60 transition">Verantwoord spelen</button>
            <p className="text-xs text-white/30">Niet verbonden aan de Nationale Loterij</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
