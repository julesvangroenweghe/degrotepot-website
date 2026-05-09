import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, ArrowLeft, Star, Users, QrCode, MessageSquare, Clock, ChevronRight, Shield } from 'lucide-react';
import { PageView } from '../types';
import { shops } from '../utils/shops';

interface ShopDetailPageProps {
  shopId: string;
  onNavigate: (view: PageView, shopSlug?: string) => void;
}

const ShopDetailPage: React.FC<ShopDetailPageProps> = ({ shopId, onNavigate }) => {
  const shop = shops.find(s => s.slug === shopId);
  const [showQrDemo, setShowQrDemo] = useState(false);

  if (!shop) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">🤷</div>
        <h2 className="font-editorial text-2xl font-bold mb-3">Winkel niet gevonden</h2>
        <button onClick={() => onNavigate('directory')} className="btn btn-lotto rounded-xl mt-4">← Terug naar overzicht</button>
      </div>
    );
  }

  const hasActivePot = shop.aantalActievePotten > 0;

  const trekkingen = [
    { game: 'Lotto', date: 'Zaterdag 10 mei', price: '€2,50', color: '#c8102e', emoji: '🎱' },
    { game: 'EuroMillions', date: 'Dinsdag 13 mei', price: '€5,00', color: '#d4a028', emoji: '⭐' },
    { game: 'Lotto', date: 'Woensdag 14 mei', price: '€2,50', color: '#c8102e', emoji: '🎱' },
    { game: 'EuroMillions', date: 'Vrijdag 16 mei', price: '€5,00', color: '#d4a028', emoji: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <section className="bg-hero-gradient text-white py-10 md:py-14 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <button onClick={() => onNavigate('directory')} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition">
            <ArrowLeft size={16} /> Terug naar alle winkels
          </button>
          <div className="flex items-start gap-4 animate-in">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                 style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.1)' }}>
              {shop.emoji}
            </div>
            <div>
              <h1 className="font-editorial text-2xl md:text-3xl font-bold">{shop.naam}</h1>
              <div className="flex items-center gap-2 text-white/50 mt-1">
                <MapPin size={14} /> <span className="text-sm">{shop.adres}</span>
              </div>
              {hasActivePot && (
                <div className="mt-3">
                  <span className="tag-pill bg-green-500/20 text-green-300 border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span> Speelpot actief
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {hasActivePot && (
              <div className="bg-white rounded-2xl border border-base-200/60 overflow-hidden animate-in">
                <div className="p-5 border-b border-base-200/50">
                  <h2 className="font-bold text-base-content flex items-center gap-2">
                    <Star size={18} fill="#d4a028" className="text-yellow-500" /> Komende trekkingen
                  </h2>
                  <p className="text-sm text-base-content/50 mt-1">Scan de QR-code in de winkel om mee te doen</p>
                </div>
                <div className="divide-y divide-base-200/50">
                  {trekkingen.map((t, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-base-100/50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${t.color}10` }}>{t.emoji}</div>
                        <div>
                          <div className="font-semibold text-sm text-base-content">{t.game}</div>
                          <div className="text-xs text-base-content/40">{t.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm" style={{ color: t.color }}>{t.price}</span>
                        <ChevronRight size={16} className="text-base-content/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasActivePot && (
              <div className="bg-gold-subtle rounded-2xl p-6 border border-yellow-200/50 animate-in-delay-1">
                <h3 className="font-bold text-base-content flex items-center gap-2 mb-4">
                  <QrCode size={18} style={{ color: '#c8102e' }} /> Hoe doe je mee?
                </h3>
                <div className="space-y-3">
                  {[
                    'Ga naar de winkel en betaal je deelname aan de kassa',
                    'Scan de QR-code op de toonbank met je smartphone',
                    'Kies je trekking(en) en vul je GSM-nummer in',
                    'Toon je persoonlijke QR-code — de winkelier scant hem ter bevestiging',
                    'Klaar! Je krijgt een SMS met je deelname-ID en na elke trekking het resultaat',
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ background: '#c8102e' }}>
                        {i + 1}
                      </div>
                      <span className="text-sm text-base-content/70">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasActivePot && (
              <div className="bg-white rounded-2xl border border-base-200/60 p-6 text-center animate-in-delay-2">
                <button onClick={() => setShowQrDemo(!showQrDemo)} className="btn btn-lotto rounded-xl gap-2">
                  <QrCode size={18} /> {showQrDemo ? 'Verberg demo' : 'Bekijk demo QR-scan'}
                </button>
                {showQrDemo && (
                  <div className="mt-6 animate-fade">
                    <div className="inline-block bg-base-100 rounded-2xl p-6 border border-base-200">
                      <div className="w-64 mx-auto">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                          <div className="p-3 text-center" style={{ background: 'linear-gradient(135deg, #c8102e, #e8353a)' }}>
                            <span className="text-white text-xs font-bold">degrotepot.be</span>
                          </div>
                          <div className="p-4">
                            <p className="text-sm font-bold text-base-content mb-1">{shop.naam}</p>
                            <p className="text-xs text-base-content/50 mb-3">Kies je trekking:</p>
                            {trekkingen.slice(0, 2).map((t, i) => (
                              <div key={i} className={`p-2 rounded-lg mb-2 border text-left text-xs ${i === 0 ? 'border-red-200 bg-red-50' : 'border-base-200'}`}>
                                <span className="mr-1">{t.emoji}</span> <span className="font-semibold">{t.game}</span>
                                <span className="text-base-content/40 ml-1">{t.date}</span>
                              </div>
                            ))}
                            <div className="mt-3 p-2 bg-base-100 rounded-lg text-xs text-center">
                              <span className="text-base-content/50">GSM: </span>
                              <span className="font-mono font-bold">0476 •• •• ••</span>
                            </div>
                            <div className="mt-2 flex items-start gap-1.5 px-1">
                              <div className="w-3 h-3 rounded border border-base-300 bg-white flex-shrink-0 mt-0.5 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-sm" style={{ background: '#c8102e' }}></div>
                              </div>
                              <span className="text-xs text-base-content/40 leading-tight">
                                Ik ga akkoord dat mijn GSM-nummer wordt gebruikt voor deelname-bevestiging en trekking-resultaat via SMS.
                              </span>
                            </div>
                            <div className="mt-3 text-center">
                              <div className="inline-block px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: '#c8102e' }}>Bevestig →</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-base-content/40 mt-4">Dit is een voorbeeld van wat je ziet na het scannen van de QR-code</p>
                  </div>
                )}
              </div>
            )}

            {shop.beschrijving && (
              <div className="bg-white rounded-2xl border border-base-200/60 p-6 animate-in">
                <h3 className="font-bold text-base-content mb-2">Over deze winkel</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{shop.beschrijving}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-base-200/60 p-5 animate-in-delay-1">
              <h3 className="font-bold text-sm text-base-content mb-4">Contactgegevens</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-base-100 flex items-center justify-center"><MapPin size={14} className="text-base-content/40" /></div>
                  <span className="text-sm text-base-content/70">{shop.adres}</span>
                </div>
                {shop.telefoon && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-base-100 flex items-center justify-center"><Phone size={14} className="text-base-content/40" /></div>
                    <span className="text-sm text-base-content/70">{shop.telefoon}</span>
                  </div>
                )}
                {shop.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-base-100 flex items-center justify-center"><Mail size={14} className="text-base-content/40" /></div>
                    <span className="text-sm text-base-content/70">{shop.email}</span>
                  </div>
                )}
                {shop.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-base-100 flex items-center justify-center"><Globe size={14} className="text-base-content/40" /></div>
                    <span className="text-sm text-base-content/70 truncate">{shop.website}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-base-200/60 p-5 animate-in-delay-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Shield size={16} style={{ color: '#c8102e' }} /><span className="text-xs text-base-content/60">Digitaal deelnamebewijs</span></div>
                <div className="flex items-center gap-3"><MessageSquare size={16} style={{ color: '#d4a028' }} /><span className="text-xs text-base-content/60">Automatisch SMS-resultaat</span></div>
                <div className="flex items-center gap-3"><Clock size={16} style={{ color: '#1a5276' }} /><span className="text-xs text-base-content/60">Inschrijven duurt 10 sec</span></div>
              </div>
            </div>

            {!hasActivePot && (
              <div className="rounded-2xl p-5 border-2 border-dashed animate-in-delay-2"
                   style={{ borderColor: '#c8102e33', background: 'linear-gradient(135deg, #fff5f5, #fffdf5)' }}>
                <div className="text-2xl mb-3">🏪</div>
                <h3 className="font-bold text-base-content text-sm mb-2">Is dit jouw winkel?</h3>
                <p className="text-xs text-base-content/50 mb-4 leading-relaxed">Claim je pagina gratis en begin met het digitaal beheren van speelpotten.</p>
                <button onClick={() => onNavigate('winkeliers')} className="btn btn-sm btn-lotto rounded-lg w-full">Claim deze pagina →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailPage;
