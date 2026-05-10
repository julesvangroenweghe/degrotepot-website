import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, ArrowLeft, Star, Users, QrCode, MessageSquare, Clock, ChevronRight, Shield, Ticket, Zap } from 'lucide-react';
import { PageView } from '../types';
import { shops } from '../utils/shops';
import AdSenseSlot from './AdSenseSlot';

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
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <MapPin size={28} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>Winkel niet gevonden</h2>
        <button
          onClick={() => onNavigate('directory')}
          className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl mt-4 hover:opacity-90 transition"
          style={{ background: '#c8102e' }}
        >
          <ArrowLeft size={15} /> Terug naar overzicht
        </button>
      </div>
    );
  }

  const hasActivePot = shop.aantalActievePotten > 0;

  const trekkingen = [
    { game: 'Lotto', date: 'Zaterdag 10 mei', price: '€2,50', color: '#c8102e' },
    { game: 'EuroMillions', date: 'Dinsdag 13 mei', price: '€5,00', color: '#d4a028' },
    { game: 'Lotto', date: 'Woensdag 14 mei', price: '€2,50', color: '#c8102e' },
    { game: 'EuroMillions', date: 'Vrijdag 16 mei', price: '€5,00', color: '#d4a028' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Header — light */}
      <section className="bg-white border-b border-gray-100 py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => onNavigate('directory')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-6 transition"
          >
            <ArrowLeft size={15} /> Terug naar alle winkels
          </button>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                 style={{ background: hasActivePot ? '#c8102e' : '#9ca3af' }}>
              <MapPin size={22} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                {shop.naam}
              </h1>
              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <MapPin size={13} /> <span className="text-sm">{shop.adres}</span>
              </div>
              {hasActivePot && (
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Speelpot actief
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Upcoming draws */}
            {hasActivePot && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-gray-50">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Star size={17} fill="#d4a028" className="text-yellow-500" /> Komende trekkingen
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">Ga naar de winkel om mee te doen</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {trekkingen.map((t, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                             style={{ background: `${t.color}12` }}>
                          <Ticket size={16} style={{ color: t.color }} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{t.game}</div>
                          <div className="text-xs text-gray-400">{t.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm" style={{ color: t.color }}>{t.price}</span>
                        <ChevronRight size={15} className="text-gray-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How to participate */}
            {hasActivePot && (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <QrCode size={17} style={{ color: '#c8102e' }} /> Hoe doe je mee?
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
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5"
                           style={{ background: '#c8102e' }}>
                        {i + 1}
                      </div>
                      <span className="text-sm text-gray-600">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QR demo */}
            {hasActivePot && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
                <button
                  onClick={() => setShowQrDemo(!showQrDemo)}
                  className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition shadow-md"
                  style={{ background: '#c8102e' }}
                >
                  <QrCode size={17} /> {showQrDemo ? 'Verberg demo' : 'Bekijk demo QR-scan'}
                </button>
                {showQrDemo && (
                  <div className="mt-6">
                    <div className="inline-block bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="w-64 mx-auto">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                          <div className="p-3 text-center" style={{ background: '#c8102e' }}>
                            <span className="text-white text-xs font-bold">degrotepot.be</span>
                          </div>
                          <div className="p-4">
                            <p className="text-sm font-bold text-gray-900 mb-1">{shop.naam}</p>
                            <p className="text-xs text-gray-400 mb-3">Kies je trekking:</p>
                            {trekkingen.slice(0, 2).map((t, i) => (
                              <div key={i} className={`p-2 rounded-lg mb-2 border text-left text-xs ${i === 0 ? 'border-red-200 bg-red-50' : 'border-gray-100'}`}>
                                <Ticket size={11} className="inline mr-1" style={{ color: t.color }} />
                                <span className="font-semibold text-gray-900">{t.game}</span>
                                <span className="text-gray-400 ml-1">{t.date}</span>
                              </div>
                            ))}
                            <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs text-center">
                              <span className="text-gray-400">GSM: </span>
                              <span className="font-mono font-bold text-gray-700">0476 •• •• ••</span>
                            </div>
                            <div className="mt-2 flex items-start gap-1.5 px-1">
                              <div className="w-3 h-3 rounded border border-gray-300 bg-white flex-shrink-0 mt-0.5 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-sm" style={{ background: '#c8102e' }}></div>
                              </div>
                              <span className="text-xs text-gray-400 leading-tight">
                                Ik ga akkoord dat mijn GSM-nummer wordt gebruikt voor deelname-bevestiging en resultaat via SMS.
                              </span>
                            </div>
                            <div className="mt-3 text-center">
                              <div className="inline-block px-4 py-2 rounded-lg text-white text-xs font-bold" style={{ background: '#c8102e' }}>
                                Bevestig →
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">Dit is een voorbeeld van wat je ziet na het scannen van de QR-code</p>
                  </div>
                )}
              </div>
            )}

            {/* About the shop */}
            {shop.beschrijving && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Over deze winkel</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{shop.beschrijving}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 mb-4">Contactgegevens</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <MapPin size={13} className="text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-600">{shop.adres}</span>
                </div>
                {shop.telefoon && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Phone size={13} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-600">{shop.telefoon}</span>
                  </div>
                )}
                {shop.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Mail size={13} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-600">{shop.email}</span>
                  </div>
                )}
                {shop.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Globe size={13} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-600 truncate">{shop.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield size={15} style={{ color: '#c8102e' }} />
                  <span className="text-xs text-gray-600">Digitaal deelnamebewijs</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare size={15} style={{ color: '#d4a028' }} />
                  <span className="text-xs text-gray-600">Automatisch SMS-resultaat</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={15} style={{ color: '#1a5276' }} />
                  <span className="text-xs text-gray-600">Inschrijven duurt 10 seconden</span>
                </div>
              </div>
            </div>

            {/* Claim card (inactive shop) */}
            {!hasActivePot && (
              <div className="rounded-2xl p-5 border-2 border-dashed border-red-100 bg-red-50">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm" style={{ background: '#c8102e' }}>
                  <MapPin size={16} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">Is dit jouw winkel?</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Claim je pagina gratis en begin met het digitaal beheren van speelpotten.
                </p>
                <button
                  onClick={() => onNavigate('winkeliers')}
                  className="inline-flex items-center gap-1.5 text-white font-bold text-sm px-4 py-2 rounded-xl w-full justify-center hover:opacity-90 transition shadow-sm"
                  style={{ background: '#c8102e' }}
                >
                  Claim deze pagina <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* AdSense — onderaan pagina, breed formaat */}
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <AdSenseSlot slot="0987654321" format="auto" className="mt-2" />
    </div>
  );
};

export default ShopDetailPage;
