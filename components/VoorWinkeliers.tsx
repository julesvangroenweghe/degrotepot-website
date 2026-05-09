import React from 'react';
import { ArrowRight, Star, Users, QrCode, MessageSquare, TrendingUp, Clock, Shield, Zap, Check, ChevronRight, FileText, PhoneCall, Receipt, Calculator, Trophy, Store } from 'lucide-react';
import { PageView } from '../types';

interface VoorWinkeliersProps {
  onNavigate: (view: PageView) => void;
}

const VoorWinkeliers: React.FC<VoorWinkeliersProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero — clean, light, pitch-first */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-1.5 text-sm font-medium mb-6" style={{ color: '#c8102e' }}>
              <Store size={14} />
              <span>Voor krantenwinkeliers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5" style={{ fontFamily: 'Georgia, serif' }}>
              Je speelpot beheren<br />
              <span style={{ color: '#c8102e' }}>zonder het gedoe.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl">
              Vrijdagavond, 20 klanten die vragen "Is er iets gevallen?" — terwijl je nog 15 man in de rij hebt staan. Herkenbaar? Dat hoeft niet meer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('winkeliers')}
                className="inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-all hover:opacity-90 active:scale-95 shadow-lg"
                style={{ background: '#c8102e' }}
              >
                Start gratis <ChevronRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('hoe-werkt-het')}
                className="inline-flex items-center justify-center gap-2 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Bekijk hoe het werkt <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points — the pitch */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Herken je dit?
            </h2>
            <p className="text-gray-500">Elke winkelier met een speelpot kent het gevoel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <FileText size={20} />,
                pain: 'Papieren lijsten bijhouden',
                desc: 'Namenlijsten die zoekraken, onduidelijk handschrift, klanten die beweren dat ze op de lijst staan...',
                color: '#c8102e',
              },
              {
                icon: <PhoneCall size={20} />,
                pain: '20 telefoontjes na elke trekking',
                desc: '"Is er iets gevallen?" — elke vrijdag en zaterdag hetzelfde verhaal. Tijd die je niet hebt.',
                color: '#d4a028',
              },
              {
                icon: <Receipt size={20} />,
                pain: 'Bonnetjes als "bewijs"',
                desc: 'Een gestempeld papierke. Makkelijk te verliezen, moeilijk te betwisten. Wie bewijst wat?',
                color: '#1a5276',
              },
              {
                icon: <Calculator size={20} />,
                pain: 'Berekeningen na winst',
                desc: '47 deelnemers, €2.300 winst, 3 verschillende inzetten... Reken dat maar eens eerlijk uit op papier.',
                color: '#c8102e',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm"
                     style={{ background: item.color }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.pain}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-xl md:text-2xl font-black text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              degrotepot lost dit allemaal op —{' '}
              <span style={{ color: '#c8102e' }}>automatisch.</span>
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Wat krijg je?
            </h2>
            <p className="text-gray-500">Eén keer instellen, daarna draait alles automatisch.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <QrCode size={20} />,
                title: 'QR-code voor je toonbank',
                desc: 'Klanten scannen, kiezen hun trekking, en schrijven zich in. Jij hoeft niks te doen.',
                color: '#c8102e',
              },
              {
                icon: <Shield size={20} />,
                title: 'Scan-bevestiging',
                desc: 'Klant toont QR na inschrijving, jij scant ter bevestiging. Geen betaling = geen scan = geen deelname.',
                color: '#d4a028',
              },
              {
                icon: <MessageSquare size={20} />,
                title: 'Automatische SMS',
                desc: 'Na elke trekking krijgen alle deelnemers automatisch een SMS met het resultaat. Nul telefoontjes.',
                color: '#1a5276',
              },
              {
                icon: <Users size={20} />,
                title: 'Deelnemersoverzicht',
                desc: 'Altijd weten wie er meedoet, met welke pot, voor welke trekking. Alles digitaal.',
                color: '#c8102e',
              },
              {
                icon: <TrendingUp size={20} />,
                title: 'Automatische berekening',
                desc: 'Bij winst berekent degrotepot automatisch het aandeel per deelnemer. Fair en transparant.',
                color: '#d4a028',
              },
              {
                icon: <Zap size={20} />,
                title: 'Je eigen pagina',
                desc: 'degrotepot.be/jouw-winkel — een professionele pagina die je kan delen met klanten.',
                color: '#1a5276',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm"
                     style={{ background: item.color }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Eerlijke prijzen
            </h2>
            <p className="text-gray-500">Begin gratis. Upgrade wanneer je wilt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Gratis',
                price: '€0',
                period: 'voor altijd',
                desc: 'Perfecte start',
                color: '#1a5276',
                features: [
                  'Je winkel op degrotepot.be',
                  'QR-code (zelf afdrukken)',
                  'Tot 1 actieve speelpot',
                  'SMS-resultaten naar deelnemers',
                  'Deelnemersoverzicht',
                ],
                cta: 'Start gratis',
                highlight: false,
              },
              {
                name: 'Starter',
                price: '€19',
                period: '/maand',
                desc: 'Voor de actieve winkel',
                color: '#c8102e',
                features: [
                  'Alles van Gratis, plus:',
                  'Onbeperkte speelpotten',
                  'Professionele QR-sticker',
                  'Prioritaire support',
                  'Statistieken & inzichten',
                ],
                cta: 'Start met Starter',
                highlight: true,
              },
              {
                name: 'Pro',
                price: '€39',
                period: '/maand',
                desc: 'De complete oplossing',
                color: '#d4a028',
                features: [
                  'Alles van Starter, plus:',
                  'Tablet voor aan de kassa',
                  'Meerdere spellen tegelijk',
                  'Eigen branding',
                  'Dedicated accountmanager',
                ],
                cta: 'Start met Pro',
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 relative transition-shadow hover:shadow-lg ${
                  plan.highlight ? 'border-2 shadow-md' : 'border border-gray-100'
                }`}
                style={plan.highlight ? { borderColor: plan.color } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md"
                          style={{ background: plan.color }}>
                      <Star size={10} fill="white" /> Meest gekozen
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                  <p className="text-xs text-gray-400">{plan.desc}</p>
                </div>

                <div className="mb-5">
                  <span className="text-4xl font-black" style={{ fontFamily: 'Georgia, serif', color: plan.color }}>{plan.price}</span>
                  <span className="text-sm text-gray-400 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 ${
                    plan.highlight ? 'text-white shadow-md' : 'border-2 bg-transparent'
                  }`}
                  style={plan.highlight
                    ? { background: plan.color }
                    : { borderColor: plan.color, color: plan.color }
                  }
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Alle prijzen excl. BTW. Geen contracten, maandelijks opzegbaar.
          </p>
        </div>
      </section>

      {/* Social proof / Essen Press */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ background: '#c8102e' }}>
                <Trophy size={22} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-xl" style={{ fontFamily: 'Georgia, serif' }}>Essen Press</h3>
                <p className="text-sm text-gray-400">VIP Gold winkel — Essen, Antwerpen</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { val: '150+', label: 'Deelnemers per trekking' },
                { val: '€1.000+', label: 'Per speelpot' },
                { val: '3+', label: 'Actieve speelpotten' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                  <div className="text-2xl font-black" style={{ fontFamily: 'Georgia, serif', color: '#c8102e' }}>{s.val}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Essen Press beheert wekelijks meerdere speelpotten met 100–200 deelnemers.
              Ze posten resultaten handmatig op hun website en Facebook. Met degrotepot zou dit volledig
              automatisch verlopen — van inschrijving tot resultaatmelding.
            </p>
          </div>
        </div>
      </section>

      {/* CTA — clean, no dark gradient */}
      <section className="py-16 md:py-20 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Klaar om te starten?
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
            Begin gratis. Geen credit card nodig. Je speelpot draait binnen 5 minuten.
          </p>
          <button
            onClick={() => onNavigate('winkeliers')}
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:opacity-90 active:scale-95 shadow-lg mb-4"
            style={{ background: '#c8102e' }}
          >
            Registreer je winkel — gratis <ChevronRight size={18} />
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Vragen? Mail ons op{' '}
            <a href="mailto:info@degrotepot.be" className="underline" style={{ color: '#c8102e' }}>
              info@degrotepot.be
            </a>
          </p>
        </div>
      </section>

    </div>
  );
};

export default VoorWinkeliers;
