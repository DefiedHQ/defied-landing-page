'use client';

import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { HeroSquare } from '@coinbase/cds-web/illustrations/HeroSquare';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Box as="div" style={{ width: '100%', background: '#FFFFFF', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{ minHeight: '100vh' }}>
        <VStack as="div" style={{ maxWidth: '1200px', margin: '0 auto', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
          <Text font="display1" as="h1" style={{ letterSpacing: '-0.02em' }}>
            {t('about.heroTitle')}
          </Text>
          <HStack as="div" className="flex-col md:flex-row" style={{ gap: '16px' }}>
            <Button
              as="a"
              href="https://app.defied.bg"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              style={{ borderRadius: '56px', height: '58px', padding: '16px 32px', minWidth: '160px' }}
            >
              {t('about.ctaStart')}
            </Button>
            <Button
              as="a"
              href="mailto:hello@defied.bg"
              variant="secondary"
              style={{ borderRadius: '56px', height: '58px', padding: '16px 32px', minWidth: '160px' }}
            >
              {t('about.ctaContact')}
            </Button>
          </HStack>
          {/* Illustration */}
          <HStack as="div" style={{ gap: '16px', marginTop: '16px' }}>
            <HeroSquare name="platform" />
            <HeroSquare name="decentralization" />
          </HStack>
        </VStack>
      </section>

      {/* Dark mission section */}
      <Box as="div" className="px-4 sm:px-6" style={{ display: 'flex', justifyContent: 'center' }}>
        <Box as="div" style={{ background: '#0A0B0D', width: '100%', maxWidth: '1200px', borderRadius: '56px' }}>
          <Box as="div" className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Text font="display3" as="h2" style={{ color: '#fff', maxWidth: '800px' }}>
              {t('about.missionDark')}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Logo + identity section */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <img src="/defied_squared_logo_blue.svg" width={80} height={80} alt="Defied" style={{ marginBottom: '32px' }} />
        <Text font="display3" as="h2" style={{ maxWidth: '800px' }}>
          {t('about.missionLight')}
        </Text>
      </section>

      {/* Blue company section */}
      <Box as="div" className="px-4 sm:px-6" style={{ display: 'flex', justifyContent: 'center' }}>
        <Box as="div" style={{ background: '#0052FF', width: '100%', maxWidth: '1200px', borderRadius: '56px' }}>
          <Box as="div" className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
            <Text font="display3" as="h2" style={{ color: '#fff', maxWidth: '800px' }}>
              {t('about.blueSection')}
            </Text>
            <HeroSquare name="earnGlobe" />
          </Box>
        </Box>
      </Box>

      {/* Details section */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <VStack as="div" style={{ maxWidth: '800px', margin: '0 auto', gap: '24px' }}>
          <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px' }}>{t('about.detailP1')}</Text>
          <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px' }}>{t('about.detailP2')}</Text>
          <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px' }}>{t('about.detailP3')}</Text>
        </VStack>
      </section>

      {/* Advantages section */}
      <Box as="div" className="px-4 sm:px-6" style={{ display: 'flex', justifyContent: 'center' }}>
        <Box as="div" style={{ background: '#0A0B0D', width: '100%', maxWidth: '1200px', borderRadius: '56px' }}>
          <Box as="div" className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Text font="display3" as="h2" style={{ color: '#fff', maxWidth: '800px' }}>
              {t('about.advantagesHeading')}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Advantages details */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <VStack as="div" style={{ maxWidth: '800px', margin: '0 auto', gap: '24px' }}>
          <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px' }}>{t('about.advantagesP1')}</Text>
          <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px' }}>{t('about.advantagesP2')}</Text>
          <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px' }}>{t('about.advantagesP3')}</Text>
        </VStack>
      </section>
    </Box>
  );
}
