'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
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
    <Box as="div" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <VStack
        as="div"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          gap: 'clamp(40px, 6vh, 72px)',
        }}
      >
        <Text font="display2" as="h2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, maxWidth: '520px' }}>
          {t('protocolsSection.title')}
        </Text>

        <Box
          as="div"
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
                  textDecoration: 'none',
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
        </Box>
      </VStack>
    </Box>
  );
}
