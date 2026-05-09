import { useState } from 'react';
import { Smartphone, ChevronRight, Check, ArrowLeft, User, Zap } from 'lucide-react';
import { Speelpot, Winkel } from '../types';

interface Props {
  speelpotten: Speelpot[];
  winkel: Winkel;
}

type QRStap = 'qr-display' | 'klant-start' | 'klant-gegevens' | 'klant-bevestig' | 'klant-succes';

// Realistic-looking QR code SVG (static pattern)
const QRCode = ({ size = 180 }: { size?: number }) => {
  const s = size;
  const u = s / 21; // module size

  // QR data matrix (simplified but realistic looking)
  const matrix = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0],
    [1,1,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1],
    [0,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,0,0],
    [1,0,1,1,0,0,1,0,0,1,1,0,1,0,1,1,0,0,1,0,1],
    [0,1,0,0,1,1,0,1,1,0,0,1,1,0,0,1,1,0,0,1,0],
    [1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,0,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,0,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,0,1,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,1,1,0,1,1,0,1,0,1,1],
  ];

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 8 }}>
      <rect width={s} height={s} fill="white"/>
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * u + 1}
              y={r * u + 1}
              width={u - 1}
              height={u - 1}
              rx={u > 6 ? 1.5 : 0.5}
              fill="#111111"
            />
          ) : null
        )
      )}
    </svg>
  );
};

// Phone frame wrapper
const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto" style={{ width: 300 }}>
    <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
      {/* Notch */}
      <div className="bg-gray-900 w-20 h-5 rounded-full mx-auto mb-1" />
      <div className="bg-white rounded-[2rem] overflow-hidden" style={{ minHeight: 500 }}>
        {children}
      </div>
    </div>
  </div>
);

