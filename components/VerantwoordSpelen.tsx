import React from 'react';
import { ArrowLeft, ExternalLink, Shield, Info, Heart, PhoneCall } from 'lucide-react';
import { PageView } from '../types';

interface VerantwoordSpelenProps {
  onNavigate: (view: PageView) => void;
}

const VerantwoordSpelen: React.FC<VerantwoordSpelenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-base-100">
      <section className="bg-hero-gradient text-white py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition">
            <ArrowLeft size={16} /> Terug naar home
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Heart size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-editorial text-2xl md:text-3xl font-bold">Verantwoord spelen</h1>
              <p className="text-white/50 text-sm mt-1">Speel met plezier — ken je grenzen</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

        {/* Wat is degrotepot.be */}
        <div className="bg-white rounded-2xl border border-base-200/60 p-6">
          <h2 className="font-editorial text-lg font-bold text-base-content mb-3 flex items-center gap-2">
            <Info size={18} style={{ color: '#c8102e' }} /> Wat is degrotepot.be?
          </h2>
          <p className="text-sm text-base-content/70 leading-relaxed">
            degrotepot.be is een <strong>digitaal administratieplatform</strong> voor winkeliers die speelpotten organiseren.
            Wij organiseren geen kansspelen, ontvangen geen inzetten en keren geen winsten uit.
          </p>
          <p className="text-sm text-base-content/70 leading-relaxed mt-3">
            Een speelpot is een <strong>groepsaankoop van officiële Nationale Loterij-tickets</strong> — georganiseerd door je lokale krantenwinkel,
            beheerd via ons platform. De officiële trekking wordt altijd uitgevoerd door de Nationale Loterij n.v.,
            een autonoom overheidsbedrijf onder Belgisch toezicht.
          </p>
          <div className="mt-4 p-3 rounded-xl text-xs text-base-content/50 border border-base-200/80 bg-base-100/50">
            degrotepot.be is niet verbonden aan, gesponsord door of goedgekeurd door de Nationale Loterij n.v.
          </div>
        </div>

        {/* Ken je limieten */}
        <div className="rounded-2xl p-6 border-2" style={{ borderColor: '#c8102e22', background: 'linear-gradient(135deg, #fff5f5, #fffdf8)' }}>
          <h2 className="font-editorial text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <Shield size={18} style={{ color: '#c8102e' }} /> Ken je limieten
          </h2>
          <div className="space-y-4 text-sm text-base-content/70 leading-relaxed">
            <p>
              Deelnemen aan speelpotten is een <strong>vorm van vermaak</strong> — niet van inkomsten.
              Speel alleen met geld dat je kunt missen en dat je bewust wil besteden.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '01', text: 'Bepaal op voorhand hoeveel je maximaal wil besteden' },
                { icon: '02', text: 'Doe nooit mee om verlies te recupereren' },
                { icon: '03', text: 'Deelname is vrijwillig — je kunt altijd stoppen' },
                { icon: '04', text: 'Speel nooit met geld bestemd voor vaste kosten' },
              ].map((item) => (
                <div key={item.icon} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-base-200/60">
                  <span className="text-xs font-mono font-bold mt-0.5" style={{ color: '#c8102e' }}>{item.icon}</span>
                  <span className="text-xs text-base-content/60 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hulp nodig? */}
        <div className="bg-white rounded-2xl border border-base-200/60 p-6">
          <h2 className="font-editorial text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <PhoneCall size={18} style={{ color: '#c8102e' }} /> Hulp nodig?
          </h2>
          <p className="text-sm text-base-content/70 leading-relaxed mb-5">
            Heb je het gevoel dat gokken jou of iemand in je omgeving problemen bezorgt?
            Er is gratis, anonieme hulp beschikbaar in België.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.kenuwlimieten.be"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-base-200 hover:border-red-200 transition group"
            >
              <div>
                <div className="font-bold text-sm text-base-content group-hover:text-red-700 transition">KenUwLimieten.be</div>
                <div className="text-xs text-base-content/50 mt-0.5">Nationale Loterij verantwoord spelen</div>
              </div>
              <ExternalLink size={14} className="text-base-content/30 group-hover:text-red-500 transition" />
            </a>
            <a
              href="https://www.gokinfo.be"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-base-200 hover:border-red-200 transition group"
            >
              <div>
                <div className="font-bold text-sm text-base-content group-hover:text-red-700 transition">GokInfo.be</div>
                <div className="text-xs text-base-content/50 mt-0.5">Informatie &amp; hulplijn gokproblemen</div>
              </div>
              <ExternalLink size={14} className="text-base-content/30 group-hover:text-red-500 transition" />
            </a>
            <a
              href="tel:0800135599"
              className="flex items-center justify-between p-4 rounded-xl border-2 border-base-200 hover:border-red-200 transition group sm:col-span-2"
            >
              <div>
                <div className="font-bold text-sm text-base-content group-hover:text-red-700 transition">0800 13 55 99</div>
                <div className="text-xs text-base-content/50 mt-0.5">Gratis hulplijn gokverslaving — 24/7 bereikbaar</div>
              </div>
              <PhoneCall size={14} className="text-base-content/30 group-hover:text-red-500 transition" />
            </a>
          </div>
        </div>

        {/* Juridische positie */}
        <div className="bg-base-200/30 rounded-2xl p-6 border border-base-200/60">
          <h2 className="font-bold text-sm text-base-content mb-3">Juridische positie van dit platform</h2>
          <p className="text-xs text-base-content/50 leading-relaxed">
            degrotepot.be valt niet onder de Belgische Kansspelwet (7 mei 1999) als kansspeloperator, vermits het platform
            geen kansspelen organiseert, exploiteert of aanbiedt. De speelpotten zijn groepsaankopen van officiële
            Nationale Loterij-tickets en worden georganiseerd door individuele vergunde verkooppunten.
            degrotepot.be levert uitsluitend B2B-administratiesoftware aan deze verkooppunten.
            De officiële trekkingen en prijsuitkeringen worden volledig beheerd door de Nationale Loterij n.v.,
            een autonoom overheidsbedrijf opgericht bij wet van 19 april 2002.
          </p>
        </div>

      </div>
    </div>
  );
};

export default VerantwoordSpelen;
