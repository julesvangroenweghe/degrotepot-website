import React, { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  slot: string;           // Data-ad-slot ID van Google
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'fluid';
  className?: string;
}

// Publisher ID — vervang door jouw echte ID na AdSense-goedkeuring
// Formaat: ca-pub-XXXXXXXXXXXXXXXX
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX';
const ADSENSE_APPROVED = false; // Zet op true na Google-goedkeuring

const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slot,
  format = 'auto',
  className = '',
}) => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ADSENSE_APPROVED) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  // Placeholder: toont NIETS in productie zolang ADSENSE_APPROVED = false
  // Zodat de site er clean uitziet tijdens aanvraagperiode
  if (!ADSENSE_APPROVED) return null;

  return (
    <div className={`adsense-slot overflow-hidden ${className}`}>
      <ins
        ref={adRef as React.RefObject<HTMLModElement>}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseSlot;
