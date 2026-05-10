import { useState } from 'react';
import { X, Calendar, Euro, Trophy } from 'lucide-react';
import { Speelpot } from '../types';

interface Props {
  onClose: () => void;
  onAanmaken: (pot: Speelpot) => void;
}

export default function NieuwePotModal({ onClose, onAanmaken }: Props) {
  const [naam, setNaam] = useState('');
  const [spel, setSpel] = useState<'EuroMillions' | 'Lotto'>('EuroMillions');
  const [trekkingDatum, setTrekkingDatum] = useState('');
  const [trekkingTijd, setTrekkingTijd] = useState('21:00');
  const [prijs, setPrijs] = useState('8');
  const [stap, setStap] = useState<'formulier' | 'bevestigd'>('formulier');

  const jackpots: Record<string, string> = {
    EuroMillions: '€ 87.000.000',
    Lotto: '€ 3.200.000',
  };

  const trekkingDagen: Record<string, string> = {
    EuroMillions: 'Vrijdag en dinsdag',
    Lotto: 'Zaterdag en woensdag',
  };

  const handleAanmaken = () => {
    if (!naam || !trekkingDatum) return;
    const datum = new Date(trekkingDatum);
    const dag = datum.toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const newPot: Speelpot = {
      id: `sp-${Date.now()}`,
      naam,
      spel,
      jackpot: jackpots[spel],
      prijsPerDeelname: Number(prijs),
      trekking: `${dag.charAt(0).toUpperCase() + dag.slice(1)} – ${trekkingTijd}`,
      status: 'open',
      aangemaakt: new Date().toISOString().split('T')[0],
      deelnemers: [],
    };
    onAanmaken(newPot);
    setStap('bevestigd');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        {stap === 'formulier' && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nieuwe speelpot</h2>
                <p className="text-sm text-gray-500 mt-0.5">Aanmaken duurt minder dan 1 minuut</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Naam */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Naam van de pot</label>
                <input
                  type="text"
                  value={naam}
                  onChange={e => setNaam(e.target.value)}
                  placeholder="bv. EuroMillions Vrijdag"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              {/* Spel */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Spel</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['EuroMillions', 'Lotto'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setSpel(s)}
                      className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                        spel === s
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Trekkingsdagen: {trekkingDagen[spel]}</p>
              </div>

              {/* Trekking */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> Trekkingsdatum</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={trekkingDatum}
                    onChange={e => setTrekkingDatum(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                  <input
                    type="time"
                    value={trekkingTijd}
                    onChange={e => setTrekkingTijd(e.target.value)}
                    className="w-28 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Prijs */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5"><Euro size={14} /> Prijs per deelname</span>
                </label>
                <div className="flex gap-2">
                  {['5', '8', '10', '15', '20'].map(p => (
                    <button
                      key={p}
                      onClick={() => setPrijs(p)}
                      className={`flex-1 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                        prijs === p
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      €{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {naam && trekkingDatum && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Samenvatting</p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex justify-between"><span className="text-gray-500">Naam</span><span className="font-medium">{naam}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Spel</span><span className="font-medium">{spel}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Prijs/deelname</span><span className="font-medium">€{prijs}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Jackpot</span><span className="font-semibold text-red-600">{jackpots[spel]}</span></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition">
                Annuleren
              </button>
              <button
                onClick={handleAanmaken}
                disabled={!naam || !trekkingDatum}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Pot aanmaken
              </button>
            </div>
          </>
        )}

        {stap === 'bevestigd' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={28} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pot aangemaakt!</h2>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold text-gray-700">"{naam}"</span> staat nu open voor inschrijvingen.
            </p>
            <p className="text-sm text-gray-400 mb-6">Deel de QR-code aan de kassa of geef deelnemers de link.</p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Naar dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
