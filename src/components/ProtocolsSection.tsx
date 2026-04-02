'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const protocols = [
  { name: 'Aave', logo: '/Aave-Logo-purple.svg', width: 140, height: 140, mobileWidth: 70, mobileHeight: 70, href: 'https://aave.com', color: '#9391F7' },
  { name: 'Compound', logo: '/Compound-Logo.svg', width: 140, height: 140, mobileWidth: 70, mobileHeight: 70, href: 'https://compound.finance', color: '#00D395' },
  { name: 'Morpho', logo: '/Morpho-logo-horizontal-lightmode.svg', width: 180, height: 60, mobileWidth: 90, mobileHeight: 30, href: 'https://morpho.org', color: '#2470FF' },
  { name: 'Lido', logo: '/lido-logo.svg', width: 160, height: 60, mobileWidth: 80, mobileHeight: 30, href: 'https://lido.fi', color: '#f89c90' },
];

const cardPositions = [
  { top: '10%', left: '8%', transform: 'rotate(-3deg)' },
  { top: '12%', right: '10%', transform: 'rotate(2deg)' },
  { bottom: '10%', left: '50%', transform: 'translateX(-50%) rotate(1deg)' },
  { bottom: '12%', right: '8%', transform: 'rotate(-2deg)' },
] as const;

const mobileCardPositions = [
  { top: '5%', left: '5%', transform: 'rotate(-3deg)' },
  { top: '5%', right: '5%', transform: 'rotate(2deg)' },
  { bottom: '8%', left: '50%', transform: 'translateX(-50%) rotate(1deg)' },
  { bottom: '8%', right: '5%', transform: 'rotate(-2deg)' },
] as const;

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

  const bgColor = hoveredIndex !== null ? protocols[hoveredIndex].color : '#fff';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgColor,
        transition: 'background 0.4s ease',
      }}
    >
      {/* Center title */}
      <h2
        className="text-[28px] sm:text-[36px] md:text-[48px]"
        style={{
          fontWeight: 700,
          color: '#000',
          lineHeight: 1.1,
          textAlign: 'center',
          maxWidth: '600px',
          padding: '0 1rem',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {t('protocolsSection.title')}
      </h2>

      {/* Floating protocol cards */}
      {protocols.map((protocol, i) => {
        const isHovered = hoveredIndex === i;
        const someoneHovered = hoveredIndex !== null;
        // When hovered: white card. When another card is hovered: tinted card. Default: light gray.
        const cardBg = isHovered
          ? '#fff'
          : someoneHovered
            ? `color-mix(in srgb, ${protocols[hoveredIndex!].color} 70%, white 30%)`
            : undefined;

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
              position: 'absolute',
              ...(isMobile ? mobileCardPositions[i] : cardPositions[i]),
              background: cardBg,
              transition: 'background 0.4s ease',
            }}
          >
            <Image
              src={protocol.logo}
              alt={protocol.name}
              width={isMobile ? protocol.mobileWidth : protocol.width}
              height={isMobile ? protocol.mobileHeight : protocol.height}
              style={{ filter: 'brightness(0)', display: 'block', objectFit: 'contain' }}
            />
          </a>
        );
      })}
    </div>
  );
}
