'use client';

import Image from 'next/image';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

const partners = [
  { name: 'Base', logo: '/Base_Logo.svg', width: 100, height: 28 },
  { name: 'Privy', logo: '/privy_stripe.svg', width: 130, height: 28 },
  { name: 'Bridge.xyz', logo: '/bridge_logo.svg', width: 100, height: 28 },
  { name: 'Gnosis Pay', logo: '/gnosis_pay_logo.svg', width: 110, height: 28 },
  { name: 'LI.FI', logo: '/lifi_logo.svg', width: 70, height: 28 },
];

export function InfrastructureSection() {
  const { t } = useLanguage();

  return (
    <Box as="div" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
      <VStack
        as="div"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          alignItems: 'center',
          gap: 'clamp(40px, 6vh, 56px)',
        }}
      >
        <div style={{ maxWidth: '720px', textAlign: 'center' }}>
          <Text font="label1" as="p" color="fgMuted" display="block" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '0.01em', textAlign: 'center', marginBottom: '8px' }}>
            {t('infrastructure.title')}
          </Text>
          <Text font="body" as="p" color="fgMuted" style={{ fontSize: '15px', lineHeight: '22px', textAlign: 'center' }}>
            {t('infrastructure.subtitle')}
          </Text>
        </div>

        <div className="logo-carousel-wrapper">
          <div className="logo-carousel-track">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="logo-carousel-item">
                <Image
                  className="partner-logo"
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  style={{ objectFit: 'contain', filter: 'grayscale(100%) brightness(0)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </VStack>
    </Box>
  );
}
