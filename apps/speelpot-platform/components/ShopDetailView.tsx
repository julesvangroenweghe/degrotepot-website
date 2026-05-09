import React from 'react';
import { ArrowLeft, MapPin, Users, Trophy, Bell, QrCode, Ticket, Store, Calendar, ChevronRight } from 'lucide-react';
import { WinkelKaart } from '../types';
import { winkelKaarten } from '../utils/mockData';

interface ShopDetailViewProps {
  slug: string;
  onBack: () => void;
}

export const ShopDetailView: React.FC<ShopDetailViewProps> = ({ slug, onBack }) => {
  const winkel = winkelKaarten.find(w => w.slug === slug);

  if (!winkel) return null;

  const mockDeelnemers = [
    'Jan P.', 'Marie C.', 'Luc V.', 'Sofie J.', 'Peter D.',
    'An W.', 'Ria B.', 'Marc H.', 'Ingrid S.', 'Tom K.',
  ];

  const spelNaam = winkel.spel === 'Beide' ? 'EuroMillions & Lotto' : winkel.spel;

  return (
    <div className="flex flex-col min-h-full bg-gray-50">

      {/* Header */}
      <div className="bg-red-600 text-white px-4 pt-4 pb-6">
        <button
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-3 transition"
          onClick={onBack}
        >
          <ArrowLeft size={15} /> Alle winkels
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Store size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">{winkel.naam}</h1>
            <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
              <MapPin size={11} />
              <span>{winkel.adres}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/15 rounded-xl p-2.5 text-center">
            <div className="font-bold text-sm">{winkel.totaalDeelnemers.toLocaleString('nl-BE')}</div>
            <div className="text-white/60 text-xs">deelnemers</div>
          </div>
          <div className="bg-white/15 rounded-xl p-2.5 text-center">
            <div className="font-bold text-sm">{winkel.aantalActievePotten}</div>
            <div className="text-white/60 text-xs">potten actief</div>
          </div>
          <div className="bg-white/15 rounded-xl p-2.5 text-center">
            <div className="font-bold text-sm">100%</div>
            <div className="text-white/60 text-xs">digitaal</div>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Actieve pot */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Ticket size={15} className="text-red-500" />
              <span className="font-semibold text-sm text-gray-900">{spelNaam}</span>
            </div>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">Open</span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <Trophy size={14} className="text-amber-500" />
            <span className="font-bold text-amber-600 text-base">{winkel.jackpot}</span>
            <span className="text-xs text-gray-400">jackpot</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
            <Calendar size={12} />
            <span>Volgende trekking: <span className="font-medium text-gray-700">{winkel.volgendeTrekking}</span></span>
          </div>

          {/* Deelnemers preview */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
              <Users size={11} />
              <span>Reeds ingeschreven</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {mockDeelnemers.map((d, i) => (
                <span key={i} className="text-xs border border-gray-200 text-gray-600 rounded-lg px-2 py-0.5">{d}</span>
              ))}
              <span className="text-xs bg-red-100 text-red-700 font-semibold rounded-lg px-2 py-0.5">+{winkel.totaalDeelnemers - 10} meer</span>
            </div>
          </div>

          {/* CTA — ga naar winkel */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="font-semibold text-gray-900 text-sm mb-1">Wil je meedoen?</p>
            <p className="text-xs text-gray-500 mb-3">
              Kom langs bij <strong>{winkel.naam}</strong> en vraag aan de winkelier om je in te schrijven. Betaling aan de kassa — cash of bancontact.
            </p>
            <div className="flex items-center gap-2 text-xs text-red-600 font-semibold">
              <MapPin size={13} />
              <span>{winkel.adres}</span>
            </div>
          </div>
        </div>

        {/* Hoe het werkt */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="font-semibold text-sm text-gray-900 mb-3">Hoe werkt het?</p>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: <Store size={15} className="text-red-600" />,
                title: 'Betaal aan de kassa',
                sub: 'Ga langs bij de winkel. De winkelier schrijft je in en je betaalt cash of met bancontact.',
              },
              {
                icon: <Bell size={15} className="text-blue-500" />,
                title: 'Ontvang digitale bon',
                sub: 'Je krijgt een SMS met jouw uniek deelnamenummer. Geen papiertje meer nodig.',
              },
              {
                icon: <Trophy size={15} className="text-amber-500" />,
                title: 'Automatisch op de hoogte',
                sub: 'Na de trekking ontvang je automatisch een SMS met de uitslag en jouw aandeel.',
              },
            ].map((stap, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  {stap.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{stap.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stap.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR melding */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <QrCode size={20} className="text-gray-600" />
          </div>
          <div className="text-xs text-gray-600">
            <span className="font-semibold text-gray-900 block mb-0.5">QR-code aan de kassa</span>
            Scan de code met je gsm en schrijf jezelf in — de winkelier hoeft niets in te typen.
          </div>
        </div>

        {/* Terug knop */}
        <button
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 transition"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Terug naar overzicht
        </button>
      </div>
    </div>
  );
};
