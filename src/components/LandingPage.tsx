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
      <section className="section-padding">
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
          <Text font="display1" as="h1" className="title-tight-lh" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 500, letterSpacing: '-0.02em', textAlign: 'center' }}>
            {t('hero.title')}
          </Text>
          <div style={{ marginTop: 'clamp(32px, 5vw, 64px)', marginBottom: 'clamp(32px, 5vw, 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text
              font="body"
              as="p"
              color="fgMuted"
              style={{ maxWidth: '640px', fontSize: '18px', lineHeight: '28px', textAlign: 'center' }}
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
          </div>

          {/* Feature cards grid */}
          <Box
            as="div"
            style={{
              width: 'calc(100% + 32px)',
              maxWidth: 'calc(100vw - 32px)',
              background: '#0052FF',
              borderRadius: '56px',
              padding: 'clamp(56px, 8vw, 100px) clamp(24px, 4vw, 80px)',
            }}
          >
            <div className="hero-features-grid-4">
              {[
                { name: 'realToUSDC' as const, title: t('features.f1Title'), desc: t('features.f1Desc') },
                { name: 'usdtToUSDC' as const, title: t('features.f2Title'), desc: t('features.f2Desc') },
                { name: 'earnMore' as const, title: t('features.f4Title'), desc: t('features.f4Desc') },
                { name: 'cardAndPhone' as const, title: t('features.f5Title'), desc: t('features.f5Desc') },
              ].map((feature) => (
                <div key={feature.name} className="hero-feature-item">
                  <HeroSquare name={feature.name} scaleMultiplier={0.8} />
                  <Text font="headline" as="h3" style={{ fontWeight: 600, marginTop: '16px', color: '#FFFFFF' }}>{feature.title}</Text>
                  <Text font="body" as="p" style={{ maxWidth: '240px', marginTop: '8px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{feature.desc}</Text>
                </div>
              ))}
            </div>
          </Box>
        </VStack>
      </section>

      {/* Section 2: About Grid */}
      <section
        id="how-it-works"
        className="section-padding"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <Box as="div" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <AboutCarousel />
        </Box>
      </section>

      {/* Section 3: Advantages */}
      <section className="section-padding" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Text font="display2" as="h2" className="section-title" display="block" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, marginBottom: '56px' }}>
            {t('advantages.title')}
          </Text>
          <div
            className="promo-card-layout"
            style={{
              background: 'rgb(247, 248, 249)',
              borderRadius: '56px',
              padding: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <HeroSquare name="remittances" scaleMultiplier={1.8} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500 }}>
                {t('advantages.row1Heading')}
              </Text>
              <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px' }}>
                {t('advantages.row1Subtext')}
              </Text>
            </div>
          </div>
          <div
            className="promo-card-layout"
            style={{
              background: '#0052FF',
              borderRadius: '56px',
              padding: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
              marginTop: '24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500, color: '#fff' }}>
                {t('advantages.row2Heading')}
              </Text>
              <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {t('advantages.row2Subtext')}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <HeroSquare name="walletSecurity" scaleMultiplier={1.8} />
            </div>
          </div>
          <div
            className="promo-card-layout"
            style={{
              background: 'rgb(247, 248, 249)',
              borderRadius: '56px',
              padding: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
              marginTop: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <HeroSquare name="exploreDecentralizedApps" scaleMultiplier={1.8} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500 }}>
                {t('advantages.row3Heading')}
              </Text>
              <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px' }}>
                {t('advantages.row3Subtext')}
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <ProtocolsSection />
      </section>

      {/* Section 4: Blue promo with HeroSquare */}
      <section className="section-padding" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
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
            className="box-padding promo-card-layout"
            style={{
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <Box as="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeroSquare name="moneyDecentralized" scaleMultiplier={1.8} />
            </Box>
            <Box as="div" style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
              <Text font="display2" as="h2" className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#fff' }}>
                {t('imageSection.heading')}
              </Text>
            </Box>
          </Box>
        </Box>
      </section>

      {/* Section 5: FAQ */}
      <section
        id="faq"
        className="section-padding"
        style={{ paddingTop: '100px', paddingBottom: '100px' }}
      >
        <InfoSection />
      </section>

      {/* Section 6: CTA */}
      <section className="section-padding" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
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
          <Text font="display1" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, textAlign: 'center' }}>
            {t('hero.ctaMain')}
          </Text>
          <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '16px', textAlign: 'center' }}>
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
