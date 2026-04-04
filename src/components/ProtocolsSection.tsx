'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const protocols = [
  { name: 'Aave', logo: '/Aave-Logo-purple.svg', width: 140, height: 140, mobileWidth: 70, mobileHeight: 70, href: 'https://aave.com', color: '#9391F7' },
  { name: 'Compound', logo: '/Compound-Logo.svg', width: 140, height: 140, mobileWidth: 70, mobileHeight: 70, href: 'https://compound.finance', color: '#00D395' },
  { name: 'Morpho', logo: '/Morpho-logo-horizontal-lightmode.svg', width: 180, height: 60, mobileWidth: 90, mobileHeight: 30, href: 'https://morpho.org', color: '#2470FF' },
  { name: 'Lido', logo: '/lido-logo.svg', width: 160, height: 60, mobileWidth: 80, mobileHeight: 30, href: 'https://lido.fi', color: '#f89c90' },
  { name: 'Yo', logo: '/yo_wordmark_black.svg', width: 128, height: 48, mobileWidth: 64, mobileHeight: 24, href: 'https://yo.xyz', color: '#D6FF34' },
];

export function ProtocolsSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div

        style={{
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(40px, 6vh, 72px)',
        }}
      >
      {/* Title */}
      <h2
        className="text-[28px] sm:text-[36px] md:text-[48px]"
        style={{ fontWeight: 500, color: '#0A0B0D', lineHeight: 1.1, maxWidth: '520px' }}
      >
        {t('protocolsSection.title')}
      </h2>

      {/* Cards row / column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: '16px',
          width: '100%',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
        }}
      >
        {protocols.map((protocol, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <a
              key={protocol.name}
              href={protocol.href}
              target="_blank"
              rel="noopener noreferrer"
              className="protocol-card"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: isHovered ? protocol.color : undefined,
                transition: 'background 0.3s ease',
              }}
            >
              <Image
                src={protocol.logo}
                alt={protocol.name}
                width={isMobile ? protocol.mobileWidth : protocol.width}
                height={isMobile ? protocol.mobileHeight : protocol.height}
                style={{ filter: 'brightness(0)', display: 'block', objectFit: 'contain', height: 'auto' }}
              />
            </a>
          );
        })}
      </div>
      </div>
    </div>
  );
}
