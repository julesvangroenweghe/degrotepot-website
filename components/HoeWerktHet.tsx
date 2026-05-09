import React from 'react';
import { ArrowRight, QrCode, Shield, MessageSquare, Clock, Users, CheckCircle, Banknote, Target, ScanLine, ChevronRight, Info } from 'lucide-react';
import { PageView } from '../types';

interface HoeWerktHetProps {
  onNavigate: (view: PageView) => void;
}

const HoeWerktHet: React.FC<HoeWerktHetProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero — clean, light */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-1.5 text-sm font-medium mb-6" style={{ color: '#c8102e' }}>
            <Clock size={14} />
            <span>Van 0 tot ingeschreven in 10 seconden</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Hoe werkt het?
          </h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            Meedoen met een speelpot is nog nooit zo makkelijk geweest. Geen app, geen account, gewoon je GSM.
          </p>
        </div>
      </section>

      {/* The flow — visual timeline */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Jouw flow als deelnemer
          </h2>
          <p className="text-center text-gray-500 mb-12">
            5 stappen. Geen gedoe. Zo simpel als een krant kopen.
          </p>

          <div className="space-y-0">
            {[
              {
                step: 1,
                icon: <Banknote size={20} />,
                title: 'Betaal aan de kassa',
                desc: 'Zoals je nu al doet. Ga naar je krantenwinkel, kies je spel, en betaal je deelname contant of met kaart.',
                detail: 'De betaling verloopt volledig buiten het platform. Wij zijn geen betaaldienst — de winkelier houdt volledige controle over het geld.',
                color: '#c8102e',
              },
              {
                step: 2,
                icon: <QrCode size={20} />,
                title: 'Scan de QR-code op de toonbank',
                desc: 'Elke winkel met degrotepot heeft een QR-code naast de kassa. Scan met je smartphone-camera — geen app nodig.',
                detail: 'De QR-code linkt naar de pagina van de winkel op degrotepot.be. Je krijgt meteen de beschikbare trekkingen te zien.',
                color: '#d4a028',
              },
              {
                step: 3,
                icon: <Target size={20} />,
                title: 'Kies je trekking & vul je GSM in',
                desc: 'Je ziet alle komende trekkingen: Lotto zaterdag, EuroMillions vrijdag, noem maar op. Tik op degene waarvoor je betaald hebt.',
                detail: 'Je kan ook meerdere trekkingen vooruit kiezen. Bijvoorbeeld: je betaalt voor de EuroMillions van over 2 weken? Geen probleem, selecteer de juiste datum.',
                color: '#1a5276',
              },
              {
                step: 4,
                icon: <ScanLine size={20} />,
                title: 'Winkelier scant jouw QR-code',
                desc: 'Na het invullen verschijnt een persoonlijke QR-code op jouw scherm. De winkelier scant die om je deelname te bevestigen.',
                detail: 'Dit is de veiligheidsstap: de winkelier bevestigt dat je fysiek in de winkel bent en betaald hebt. Niemand kan vanuit de zetel meedoen zonder te betalen.',
                color: '#c8102e',
              },
              {
                step: 5,
                icon: <MessageSquare size={20} />,
                title: 'SMS met resultaat na de trekking',
                desc: 'Je krijgt automatisch een SMS zodra de trekkingsresultaten bekend zijn. Met het resultaat, je aandeel, en eventuele winst.',
                detail: 'Nooit meer vragen "Is er iets gewonnen?" of wachten tot je de winkelier ziet. Je weet het meteen, op je GSM.',
                color: '#d4a028',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                       style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  {i < 4 && <div className="w-px flex-1 min-h-[32px] my-1" style={{ background: '#e5e7eb' }}></div>}
                </div>
                {/* Content */}
                <div className="pb-8 flex-1 min-w-0">
                  <span className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full text-white mb-2"
                        style={{ background: item.color }}>
                    Stap {item.step}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  <div className="mt-3 flex items-start gap-2 bg-white rounded-lg p-3 border border-gray-100 text-xs text-gray-400 leading-relaxed">
                    <Info size={13} className="flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation models */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              3 manieren om mee te doen
            </h2>
            <p className="text-gray-500">Kies wat het beste bij jou past</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Users size={20} />,
                title: 'Vaste deelnemer',
                subtitle: 'Abonnement',
                desc: 'Je doet automatisch mee met elke trekking. Betaal wekelijks of maandelijks aan de kassa. Niks scannen, gewoon passief meespelen.',
                tag: 'Populairst',
                tagColor: '#c8102e',
              },
              {
                icon: <Target size={20} />,
                title: 'Eenmalig',
                subtitle: 'Per trekking',
                desc: 'Doe mee met een specifieke trekking. Betaal, scan, klaar. Ideaal als je af en toe wil meespelen wanneer de pot groot is.',
                tag: 'Flexibel',
                tagColor: '#1a5276',
              },
              {
                icon: <Shield size={20} />,
                title: 'Pakket',
                subtitle: 'Prepaid trekkingen',
                desc: 'Betaal vooraf voor bv. 10 trekkingen. Gebruik ze wanneer je wilt. Handig als cadeaubon of als je niet elke week langs de winkel gaat.',
                tag: 'Slim',
                tagColor: '#d4a028',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow relative">
                <span className="inline-flex items-center text-white text-[10px] font-bold px-2.5 py-1 rounded-full absolute top-4 right-4"
                      style={{ background: item.tagColor }}>
                  {item.tag}
                </span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm"
                     style={{ background: item.tagColor }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                <p className="text-xs text-gray-400 mb-3">{item.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10" style={{ fontFamily: 'Georgia, serif' }}>
            Vaak gestelde vragen
          </h2>

          <div className="space-y-3">
            {[
              {
                q: 'Moet ik een app downloaden?',
                a: 'Nee. Alles werkt via je smartphone-browser. Je scant een QR-code en dat opent automatisch de webpagina. Geen app, geen account, geen wachtwoord.',
              },
              {
                q: 'Wat als ik geen SMS gekregen heb na de trekking?',
                a: 'Je kan altijd je deelname-ID opzoeken via degrotepot.be. Elk deelname heeft een uniek nummer — dat is jouw digitaal bewijs, ongeacht de SMS.',
              },
              {
                q: 'Is dit legaal?',
                a: 'Ja. Speelpotten zijn al tientallen jaren een traditie bij krantenwinkels. De winkelier koopt collectief loten aan — degrotepot digitaliseert enkel het administratieve deel. Er is geen goklicentie nodig.',
              },
              {
                q: 'Kan iemand zich inschrijven zonder te betalen?',
                a: 'Nee. Na het scannen en invullen krijg je een persoonlijke QR-code die de winkelier moet scannen ter bevestiging. Zonder die scan ben je niet ingeschreven. De winkelier scant pas na betaling.',
              },
              {
                q: 'Wat als er gewonnen is?',
                a: 'Alle deelnemers krijgen een SMS met het resultaat en hun persoonlijk aandeel. De winkelier beheert de uitbetaling zoals altijd — degrotepot berekent automatisch de verdeling.',
              },
              {
                q: 'Kost het iets om mee te doen?',
                a: 'Nee, voor deelnemers is degrotepot 100% gratis. Je betaalt enkel je deelname aan de speelpot zelf, aan de kassa van je krantenwinkel.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
                <summary className="p-5 cursor-pointer font-semibold text-gray-900 hover:text-red-700 transition flex items-center justify-between text-sm">
                  {item.q}
                  <ArrowRight size={15} className="text-gray-300 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Klaar om mee te doen?
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Zoek een krantenwinkel met een speelpot bij jou in de buurt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('directory')}
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: '#c8102e' }}
            >
              Zoek een speelpot <ChevronRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('winkeliers')}
              className="inline-flex items-center justify-center gap-2 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Ik ben winkelier <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HoeWerktHet;
