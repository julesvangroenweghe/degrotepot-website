import React, { useState } from 'react';
import {
  Search, MapPin, Users, ArrowRight, Shield, Zap, MessageSquare,
  ChevronRight, Smartphone, QrCode, ClipboardList, Phone,
  AlertTriangle, CheckCircle, TrendingUp, Store, Clock
} from 'lucide-react';
import { PageView } from '../types';
import { shops } from '../utils/shops';

interface HomePageProps {
  onNavigate: (view: PageView, shopSlug?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => { if (searchQuery.trim()) onNavigate('directory'); };

  const featuredShops = shops.filter(s => s.aantalActievePotten > 0).slice(0, 6);
  const cityCounts = shops.reduce((acc, s) => {
    acc[s.stad] = (acc[s.stad] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-sm font-semibold text-red-700">België's eerste speelpottenplatform</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-tight text-gray-900 mb-6 max-w-3xl"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Speelpotten,<br />
            <span style={{ color: '#c8102e' }}>eindelijk digitaal.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
            Voor spelers: volg je deelname op en ontvang je resultaat automatisch via SMS.
            Voor winkeliers: stop met papieren lijsten en handmatig bellen.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <div className="flex-1 max-w-xs relative">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek stad of winkel..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition hover:opacity-90"
              style={{ background: '#c8102e' }}
            >
              Vind een speelpot <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('winkeliers')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 transition"
            >
              <Store size={16} /> Ik ben winkelier
            </button>
          </div>

          {/* Quick city links */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Populair:</span>
            {['Antwerpen', 'Gent', 'Brussel', 'Brugge', 'Leuven'].map(city => (
              <button
                key={city}
                onClick={() => onNavigate('directory')}
                className="text-sm px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-700 transition"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS RIBBON ── */}
      <section className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${shops.length}+`, label: 'Winkels op het platform' },
              { value: '50+', label: 'Actieve speelpotten' },
              { value: '100%', label: 'Digitaal & automatisch' },
              { value: '€0', label: 'Om te starten' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-black text-gray-900" style={{ fontFamily: 'Georgia, serif', color: i === 0 ? '#c8102e' : undefined }}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL VALUE PROP ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Eén platform, twee kanten
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">degrotepot werkt voor iedereen in de speelpot — van eerste keer speler tot doorwinterde winkelier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Voor spelers */}
            <div className="rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Smartphone size={22} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-600">Voor spelers</div>
                  <div className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Georgia, serif' }}>Altijd op de hoogte</div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { icon: <QrCode size={16} />, title: 'Scan en schrijf je in', desc: 'Betaal aan de kassa, scan de QR-code van de winkel en kies je trekking. 10 seconden.' },
                  { icon: <Shield size={16} />, title: 'Digitaal bewijs van deelname', desc: 'Geen bonnetje meer. Je krijgt een uniek deelname-ID — altijd aantoonbaar.' },
                  { icon: <MessageSquare size={16} />, title: 'Resultaat via SMS', desc: 'Na elke trekking ontvang je automatisch je resultaat en eventueel aandeel. Zonder ernaar te vragen.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
                      <div className="text-sm text-gray-400 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNavigate('directory')}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
              >
                Vind een speelpot bij jou in de buurt <ChevronRight size={15} />
              </button>
            </div>

            {/* Voor winkeliers */}
            <div className="rounded-2xl border-2 p-8 hover:shadow-md transition-shadow" style={{ borderColor: '#c8102e', background: '#fff9f9' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#fef2f2' }}>
                  <Store size={22} style={{ color: '#c8102e' }} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#c8102e' }}>Voor winkeliers</div>
                  <div className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Georgia, serif' }}>Beheer zonder kopzorgen</div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  { icon: <ClipboardList size={16} />, title: 'Stop met papieren lijsten', desc: 'Alle inschrijvingen digitaal, overzichtelijk, altijd vindbaar. Geen namen meer overtypen.' },
                  { icon: <Phone size={16} />, title: 'Geen telefoontjes meer', desc: 'Deelnemers krijgen automatisch SMS na elke trekking. "Is er iets gevallen?" verdwijnt uit je leven.' },
                  { icon: <TrendingUp size={16} />, title: 'Automatische berekening', desc: 'Bij winst berekent degrotepot het aandeel per deelnemer. Transparant voor iedereen.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#fef2f2', color: '#c8102e' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
                      <div className="text-sm text-gray-400 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onNavigate('winkeliers')}
                className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                style={{ color: '#c8102e' }}
              >
                Alles over het winkeliers-platform <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-20 md:py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Herken je dit?</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Speelpotten zijn goed voor de business.<br />
              <span className="text-gray-400">De administratie is een ramp.</span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg">Elke winkelier met een speelpot kent dit.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                {
                  pain: 'Papierwissen zoekgeraakt',
                  desc: 'Namenlijsten die zoekraken, onduidelijk handschrift, klanten die zeggen dat ze op de lijst stonden.',
                  icon: <ClipboardList size={18} />,
                },
                {
                  pain: '"Is er iets gevallen?"',
                  desc: 'Elke vrijdag en zaterdag. 20 berichten, 10 telefoontjes — terwijl je nog een rij hebt staan.',
                  icon: <Phone size={18} />,
                },
                {
                  pain: 'Een bonnetje als bewijs',
                  desc: 'Gestempeld papier. Makkelijk kwijt, moeilijk te betwisten. Geen enkel digitaal spoor.',
                  icon: <Shield size={18} />,
                },
                {
                  pain: 'Berekeningen na een win',
                  desc: '47 deelnemers, €2.300 winst, 3 inzetten. Reken dat eerlijk uit op papier, onder tijdsdruk.',
                  icon: <TrendingUp size={18} />,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm mb-1">{item.pain}</div>
                    <div className="text-sm text-gray-400 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 bg-white rounded-xl p-6 border-2" style={{ borderColor: '#c8102e' }}>
              <CheckCircle size={28} style={{ color: '#c8102e', flexShrink: 0 }} />
              <div>
                <div className="font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                  degrotepot lost dit allemaal op — automatisch.
                </div>
                <div className="text-sm text-gray-400">
                  Eén QR-code aan de kassa. De rest regelt het platform voor jou.
                </div>
              </div>
              <button
                onClick={() => onNavigate('winkeliers')}
                className="ml-auto flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-lg transition hover:opacity-90"
                style={{ background: '#c8102e' }}
              >
                Meer info <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Hoe werkt het?
            </h2>
            <p className="text-gray-400 max-w-sm mx-auto">Geen app downloaden. Geen account. Gewoon je GSM.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                icon: <QrCode size={22} />,
                title: 'Scan de QR-code',
                desc: 'Bij de kassa van je krantenwinkel. Kies je trekking en vul je GSM-nummer in. Duurt 10 seconden.',
                color: '#c8102e',
              },
              {
                step: '02',
                icon: <CheckCircle size={22} />,
                title: 'Winkelier bevestigt',
                desc: 'Je betaalt cash. De winkelier scant jouw persoonlijke QR-code ter bevestiging. Klaar.',
                color: '#1a5276',
              },
              {
                step: '03',
                icon: <MessageSquare size={22} />,
                title: 'Resultaat via SMS',
                desc: 'Na elke trekking ontvang je automatisch een SMS. Je moet er niet naar vragen.',
                color: '#d4a028',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-gray-200 z-0" style={{ width: 'calc(100% - 2rem)', left: 'calc(100% - 1rem)' }} />
                )}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                      style={{ background: item.color }}
                    >
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-gray-100" style={{ fontFamily: 'Georgia, serif' }}>{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('hoe-werkt-het')}
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
              style={{ color: '#c8102e' }}
            >
              Bekijk de volledige uitleg <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED SHOPS ── */}
      {featuredShops.length > 0 && (
        <section className="py-20 md:py-24 bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-600">Live</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Actieve speelpotten
                </h2>
              </div>
              <button
                onClick={() => onNavigate('directory')}
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
                style={{ color: '#c8102e' }}
              >
                Bekijk alle <ChevronRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredShops.map((shop) => (
                <button
                  key={shop.slug}
                  onClick={() => onNavigate('shop', shop.slug)}
                  className="bg-white rounded-2xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ background: '#c8102e' }}
                    >
                      <Store size={18} />
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Actief
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-700 transition mb-1">{shop.naam}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-4">
                    <MapPin size={12} /> {shop.stad}
                  </div>
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Users size={12} /> {shop.totaalDeelnemers} deelnemers
                    </span>
                    <span className="text-xs text-gray-400">{shop.spel}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center mt-6 md:hidden">
              <button
                onClick={() => onNavigate('directory')}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition hover:opacity-90"
                style={{ background: '#c8102e' }}
              >
                Bekijk alle speelpotten
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── CITY BROWSE ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Zoek per stad
            </h2>
            <p className="text-sm text-gray-400">Vind een speelpot in jouw buurt</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {topCities.map(([city, count]) => (
              <button
                key={city}
                onClick={() => onNavigate('directory')}
                className="group flex items-center gap-2 bg-gray-50 rounded-xl px-5 py-2.5 border border-gray-100 hover:border-red-200 hover:bg-red-50 transition"
              >
                <MapPin size={13} className="text-gray-400 group-hover:text-red-500 transition" />
                <span className="font-semibold text-sm text-gray-700 group-hover:text-red-700 transition">{city}</span>
                <span className="text-xs text-gray-400">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-28 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-8">
            <Zap size={13} style={{ color: '#c8102e' }} />
            <span className="text-sm font-semibold" style={{ color: '#c8102e' }}>Gratis starten, geen credit card</span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-black text-gray-900 mb-5 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Klaar om je speelpot<br />digitaal te zetten?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Registreer je winkel gratis. Je eerste speelpot is online binnen 5 minuten. Geen verplichtingen.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('winkeliers')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white transition hover:opacity-90 shadow-lg"
              style={{ background: '#c8102e' }}
            >
              Registreer je winkel <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('hoe-werkt-het')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-gray-700 border border-gray-200 hover:bg-gray-50 transition"
            >
              Hoe werkt het?
            </button>
          </div>

          <p className="text-xs text-gray-300 mt-6">
            Geen contracten &nbsp;·&nbsp; Maandelijks opzegbaar &nbsp;·&nbsp; Gratis te beginnen
          </p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
