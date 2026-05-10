export interface Deelnemer {
  id: string;
  naam: string;
  gsm: string;
  aantalDeelnames: number;
  betaald: boolean;
  datum: string;
  smsStatus: 'verstuurd' | 'wachten' | 'geen';
}

export interface Speelpot {
  id: string;
  naam: string;
  spel: 'EuroMillions' | 'Lotto';
  jackpot: string;
  prijsPerDeelname: number;
  trekking: string;
  status: 'open' | 'gesloten' | 'getrokken';
  deelnemers: Deelnemer[];
  winnendBedrag?: number;
  aangemaakt: string;
}

export interface Winkel {
  naam: string;
  adres: string;
  logo: string;
  slug: string;
  kleur: string;
}

export type AppView = 'landing' | 'shop' | 'kassa' | 'dashboard' | 'resultaten';
export type KassaMode = 'invoer' | 'bevestiging';

export interface WinkelKaart {
  slug: string;
  naam: string;
  stad: string;
  adres: string;
  emoji: string;
  aantalActievePotten: number;
  totaalDeelnemers: number;
  volgendeTrekking: string;
  spel: 'EuroMillions' | 'Lotto' | 'Beide';
  jackpot: string;
  nieuw?: boolean;
}
