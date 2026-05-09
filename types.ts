export type PageView = 'home' | 'directory' | 'shop' | 'winkeliers' | 'hoe-werkt-het' | 'privacy' | 'verantwoord-spelen';

export interface Shop {
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
  nieuw: boolean;
  geclaimd: boolean;
  beschrijving?: string;
  telefoon?: string;
  email?: string;
  website?: string;
}
