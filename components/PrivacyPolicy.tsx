import React from 'react';
import { Shield, ArrowLeft, Mail, Lock, Eye, Trash2, FileText } from 'lucide-react';
import { PageView } from '../types';

interface PrivacyPolicyProps {
  onNavigate: (view: PageView) => void;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl border border-base-200/60 p-6 mb-5">
    <h2 className="font-editorial text-lg font-bold text-base-content mb-4 flex items-center gap-2">
      <span style={{ color: '#c8102e' }}>{icon}</span>
      {title}
    </h2>
    <div className="text-sm text-base-content/70 leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-base-100">
      <section className="bg-hero-gradient text-white py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4">
          <button onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition">
            <ArrowLeft size={16} /> Terug naar home
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-editorial text-2xl md:text-3xl font-bold">Privacybeleid</h1>
              <p className="text-white/50 text-sm mt-1">Laatste update: mei 2025</p>
            </div>
          </div>
          <p className="text-white/70 text-sm max-w-xl leading-relaxed">
            degrotepot.be respecteert je privacy. Dit beleid legt uit welke gegevens we verzamelen, waarom, en wat jouw rechten zijn.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8">

        <Section title="Wie zijn wij?" icon={<FileText size={18} />}>
          <p>
            <strong>degrotepot.be</strong> is een digitaal registratieplatform voor speelpotten bij Belgische krantenwinkels en tabakswinkels.
            Wij zijn een B2B softwareleverancier: wij bieden het digitale instrument aan de winkeliers, die op hun beurt de speelpot organiseren.
          </p>
          <p>
            degrotepot.be organiseert <strong>geen kansspelen</strong>, int geen inzetten, en keert geen winsten uit.
            Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens op dit platform.
          </p>
          <p className="text-base-content/50 text-xs">
            Contactadres: <a href="mailto:info@degrotepot.be" className="underline">info@degrotepot.be</a> — Antwerpen, België
          </p>
        </Section>

        <Section title="Welke gegevens verzamelen we?" icon={<Eye size={18} />}>
          <p><strong>Van deelnemers aan speelpotten:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>GSM-nummer</strong> — ingegeven bij registratie via QR-scan in de winkel</li>
            <li><strong>Deelname-ID</strong> — een anoniem uniek nummer per deelname</li>
            <li><strong>Keuze van trekking</strong> — welke loterijtrekking je meedoet</li>
          </ul>
          <p className="mt-2"><strong>Van winkeliers (abonnees):</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Naam, e-mailadres, winkelnaam, adres</li>
            <li>Betalingsgegevens (via onze betalingsverwerker — nooit opgeslagen bij ons)</li>
          </ul>
          <p className="mt-2"><strong>Wij verzamelen NIET:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Namen van deelnemers</li>
            <li>IP-adressen of locatiedata</li>
            <li>Financiële gegevens van deelnemers (cash wordt betaald aan de kassa)</li>
          </ul>
        </Section>

        <Section title="Waarvoor gebruiken we deze gegevens?" icon={<Lock size={18} />}>
          <p><strong>GSM-nummers van deelnemers worden uitsluitend gebruikt voor:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Het versturen van een <strong>SMS-bevestiging</strong> bij inschrijving (deelname-ID)</li>
            <li>Het versturen van het <strong>trekking-resultaat</strong> per SMS na de trekking</li>
          </ul>
          <p className="font-medium text-base-content/90">
            Je GSM-nummer wordt nooit gebruikt voor marketing, reclame, of doorverkocht aan derden. Punt.
          </p>
          <p><strong>Winkeliersgegevens worden gebruikt voor:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Beheer van het winkeliersaccount</li>
            <li>Facturatie en abonnementsbeheer</li>
            <li>Weergave op de publieke winkelpagina (naam, stad, contactinfo — enkel indien zichtbaarheid aangevinkt)</li>
          </ul>
        </Section>

