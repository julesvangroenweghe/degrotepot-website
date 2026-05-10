import React, { useState } from 'react';
import { Search, MapPin, Users, Trophy, ChevronRight, Zap, Shield, Bell, Star, Store, X } from 'lucide-react';
import { WinkelKaart } from '../types';
import { winkelKaarten } from '../utils/mockData';

interface LandingViewProps {
  onShopSelect: (slug: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onShopSelect }) => {
  const [zoekterm, setZoekterm] = useState('');

  const gefilterd = winkelKaarten.filter(w =>
    w.naam.toLowerCase().includes(zoekterm.toLowerCase()) ||
    w.stad.toLowerCase().includes(zoekterm.toLowerCase())
  );

  const totaalDeelnemers = winkelKaarten.reduce((s, w) => s + w.totaalDeelnemers, 0);
  const totaalWinkels = winkelKaarten.length;
  const totaalPotten = winkelKaarten.reduce((s, w) => s + w.aantalActievePotten, 0);

  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* Hero */}
      <div className="bg-red-600 text-white px-4 pt-6 pb-8">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold tracking-tight">degrotepot.be</div>
          <div className="text-white/80 text-sm mt-1">
            Dé centrale plek voor Belgische loterijpotten
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 text-gray-700">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            className="grow text-sm focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
            placeholder="Zoek op stad of winkelnaam..."
            value={zoekterm}
            onChange={e => setZoekterm(e.target.value)}
          />
          {zoekterm && (
            <button className="text-gray-400 hover:text-gray-600" onClick={() => setZoekterm('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <div className="text-center">
            <div className="text-xl font-bold">{totaalWinkels}</div>
            <div className="text-white/70 text-xs">winkels</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-xl font-bold">{totaalPotten}</div>
            <div className="text-white/70 text-xs">actieve potten</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{totaalDeelnemers.toLocaleString('nl-BE')}</div>
            <div className="text-white/70 text-xs">deelnemers</div>
          </div>
        </div>
      </div>

      {/* USP-balk */}
      <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex gap-4 overflow-x-auto text-xs text-gray-500 shrink-0">
        <div className="flex items-center gap-1.5 shrink-0"><Zap size={12} className="text-amber-500" /> Gratis inschrijven</div>
        <div className="flex items-center gap-1.5 shrink-0"><Bell size={12} className="text-blue-500" /> Auto. SMS na trekking</div>
        <div className="flex items-center gap-1.5 shrink-0"><Shield size={12} className="text-green-500" /> Digitaal bewijs</div>
        <div className="flex items-center gap-1.5 shrink-0"><Star size={12} className="text-red-500" /> Officieel platform</div>
      </div>

      {/* Winkellijst */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-gray-700">
            {zoekterm ? `${gefilterd.length} resultaten` : 'Alle speelpotten'}
          </div>
          {!zoekterm && (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Heel België</span>
          )}
        </div>

        {gefilterd.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MapPin size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">Geen winkels gevonden voor "{zoekterm}"</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {gefilterd.map(winkel => (
              <WinkelCard key={winkel.slug} winkel={winkel} onSelect={() => onShopSelect(winkel.slug)} />
            ))}
          </div>
        )}
      </div>

      {/* B2B CTA */}
      <div className="m-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Store size={15} className="text-red-600" />
          <span className="text-sm font-semibold text-gray-900">Ben je een krantenwinkel?</span>
        </div>
        <div className="text-xs text-gray-500 mb-3">
          Beheer jouw speelpot digitaal. Automatische resultaten, SMS-notificaties en digitale bonnen — allemaal inbegrepen.
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs border border-gray-300 text-gray-600 rounded-lg px-2 py-1">€19/maand</span>
          <span className="text-xs border border-gray-300 text-gray-600 rounded-lg px-2 py-1">Gratis 30 dagen</span>
          <span className="text-xs bg-green-100 text-green-700 font-semibold rounded-lg px-2 py-1">Geen contract</span>
        </div>
      </div>
    </div>
  );
};

const WinkelCard: React.FC<{ winkel: WinkelKaart; onSelect: () => void }> = ({ winkel, onSelect }) => {
  // Initiaal-avatar uit naam
  const initiaal = winkel.naam.charAt(0).toUpperCase();

  return (
    <button
      className="bg-white hover:bg-gray-50 transition-colors text-left w-full rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <span className="font-bold text-red-600 text-sm">{initiaal}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900">{winkel.naam}</span>
                {winkel.nieuw && (
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded-md">Nieuw</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <MapPin size={10} />
                <span>{winkel.stad}</span>
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1" />
        </div>

        {/* Info rij */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users size={11} />
            <span>{winkel.totaalDeelnemers.toLocaleString('nl-BE')} deelnemers</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Trophy size={11} />
            <span>{winkel.jackpot}</span>
          </div>
        </div>

        {/* Trekking info */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="text-xs text-gray-400">
            Trekking: <span className="text-gray-700 font-medium">{winkel.volgendeTrekking}</span>
          </div>
          <span className="text-xs bg-red-100 text-red-700 font-semibold rounded-lg px-2 py-0.5">{winkel.spel}</span>
        </div>
      </div>
    </button>
  );
};