export default function QRKlantFlow({ speelpotten, winkel }: Props) {
  const [stap, setStap] = useState<QRStap>('qr-display');
  const [geselecteerdePot, setGeselecteerdePot] = useState<Speelpot | null>(
    speelpotten.find(p => p.status === 'open') || null
  );
  const [naam, setNaam] = useState('');
  const [aantalDeelnames, setAantalDeelnames] = useState(1);

  const openPotten = speelpotten.filter(p => p.status === 'open');
  const totaalBedrag = geselecteerdePot ? aantalDeelnames * geselecteerdePot.prijsPerDeelname : 0;

  const reset = () => {
    setStap('qr-display');
    setNaam('');
    setAantalDeelnames(1);
  };

  return (
    <div className="space-y-6">

      {/* Winkelier side: QR Display */}
      {stap === 'qr-display' && (
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-xl">
                <Smartphone size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">QR-code voor klant</h3>
                <p className="text-sm text-gray-500 mt-0.5">Toon deze code aan de klant. Hij/zij kan dan zelf inschrijven op zijn telefoon.</p>
              </div>
            </div>

            {/* QR + pot info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Pot</p>
                <p className="font-bold text-gray-900">{geselecteerdePot?.naam || '—'}</p>
                <p className="text-sm text-red-600 font-semibold">{geselecteerdePot?.jackpot}</p>
              </div>

              <div className="p-3 border-2 border-dashed border-red-200 rounded-2xl bg-red-50">
                <QRCode size={160} />
              </div>

              <p className="text-xs text-gray-400 text-center">
                degrotepot.be/{winkel.slug}/scan
              </p>
            </div>

            {/* Pot selector */}
            {openPotten.length > 1 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Andere pot kiezen:</p>
                <div className="flex flex-wrap gap-2">
                  {openPotten.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setGeselecteerdePot(p)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                        geselecteerdePot?.id === p.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {p.naam}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Demo button */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-amber-600" />
              <p className="text-sm font-semibold text-amber-800">Demo modus</p>
            </div>
            <p className="text-xs text-amber-700 mb-3">Klik hieronder om te zien wat jouw klant ziet op zijn telefoon nadat hij de QR-code scant.</p>
            <button
              onClick={() => setStap('klant-start')}
              className="w-full py-2.5 bg-amber-600 text-white rounded-xl text-sm font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2"
            >
              <Smartphone size={16} />
              Simuleer QR-scan
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Klant telefoon-view */}
      {(stap === 'klant-start' || stap === 'klant-gegevens' || stap === 'klant-bevestig' || stap === 'klant-succes') && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button onClick={reset} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
              <ArrowLeft size={16} className="text-gray-600" />
            </button>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Klant-scherm simulatie</p>
              <p className="text-xs text-gray-400">Dit is wat jouw klant ziet op zijn telefoon</p>
            </div>
          </div>

          <PhoneFrame>
            {/* Status bar */}
            <div className="flex justify-between items-center px-5 pt-3 pb-1">
              <span className="text-xs font-medium text-gray-700">21:30</span>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-2.5 border border-gray-700 rounded-sm relative">
                  <div className="absolute left-0.5 top-0.5 bottom-0.5 w-2 bg-gray-700 rounded-sm" />
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="px-5 py-3 bg-red-600 text-white">
              <p className="text-xs opacity-75">deGrotePot</p>
              <p className="font-bold text-base leading-tight">{winkel.naam}</p>
            </div>

            {stap === 'klant-start' && (
              <div className="px-5 py-6 flex flex-col gap-5">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check size={22} className="text-red-600" />
                  </div>
                  <p className="font-bold text-gray-900 text-base">QR-code gescand!</p>
                  <p className="text-sm text-gray-500 mt-1">Je kan nu meedoen met de speelpot van {winkel.naam.split(' ')[0]}.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 font-medium mb-1">Actieve pot</p>
                  <p className="font-bold text-gray-900">{geselecteerdePot?.naam}</p>
                  <p className="text-sm text-red-600 font-semibold">{geselecteerdePot?.jackpot}</p>
                  <p className="text-xs text-gray-500 mt-1">Trekking: {geselecteerdePot?.trekking?.split('–')[0].trim()}</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium">Betaling aan de kassa</p>
                  <p className="text-xs text-blue-600 mt-0.5">Na inschrijving betaal je cash of met kaart aan het verkooppunt.</p>
                </div>

                <button
                  onClick={() => setStap('klant-gegevens')}
                  className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  Doe mee
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {stap === 'klant-gegevens' && (
              <div className="px-5 py-5 flex flex-col gap-4">
                <div>
                  <p className="font-bold text-gray-900 text-base">Jouw gegevens</p>
                  <p className="text-xs text-gray-400 mt-0.5">Voor de administratie van de winkelier.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Naam</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-3 py-2.5 bg-gray-50 border-r border-gray-200">
                      <User size={14} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={naam}
                      onChange={e => setNaam(e.target.value)}
                      placeholder="Jan Peeters"
                      className="flex-1 px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">Aantal deelnames</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAantalDeelnames(Math.max(1, aantalDeelnames - 1))}
                      className="w-9 h-9 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                    >
                      –
                    </button>
                    <span className="flex-1 text-center font-bold text-gray-900 text-lg">{aantalDeelnames}</span>
                    <button
                      onClick={() => setAantalDeelnames(Math.min(10, aantalDeelnames + 1))}
                      className="w-9 h-9 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Te betalen aan kassa</span>
                  <span className="font-bold text-gray-900 text-base">€{totaalBedrag}</span>
                </div>

                <button
                  onClick={() => setStap('klant-bevestig')}
                  disabled={!naam}
                  className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition disabled:opacity-40"
                >
                  Verder
                </button>
              </div>
            )}

            {stap === 'klant-bevestig' && (
              <div className="px-5 py-5 flex flex-col gap-4">
                <p className="font-bold text-gray-900 text-base">Bevestigen</p>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Naam</span>
                    <span className="font-semibold text-gray-900">{naam}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pot</span>
                    <span className="font-semibold text-gray-900">{geselecteerdePot?.naam}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Deelnames</span>
                    <span className="font-semibold text-gray-900">{aantalDeelnames}x</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Te betalen</span>
                    <span className="font-bold text-red-600 text-base">€{totaalBedrag}</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <p className="text-xs text-amber-800 font-semibold">Betaling aan de kassa</p>
                  <p className="text-xs text-amber-700 mt-0.5">Geef €{totaalBedrag} aan de winkelier. Cash of bancontact.</p>
                </div>

                <button
                  onClick={() => setStap('klant-succes')}
                  className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition"
                >
                  Bevestig inschrijving
                </button>
              </div>
            )}

            {stap === 'klant-succes' && (
              <div className="px-5 py-8 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check size={28} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Je staat erin!</p>
                  <p className="text-sm text-gray-500 mt-1">Vergeet niet te betalen aan de kassa.</p>
                </div>

                <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-1.5 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Naam</span>
                    <span className="font-semibold">{naam}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pot</span>
                    <span className="font-semibold">{geselecteerdePot?.naam}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Trekking</span>
                    <span className="font-semibold text-red-600">{geselecteerdePot?.trekking?.split('–')[0].trim()}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400">Je ontvangt de uitslag automatisch via SMS na de trekking.</p>

                <button
                  onClick={reset}
                  className="text-sm text-red-600 font-semibold underline"
                >
                  Terug naar winkelier-scherm
                </button>
              </div>
            )}
          </PhoneFrame>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {(['klant-start', 'klant-gegevens', 'klant-bevestig', 'klant-succes'] as QRStap[]).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  stap === s ? 'w-6 bg-red-500' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
