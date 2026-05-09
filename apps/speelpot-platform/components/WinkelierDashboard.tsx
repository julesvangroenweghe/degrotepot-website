import React, { useState } from 'react';
import { Users, TrendingUp, Trophy, Clock, CheckCircle2, XCircle, Plus, ChevronDown, ChevronUp, Ticket, Store } from 'lucide-react';
import { Speelpot } from '../types';
import { winkel } from '../utils/mockData';
import NieuwePotModal from './NieuwePotModal';

interface WinkelierDashboardProps {
  speelpotten: Speelpot[];
  onNieuwePot?: (pot: Speelpot) => void;
}

export const WinkelierDashboard: React.FC<WinkelierDashboardProps> = ({ speelpotten, onNieuwePot }) => {
  const [uitgevouwen, setUitgevouwen] = useState<string | null>(speelpotten[0]?.id || null);
  const [showNieuwePot, setShowNieuwePot] = useState(false);

  const openPotten = speelpotten.filter(p => p.status === 'open');
  const geslotenPotten = speelpotten.filter(p => p.status === 'getrokken');

  const totaalDeelnemers = openPotten.reduce((sum, p) => sum + p.deelnemers.length, 0);
  const totaalOmzet = openPotten.reduce((sum, p) =>
    sum + p.deelnemers.reduce((s, d) => s + d.aantalDeelnames * p.prijsPerDeelname, 0), 0);
  const totaalWinst = geslotenPotten.reduce((sum, p) => sum + (p.winnendBedrag || 0), 0);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Winkel header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <Store size={20} className="text-red-600" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">{winkel.naam}</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
          <Users size={18} className="mx-auto text-red-500 mb-1" />
          <p className="text-2xl font-bold text-gray-900">{totaalDeelnemers}</p>
          <p className="text-xs text-gray-500">Deelnemers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
          <TrendingUp size={18} className="mx-auto text-blue-500 mb-1" />
          <p className="text-2xl font-bold text-gray-900">€{totaalOmzet}</p>
          <p className="text-xs text-gray-500">Inningen</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
          <Trophy size={18} className="mx-auto text-amber-500 mb-1" />
          <p className="text-2xl font-bold text-gray-900">€{totaalWinst}</p>
          <p className="text-xs text-gray-500">Gewonnen</p>
        </div>
      </div>

      {/* Actieve speelpotten */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Actieve speelpotten</h2>
          <button
            onClick={() => setShowNieuwePot(true)}
            className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-red-700 transition"
          >
            <Plus size={13} /> Nieuwe pot
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {openPotten.map(pot => {
            const isOpen = uitgevouwen === pot.id;
            const inningen = pot.deelnemers.reduce((s, d) => s + d.aantalDeelnames * pot.prijsPerDeelname, 0);
            const betaald = pot.deelnemers.filter(d => d.betaald).length;

            return (
              <div key={pot.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full p-4 text-left"
                  onClick={() => setUitgevouwen(isOpen ? null : pot.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Ticket size={13} className="text-red-500" />
                        <span className="font-bold text-sm text-gray-900">{pot.naam}</span>
                        <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{pot.spel}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{pot.trekking}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-xs text-gray-500">{pot.deelnemers.length} deelnemers</span>
                        <span className="text-xs font-semibold text-red-600">€{inningen} inningen</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs text-amber-600 font-bold">{pot.jackpot}</p>
                        <p className="text-xs text-gray-400">{betaald}/{pot.deelnemers.length} betaald</p>
                      </div>
                      {isOpen
                        ? <ChevronUp size={16} className="text-gray-400" />
                        : <ChevronDown size={16} className="text-gray-400" />
                      }
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-gray-100 mb-3" />
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                            <th className="text-left pb-2">Naam</th>
                            <th className="text-left pb-2 hidden sm:table-cell">GSM</th>
                            <th className="text-center pb-2">Deel.</th>
                            <th className="text-center pb-2">Betaald</th>
                            <th className="text-center pb-2">SMS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {pot.deelnemers.map(d => (
                            <tr key={d.id}>
                              <td className="font-medium text-gray-900 py-2">{d.naam}</td>
                              <td className="text-gray-400 py-2 hidden sm:table-cell">{d.gsm}</td>
                              <td className="text-center py-2">
                                <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-lg">{d.aantalDeelnames}x</span>
                              </td>
                              <td className="text-center py-2">
                                {d.betaald
                                  ? <CheckCircle2 size={15} className="text-green-500 mx-auto" />
                                  : <XCircle size={15} className="text-red-400 mx-auto" />}
                              </td>
                              <td className="text-center py-2">
                                {d.smsStatus === 'verstuurd'
                                  ? <CheckCircle2 size={15} className="text-green-500 mx-auto" />
                                  : <Clock size={13} className="text-amber-500 mx-auto" />}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Geschiedenis */}
      {geslotenPotten.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-2">Geschiedenis</h2>
          <div className="flex flex-col gap-2">
            {geslotenPotten.map(pot => (
              <div key={pot.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{pot.naam}</p>
                  <p className="text-xs text-gray-400">{pot.trekking} · {pot.deelnemers.length} deelnemers</p>
                </div>
                {pot.winnendBedrag ? (
                  <div className="text-right">
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-lg">Gewonnen!</span>
                    <p className="text-xs font-bold text-green-600 mt-1">€{pot.winnendBedrag}</p>
                  </div>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-1 rounded-lg">Niet gewonnen</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showNieuwePot && (
        <NieuwePotModal
          onClose={() => setShowNieuwePot(false)}
          onAanmaken={(pot) => {
            if (onNieuwePot) onNieuwePot(pot);
            setShowNieuwePot(false);
          }}
        />
      )}
    </div>
  );
};
