import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Star, Filter, ChevronRight, Store } from 'lucide-react';
import { PageView } from '../types';
import { shops } from '../utils/shops';

interface DirectoryPageProps {
  onNavigate: (view: PageView, shopSlug?: string) => void;
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  const filteredShops = useMemo(() => {
    let result = shops;
    if (filterActive) result = result.filter(s => s.aantalActievePotten > 0);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.naam.toLowerCase().includes(q) ||
        s.stad.toLowerCase().includes(q) ||
        s.adres.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, filterActive]);

  const activePots = shops.filter(s => s.aantalActievePotten > 0).length;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero — clean, light */}
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-3 py-1 text-xs font-semibold text-green-700 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            {activePots} actieve speelpotten
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Alle speelpotten in België
          </h1>
          <p className="text-gray-500 max-w-md mb-8">
            Zoek een krantenwinkel met een speelpot bij jou in de buurt en doe mee.
          </p>

          {/* Search */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek op naam, stad of adres..."
                className="w-full pl-11 pr-4 h-12 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-red-300 focus:ring-2 shadow-sm"
                style={{ '--tw-ring-color': '#c8102e20' } as React.CSSProperties}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setFilterActive(!filterActive)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition border ${
              filterActive
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter size={14} /> Enkel met speelpot
          </button>
          <span className="text-sm text-gray-400">{filteredShops.length} winkels</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShops.slice(0, 30).map((shop) => (
            <button
              key={shop.slug}
              onClick={() => onNavigate('shop', shop.slug)}
              className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:border-gray-200 hover:shadow-md transition-all group relative overflow-hidden"
            >
              {shop.aantalActievePotten > 0 && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Speelpot actief
                  </span>
                </div>
              )}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm"
                style={{ background: shop.aantalActievePotten > 0 ? '#c8102e' : '#9ca3af' }}
              >
                <Store size={18} />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition pr-24 text-[15px]">{shop.naam}</h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
                <MapPin size={13} /> {shop.adres}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                {shop.aantalActievePotten > 0 && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Users size={12} /> {shop.totaalDeelnemers} deelnemers
                  </span>
                )}
                <ChevronRight size={15} className="text-gray-300 group-hover:text-red-400 transition ml-auto" />
              </div>
            </button>
          ))}
        </div>

        {filteredShops.length > 30 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">{filteredShops.length - 30} meer winkels beschikbaar. Verfijn je zoekopdracht.</p>
          </div>
        )}
        {filteredShops.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Geen resultaten</h3>
            <p className="text-gray-500 text-sm">Probeer een andere zoekterm of verwijder het filter.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DirectoryPage;
