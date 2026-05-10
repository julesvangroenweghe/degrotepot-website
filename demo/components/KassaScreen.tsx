import React, { useState } from 'react';
import { User, Smartphone, CheckCircle, QrCode, Ticket, ChevronRight, RotateCcw, Store } from 'lucide-react';
import { Speelpot, Deelnemer, KassaMode } from '../types';
import { winkel } from '../utils/mockData';
import QRKlantFlow from './QRKlantFlow';

interface KassaScreenProps {
  speelpotten: Speelpot[];
  onDeelnemerToevoegen: (potId: string, deelnemer: Deelnemer) => void;
}

export const KassaScreen: React.FC<KassaScreenProps> = ({ speelpotten, onDeelnemerToevoegen }) => {
  const [mode, setMode] = useState<KassaMode>('invoer');
  const [kassaTab, setKassaTab] = useState<'handmatig' | 'qr'>('handmatig');
  const [naam, setNaam] = useState('');
  const [gsm, setGsm] = useState('');
  const [deelnames, setDeelnames] = useState(1);
  const [geselecteerdePot, setGeselecteerdePot] = useState<string>(speelpotten[0]?.id || '');
  const [nieuweDeelnemer, setNieuweDeelnemer] = useState<Deelnemer | null>(null);
  const [smsAnimatie, setSmsAnimatie] = useState(false);

  const openPotten = speelpotten.filter(p => p.status === 'open');
  const geselecteerdePotData = openPotten.find(p => p.id === geselecteerdePot);
  const totaal = deelnames * (geselecteerdePotData?.prijsPerDeelname || 0);

  function genereerCode(): string {
    const nums = Math.floor(Math.random() * 90000) + 10000;
    const prefix = winkel.slug.slice(0, 2).toUpperCase();
    return `${prefix}-2026-${nums}`;
  }

  function handleInschrijven() {
    if (!naam.trim() || !geselecteerdePot) return;
    const deelnemer: Deelnemer = {
      id: `d-${Date.now()}`,
      naam: naam.trim(),
      gsm: gsm.trim() || '—',
      aantalDeelnames: deelnames,
      betaald: true,
      datum: new Date().toISOString().split('T')[0],
      smsStatus: gsm.trim() ? 'wachten' : 'geen',
    };
    setNieuweDeelnemer(deelnemer);
    setMode('bevestiging');
    if (gsm.trim()) {
      setTimeout(() => {
        setSmsAnimatie(true);
        onDeelnemerToevoegen(geselecteerdePot, { ...deelnemer, smsStatus: 'verstuurd' });
      }, 1500);
    } else {
      onDeelnemerToevoegen(geselecteerdePot, deelnemer);
    }
  }

  function handleReset() {
    setNaam('');
    setGsm('');
    setDeelnames(1);
    setMode('invoer');
    setNieuweDeelnemer(null);
    setSmsAnimatie(false);
  }

  if (mode === 'bevestiging' && nieuweDeelnemer) {
    const pot = openPotten.find(p => p.id === geselecteerdePot);
    const code = genereerCode();
    const aandeel = ((deelnames / ((pot?.deelnemers.length || 0) + deelnames)) * 100).toFixed(1);
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-sm p-6 flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">Inschrijving bevestigd!</h2>
            <p className="text-gray-500 text-sm mt-1">{nieuweDeelnemer.naam}</p>
          </div>

          {/* Digitale bon */}
          <div className="w-full rounded-xl border border-gray-200 p-4 bg-gray-50 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Deelname</span>
              <span className="font-mono text-red-600 font-bold text-sm">{code}</span>
            </div>
            <div className="border-t border-gray-200 my-1" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Speelpot</span>
              <span className="font-semibold">{pot?.naam}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Jackpot</span>
              <span className="font-semibold text-amber-600">{pot?.jackpot}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Trekking</span>
              <span className="font-semibold">{pot?.trekking}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Deelnames</span>
              <span className="font-semibold">{deelnames}x = €{totaal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Aandeel in pot</span>
              <span className="font-semibold">~{aandeel}%</span>
            </div>
          </div>

          {/* SMS status */}
          {gsm.trim() && (
            <div className={`w-full rounded-xl p-3 flex items-center gap-2 transition-all duration-500 ${smsAnimatie ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
              <Smartphone size={16} className={smsAnimatie ? 'text-green-600' : 'text-blue-500'} />
              <span className="text-sm font-medium">
                {smsAnimatie
                  ? `SMS verstuurd naar ${nieuweDeelnemer.gsm}`
                  : `SMS wordt verstuurd naar ${nieuweDeelnemer.gsm}...`}
              </span>
            </div>
          )}

          {smsAnimatie && (
            <div className="w-full rounded-xl bg-gray-100 p-3 text-xs text-gray-600 italic border-l-4 border-green-500">
              "Je bent ingeschreven voor {pot?.naam} van {winkel.naam}! Code: {code}. Je ontvangt automatisch bericht na de trekking. Veel succes!"
            </div>
          )}

          <button
            className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
            onClick={handleReset}
          >
            <RotateCcw size={16} /> Nieuwe inschrijving
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full p-4 gap-4 max-w-lg mx-auto">
      {/* Winkel header */}
      <div className="flex items-center gap-3 py-2">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
          <Store size={20} className="text-red-600" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900">{winkel.naam}</h1>
          <p className="text-xs text-gray-500">{winkel.adres}</p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition ${
            kassaTab === 'handmatig'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setKassaTab('handmatig')}
        >
          <User size={14} /> Handmatig
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition ${
            kassaTab === 'qr'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setKassaTab('qr')}
        >
          <QrCode size={14} /> QR-code
        </button>
      </div>

      {kassaTab === 'qr' ? (
        <QRKlantFlow speelpotten={speelpotten} winkel={winkel} />
      ) : (
        /* Handmatige invoer */
        <div className="flex flex-col gap-4">
          {/* Speelpot kiezen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Speelpot</label>
            <div className="flex flex-col gap-2">
              {openPotten.map(pot => (
                <button
                  key={pot.id}
                  className={`rounded-xl border-2 p-3 text-left transition-all ${
                    geselecteerdePot === pot.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setGeselecteerdePot(pot.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-gray-900 flex items-center gap-2">
                        <Ticket size={13} className="text-red-500" />
                        {pot.naam}
                      </p>
                      <p className="text-xs text-amber-600 font-semibold mt-0.5">{pot.jackpot}</p>
                      <p className="text-xs text-gray-400">{pot.trekking}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-lg">€{pot.prijsPerDeelname}/deeln.</span>
                      <p className="text-xs text-gray-400 mt-1">{pot.deelnemers.length} deelnemers</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Naam */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Naam klant</label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="px-3 py-3 bg-gray-50 border-r border-gray-200">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="grow px-3 py-3 text-gray-900 focus:outline-none text-sm"
                placeholder="Jan Peeters"
                value={naam}
                onChange={e => setNaam(e.target.value)}
              />
            </div>
          </div>

          {/* GSM (optioneel) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              GSM-nummer <span className="text-gray-400 font-normal">(optioneel — voor SMS-uitslag)</span>
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="px-3 py-3 bg-gray-50 border-r border-gray-200">
                <Smartphone size={16} className="text-gray-400" />
              </div>
              <input
                type="tel"
                className="grow px-3 py-3 text-gray-900 focus:outline-none text-sm"
                placeholder="0478 12 34 56"
                value={gsm}
                onChange={e => setGsm(e.target.value)}
              />
            </div>
          </div>

          {/* Aantal deelnames */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Aantal deelnames</label>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3">
              <button
                className="w-9 h-9 rounded-lg border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center transition"
                onClick={() => setDeelnames(Math.max(1, deelnames - 1))}
              >
                −
              </button>
              <span className="font-bold text-xl flex-1 text-center text-gray-900">{deelnames}</span>
              <button
                className="w-9 h-9 rounded-lg border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center transition"
                onClick={() => setDeelnames(deelnames + 1)}
              >
                +
              </button>
              <span className="text-gray-500 text-sm ml-2">
                = <strong className="text-gray-900">€{totaal}</strong>
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-base hover:bg-red-700 transition flex items-center justify-center gap-2 mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!naam.trim()}
            onClick={handleInschrijven}
          >
            Inschrijven <ChevronRight size={18} />
          </button>
          <p className="text-xs text-center text-gray-400">Betaling aan de kassa — cash of bancontact</p>
        </div>
      )}
    </div>
  );
};
