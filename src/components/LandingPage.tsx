'use client';

import { useEffect } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { HeroSquare } from '@coinbase/cds-web/illustrations/HeroSquare';
import { AboutCarousel } from '@/components/AboutCarousel';
import { ProtocolsSection } from '@/components/ProtocolsSection';
import { InfoSection } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export function LandingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div
      className="landing-scroll-container"
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'scroll',
        background: '#FFFFFF',
      }}
    >
      {/* Section 1: Hero */}
      <section className="px-4 sm:px-6">
        <VStack
          as="div"
          style={{
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            textAlign: 'center',
            paddingTop: 'clamp(64px, 10vw, 128px)',
          }}
        >
          <Text font="display1" as="h1" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 500, letterSpacing: '-0.02em', maxWidth: '900px' }}>
            {t('hero.title')}
          </Text>
          <Text
            font="body"
            as="p"
            color="fgMuted"
            style={{ marginTop: '24px', maxWidth: '640px', fontSize: '18px', lineHeight: '28px' }}
          >
            {t('hero.subtitle1')} {t('hero.subtitle2')} {t('hero.subtitle3')}
          </Text>
          <Box as="div" style={{ marginTop: '32px' }}>
            <Button
              as="a"
              href="https://app.defied.bg"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              block
              style={{
                borderRadius: '56px',
                height: '58px',
                padding: '16px 32px',
                minWidth: '200px',
              }}
            >
              {t('hero.cta')}
            </Button>
          </Box>

          {/* Hero image */}
          <Box as="div" style={{ maxWidth: '745px', width: '100%', marginTop: '48px' }}>
            <img
              src="/hero_app_white.png"
              alt="DeFied App"
              width={745}
              height={745}
              style={{
                width: '100%',
                maxWidth: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '56px',
                objectFit: 'cover',
              }}
            />
          </Box>
        </VStack>
      </section>

      {/* Section 2: About Grid */}
      <section
        id="how-it-works"
        className="px-4 sm:px-6"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <Box as="div" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <AboutCarousel />
        </Box>
      </section>

      {/* Section 3: Protocols */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <ProtocolsSection />
      </section>

      {/* Section 4: Blue promo with HeroSquare */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <Box
          as="div"
          style={{
            background: '#0052FF',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '56px',
            overflow: 'hidden',
          }}
        >
          <Box
            as="div"
            className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '400px',
              gap: '32px',
            }}
          >
            <Text font="display1" as="h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 500, color: '#fff', maxWidth: '800px' }}>
              {t('imageSection.heading')}
            </Text>
            <Box as="div" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <HeroSquare name="stakingMissedReturns" />
              <HeroSquare name="earnGrowth" />
            </Box>
          </Box>
        </Box>
      </section>

      {/* Section 5: FAQ */}
      <section
        id="faq"
        className="px-4 sm:px-6"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <InfoSection />
      </section>

      {/* Section 6: CTA */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <VStack
          as="div"
          style={{
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            gap: '16px',
          }}
        >
          <Text font="display1" as="h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500 }}>
            {t('hero.ctaMain')}
          </Text>
          <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '16px' }}>
            {t('hero.subtitle1')} {t('hero.subtitle2')} {t('hero.subtitle3')}
          </Text>
          <Button
            as="a"
            href="https://app.defied.bg"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            style={{
              borderRadius: '56px',
              height: '58px',
              padding: '16px 32px',
              minWidth: '200px',
            }}
          >
            {t('hero.cta')}
          </Button>
        </VStack>
      </section>

      {/* Section 7: Footer */}
      <Footer />
    </div>
  );
}
