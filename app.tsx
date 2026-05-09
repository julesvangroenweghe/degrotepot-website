import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { PageView } from './types';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DirectoryPage from './components/DirectoryPage';
import ShopDetailPage from './components/ShopDetailPage';
import VoorWinkeliers from './components/VoorWinkeliers';
import HoeWerktHet from './components/HoeWerktHet';
import PrivacyPolicy from './components/PrivacyPolicy';
import VerantwoordSpelen from './components/VerantwoordSpelen';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [page, setPage] = useState<PageView>('home');
  const [selectedShop, setSelectedShop] = useState<string>('');

  const navigateTo = (p: PageView, slug?: string) => {
    setPage(p);
    if (slug) setSelectedShop(slug);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Navbar currentView={page} onNavigate={navigateTo} />

      <main className="flex-1">
        {page === 'home' && <HomePage onNavigate={navigateTo} />}
        {page === 'directory' && <DirectoryPage onNavigate={navigateTo} />}
        {page === 'shop' && <ShopDetailPage shopId={selectedShop} onNavigate={navigateTo} />}
        {page === 'winkeliers' && <VoorWinkeliers onNavigate={navigateTo} />}
        {page === 'hoe-werkt-het' && <HoeWerktHet onNavigate={navigateTo} />}
        {page === 'privacy' && <PrivacyPolicy onNavigate={navigateTo} />}
        {page === 'verantwoord-spelen' && <VerantwoordSpelen onNavigate={navigateTo} />}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
