import React, { useState } from 'react';
import { Bell, Trophy, Frown, CheckCircle, Clock, Zap, RotateCcw } from 'lucide-react';
import { Speelpot } from '../types';

interface ResultatenViewProps {
  speelpotten: Speelpot[];
}

export const ResultatenView: React.FC<ResultatenViewProps> = ({ speelpotten }) => {
  const [gesimuleerd, setGesimuleerd] = useState(false);
  const [stap, setStap] = useState(0);
  const [gewonnen, setGewonnen] = useState(true);

  const openPot = speelpotten.find(p => p.status === 'open');

  function simuleerTrekking() {
    setGesimuleerd(true);
    setStap(1);
    setTimeout(() => setStap(2), 1200);
    setTimeout(() => setStap(3), 2400);
    setTimeout(() => setStap(4), 3600);
  }

  const winBedrag = 1240;
  const aantalDeelnemers = openPot?.deelnemers.length || 6;
  const totaalDeelnames = openPot?.deelnemers.reduce((s, d) => s + d.aantalDeelnames, 0) || 8;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h2 className="font-bold text-gray-900 text-base">Automatische resultaten</h2>
        <p className="text-sm text-gray-500">Zo werkt het na elke trekking</p>
      </div>

      {/* Uitleg flow */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-4">Hoe het werkt — zonder dat jij iets doet</h3>
        <div className="flex flex-col gap-3">
          {[
            'Trekking vindt plaats',
            'Platform haalt resultaten op bij Nationale Loterij',
            'Vergelijkt met jouw speelpotnummers',
            'Alle deelnemers krijgen automatisch een SMS',
          ].map((tekst, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-red-600">{i + 1}</span>
              </div>
              <span className="text-sm text-gray-700">{tekst}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simulatie */}
      {openPot && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{openPot.naam}</h3>
              <p className="text-xs text-gray-400">{openPot.trekking}</p>
            </div>
            <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full">{openPot.jackpot}</span>
          </div>

          {!gesimuleerd ? (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition"
                  onClick={() => { setGewonnen(true); simuleerTrekking(); }}
                >
                  <Trophy size={15} /> Winst simuleren
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition"
                  onClick={() => { setGewonnen(false); simuleerTrekking(); }}
                >
                  <Frown size={15} /> Verlies simuleren
                </button>
              </div>
              <p className="text-xs text-center text-gray-400">Druk op een knop om te zien wat er automatisch gebeurt</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              {[
                { label: 'Trekking opgehaald', sub: 'nationale-loterij.be geraadpleegd' },
                {
                  label: 'Nummers vergeleken',
                  sub: stap >= 2
                    ? (gewonnen ? `Match gevonden! €${winBedrag} gewonnen` : 'Helaas, geen match')
                    : '...'
                },
                {
                  label: 'SMS verstuurd',
                  sub: stap >= 3 ? `${aantalDeelnemers} berichten verstuurd` : '...'
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-opacity duration-500 ${stap >= i + 1 ? 'opacity-100' : 'opacity-30'}`}
                >
                  {stap >= i + 1
                    ? <CheckCircle size={18} className="text-green-500 shrink-0" />
                    : <Clock size={18} className="text-gray-300 shrink-0" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}

              {stap >= 4 && (
                <div className={`rounded-xl p-4 mt-2 border ${gewonnen ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {gewonnen
                      ? <Trophy size={16} className="text-green-600" />
                      : <Frown size={16} className="text-amber-600" />}
                    <span className={`font-bold text-sm ${gewonnen ? 'text-green-700' : 'text-amber-700'}`}>
                      Voorbeeld SMS naar alle deelnemers:
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-xs text-gray-700 italic border border-gray-100 mb-3">
                    {gewonnen
                      ? `"GEWONNEN! De speelpot van Paper-Shop Beerse heeft €${winBedrag} gewonnen bij EuroMillions! Jouw aandeel: €${Math.round(winBedrag / totaalDeelnames * 1)}-€${Math.round(winBedrag / totaalDeelnames * 3)} (afhankelijk van deelnames). Kom langs in de winkel om je winst op te halen. Proficiat!"`
                      : `"Helaas, de speelpot van Paper-Shop Beerse heeft deze week niet gewonnen. Volgende EuroMillions trekking: dinsdag. Veel succes volgende keer!"`
                    }
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap size={12} className="text-amber-500" />
                    <span>{aantalDeelnemers} SMS'jes automatisch verstuurd — winkelier deed niks</span>
                  </div>
                </div>
              )}

              {stap >= 4 && (
                <button
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 py-2 transition"
                  onClick={() => { setGesimuleerd(false); setStap(0); }}
                >
                  <RotateCcw size={14} /> Opnieuw simuleren
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Voordelen */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
        <h3 className="font-semibold text-red-700 text-sm flex items-center gap-2 mb-3">
          <Bell size={14} /> Wat dit oplost vs. nu
        </h3>
        <div className="flex flex-col gap-2">
          {[
            ['Winkelier belt iedereen', 'Automatische SMS'],
            ['Klant vergeet te checken', 'Wordt automatisch verwittigd'],
            ['Papieren lijstje', 'Digitaal dashboard'],
            ['Bonnetje verloren = pech', 'Digitale bon met code'],
            ['Geen bewijs bij winst', 'Tijdgestempeld logboek'],
          ].map(([voor, na]) => (
            <div key={voor} className="flex justify-between text-xs gap-2">
              <span className="text-red-400 line-through">{voor}</span>
              <span className="text-green-700 font-semibold">{na} ✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