        <Section title="Rechtsgrond verwerking" icon={<Shield size={18} />}>
          <p>Wij verwerken persoonsgegevens op basis van:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Uitvoering van een overeenkomst</strong> — de deelname aan de speelpot vereist het versturen van bevestiging en resultaat</li>
            <li><strong>Toestemming</strong> — gegeven bij het invullen van het GSM-nummer in de registratiestap (met uitdrukkelijk akkoord)</li>
            <li><strong>Gerechtvaardigd belang</strong> — voor winkeliersdata in het kader van de B2B-dienstverlening</li>
          </ul>
        </Section>

        <Section title="Hoe lang bewaren we gegevens?" icon={<Clock />}>
          <p>
            <strong>Deelname-gegevens:</strong> bewaard tot 30 dagen na de betrokken trekking, daarna automatisch verwijderd.
          </p>
          <p>
            <strong>GSM-nummers:</strong> maximaal 30 dagen na de trekking, daarna definitief gewist.
          </p>
          <p>
            <strong>Winkeliersgegevens:</strong> bewaard zolang het abonnement actief is + 2 jaar na opzegging (wettelijke bewaarplicht facturen).
          </p>
        </Section>

        <Section title="Jouw rechten (AVG/GDPR)" icon={<Trash2 size={18} />}>
          <p>Je hebt als betrokkene de volgende rechten:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Recht op inzage</strong> — je kunt opvragen welke gegevens we over jou bewaren</li>
            <li><strong>Recht op correctie</strong> — onjuiste gegevens kunnen worden gecorrigeerd</li>
            <li><strong>Recht op wissing</strong> — je kunt vragen je gegevens te verwijderen ("recht om vergeten te worden")</li>
            <li><strong>Recht op bezwaar</strong> — je kunt bezwaar maken tegen bepaalde verwerkingen</li>
            <li><strong>Recht op overdraagbaarheid</strong> — je kunt een kopie van je gegevens opvragen in leesbaar formaat</li>
          </ul>
          <p className="mt-2">
            Dien een verzoek in via <a href="mailto:info@degrotepot.be" className="underline font-medium">info@degrotepot.be</a>.
            We reageren binnen 30 dagen. Je kunt ook een klacht indienen bij de{' '}
            <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="underline">
              Gegevensbeschermingsautoriteit (GBA)
            </a>.
          </p>
        </Section>

        <Section title="Cookies" icon={<Shield size={18} />}>
          <p>
            degrotepot.be gebruikt <strong>geen tracking cookies</strong> en geen analytics van derde partijen (geen Google Analytics, geen Meta Pixel).
            De site slaat enkel een sessioncookie op voor technische werking (onthouden van je taalvoorkeur en navigatiestatus).
            Er is geen cookiebanner nodig voor functionele cookies zonder tracking.
          </p>
        </Section>

        <Section title="Derde partijen" icon={<Globe />}>
          <p>Wij werken samen met volgende partijen voor de werking van het platform:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>SMS-provider</strong> — voor het versturen van deelname-bevestigingen en resultaten (enkel GSM-nummer en bericht worden gedeeld)</li>
            <li><strong>Hostingprovider</strong> — serverinfrastructuur in Europa (AVG-conform)</li>
          </ul>
          <p>Alle verwerkers zijn contractueel gebonden aan strikte GDPR-naleving via een verwerkersovereenkomst.</p>
        </Section>

        <div className="bg-base-200/30 rounded-2xl p-6 text-center">
          <p className="text-sm text-base-content/50 mb-2">Vragen over dit privacybeleid?</p>
          <a href="mailto:info@degrotepot.be" className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: '#c8102e' }}>
            <Mail size={16} /> info@degrotepot.be
          </a>
        </div>
      </div>
    </div>
  );
};

// Missing import fix
const Clock: React.FC<{ children?: React.ReactNode }> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const Globe: React.FC<{ children?: React.ReactNode }> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default PrivacyPolicy;
