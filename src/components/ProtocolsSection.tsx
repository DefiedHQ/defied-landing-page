'use client';

import { useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

const protocols = [
  { name: 'Aave', logo: '/Aave-Logo-purple.svg', width: 140, height: 140, color: '#9391F7' },
  { name: 'Compound', logo: '/Compound-Logo.svg', width: 140, height: 140, color: '#00D395' },
  { name: 'Morpho', logo: '/Morpho-logo-horizontal-lightmode.svg', width: 180, height: 60, color: '#2470FF' },
  { name: 'Lido', logo: '/lido-logo.svg', width: 160, height: 60, color: '#f89c90' },
  { name: 'Yo', logo: '/yo_wordmark_black.svg', width: 128, height: 48, color: '#D6FF34' },
];

export function ProtocolsSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        <div className="section-title" style={{ maxWidth: '600px' }}>
          <Text font="display2" as="h2" display="block" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, marginBottom: '16px' }}>
            {t('protocolsSection.title')}
          </Text>
          <Text font="body" as="p" color="fgMuted" style={{ fontSize: '16px', lineHeight: '24px' }}>
            {t('protocolsSection.subtitle')}
          </Text>
        </div>

        <Box
          as="div"
          className="protocol-grid"
        >
          {protocols.map((protocol, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <m.div
                key={protocol.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div
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
                    width={protocol.width}
                    height={protocol.height}
                    className="protocol-logo"
                    style={{ filter: 'brightness(0)', display: 'block', objectFit: 'contain', height: 'auto' }}
                  />
                </div>
              </m.div>
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
}
