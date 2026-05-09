import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingBag, LayoutDashboard, Bell, Globe } from 'lucide-react';
import { KassaScreen } from './components/KassaScreen';
import { WinkelierDashboard } from './components/WinkelierDashboard';
import { ResultatenView } from './components/ResultatenView';
import { LandingView } from './components/LandingView';
import { ShopDetailView } from './components/ShopDetailView';
import { speelpotten as initialPotten } from './utils/mockData';
import { Speelpot, Deelnemer, AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [speelpotten, setSpeelpotten] = useState<Speelpot[]>(initialPotten);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  function handleDeelnemerToevoegen(potId: string, deelnemer: Deelnemer) {
    setSpeelpotten(prev => prev.map(pot =>
      pot.id === potId
        ? { ...pot, deelnemers: [...pot.deelnemers, deelnemer] }
        : pot
    ));
  }

  function handleNieuwePot(pot: Speelpot) {
    setSpeelpotten(prev => [...prev, pot]);
  }

  function handleShopSelect(slug: string) {
    setSelectedSlug(slug);
    setActiveView('shop');
  }

  function handleBackToLanding() {
    setSelectedSlug(null);
    setActiveView('landing');
  }

  const tabs: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Zoeken', icon: <Globe size={16} /> },
    { id: 'kassa', label: 'Kassa', icon: <ShoppingBag size={16} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'resultaten', label: 'Resultaten', icon: <Bell size={16} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      {/* Tab bar bovenaan */}
      <div className="flex bg-white border-b border-gray-200 mx-0 shrink-0 shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold transition-colors ${
              activeView === tab.id || (activeView === 'shop' && tab.id === 'landing')
                ? 'text-red-600 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => {
              if (tab.id === 'landing') {
                setSelectedSlug(null);
              }
              setActiveView(tab.id);
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'landing' && (
          <LandingView onShopSelect={handleShopSelect} />
        )}
        {activeView === 'shop' && selectedSlug && (
          <ShopDetailView slug={selectedSlug} onBack={handleBackToLanding} />
        )}
        {activeView === 'kassa' && (
          <KassaScreen
            speelpotten={speelpotten}
            onDeelnemerToevoegen={handleDeelnemerToevoegen}
          />
        )}
        {activeView === 'dashboard' && (
          <WinkelierDashboard
            speelpotten={speelpotten}
            onNieuwePot={handleNieuwePot}
          />
        )}
        {activeView === 'resultaten' && (
          <ResultatenView speelpotten={speelpotten} />
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-2 text-xs text-gray-400 shrink-0 border-t border-gray-100 bg-white">
        degrotepot.be — demo versie
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
