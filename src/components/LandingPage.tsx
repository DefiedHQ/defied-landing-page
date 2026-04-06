'use client';

import { useEffect } from 'react';
import { m } from 'framer-motion';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { HeroSquare } from '@coinbase/cds-web/illustrations/HeroSquare';
import { Lottie } from '@coinbase/cds-web/animation/Lottie';
import { dappWallet } from '@coinbase/cds-lottie-files/dappWallet';

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slideInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
};
import { AboutCarousel } from '@/components/AboutCarousel';
import { ProtocolsSection } from '@/components/ProtocolsSection';
import { InfoSection } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';

export function LandingPage() {
  const { t } = useLanguage();
  useDocumentMeta('meta.homeTitle', 'meta.homeDescription');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        const container = document.querySelector('.landing-scroll-container');
        if (el && container) {
          const elRect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const offset = elRect.top - containerRect.top + container.scrollTop;
          container.scrollTo({ top: offset, behavior: 'smooth' });
        }
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
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Text font="display1" as="h1" className="title-tight-lh" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 500, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('hero.title')}
            </Text>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            style={{ marginTop: 'clamp(32px, 5vw, 64px)', marginBottom: 'clamp(32px, 5vw, 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
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
              href="https://app.defied.money"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              block
              className="btn-fw-500"
              style={{
                borderRadius: '56px',
                height: '58px',
                padding: '16px 32px',
                minWidth: '200px',
              }}
            >
              <AnimatedButtonText>{t('hero.cta')}</AnimatedButtonText>
            </Button>
          </Box>
          </m.div>

          {/* Our Mission */}
          <article
            className="promo-card-layout"
            style={{
              width: 'calc(100% + 32px)',
              maxWidth: 'calc(100vw - 32px)',
              background: '#0052FF',
              borderRadius: '56px',
              padding: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
            }}
          >
            <m.div {...slideInLeft} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Lottie source={dappWallet} autoplay loop width="300px" height="300px" />
            </m.div>
            <m.div {...slideInRight} style={{ flex: 1 }}>
              <div className="cta-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500, color: '#fff' }}>
                  {t('imageSection.title')}
                </Text>
                <Text font="body" as="p" style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {t('imageSection.heading')}
                </Text>
              </div>
            </m.div>
          </article>
        </VStack>
      </section>

      {/* Section: Features (Какво прави) */}
      <section id="what-it-does" className="section-padding" style={{ paddingTop: 'clamp(100px, 12vw, 160px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Text font="display2" as="h2" className="section-title" display="block" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, marginBottom: '56px' }}>
            {t('features.sectionTitle')}
          </Text>
          <m.div
            {...slideInUp}
            style={{
              width: 'calc(100% + 32px)',
              maxWidth: 'calc(100vw - 32px)',
              margin: '0 auto',
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
              ].map((feature, i) => (
                <div key={feature.name} className="hero-feature-item">
                  <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <div style={{ width: 160, height: 160, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HeroSquare name={feature.name} scaleMultiplier={1.1} />
                    </div>
                    <Text font="headline" as="h3" style={{ fontWeight: 600, marginTop: '16px', color: '#FFFFFF' }}>{feature.title}</Text>
                    <Text font="body" as="p" title={feature.desc} style={{ maxWidth: '240px', marginTop: '8px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{feature.desc}</Text>
                  </m.div>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 2: About Grid */}
      <section
        id="how-it-works"
        className="section-padding section-vertical-padding"
      >
        <Box as="div" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <AboutCarousel />
        </Box>
      </section>

      {/* Section 3: Advantages */}
      <section id="advantages" className="section-padding" style={{ paddingBottom: 'clamp(48px, 8vw, 100px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Text font="display2" as="h2" className="section-title" display="block" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, marginBottom: '56px' }}>
            {t('advantages.title')}
          </Text>
          <m.div {...slideInLeft}>
            <article
              className="promo-card-layout"
              style={{
                background: 'rgb(247, 248, 249)',
                borderRadius: '56px',
                padding: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <HeroSquare name="usdAndUsdc" scaleMultiplier={1.8} />
              </div>
              <div className="cta-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500 }}>
                  {t('advantages.row1Heading')}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px' }}>
                  {t('advantages.row1Subtext')}
                </Text>
              </div>
            </article>
          </m.div>
          <m.div {...slideInRight} style={{ marginTop: '24px' }}>
            <article
              className="promo-card-layout"
              style={{
                background: '#0052FF',
                borderRadius: '56px',
                padding: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
            >
              <div className="cta-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
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
            </article>
          </m.div>
          <m.div {...slideInLeft} style={{ marginTop: '24px' }}>
            <article
              className="promo-card-layout"
              style={{
                background: 'rgb(247, 248, 249)',
                borderRadius: '56px',
                padding: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <HeroSquare name="exploreDecentralizedApps" scaleMultiplier={1.8} />
              </div>
              <div className="cta-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500 }}>
                  {t('advantages.row3Heading')}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px' }}>
                  {t('advantages.row3Subtext')}
                </Text>
              </div>
            </article>
          </m.div>
        </div>
      </section>

      {/* Section: CTA */}
      <section className="section-padding section-vertical-padding">
        <div
          className="promo-card-layout"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <m.div {...slideInLeft} style={{ flex: 1 }}>
            <div className="cta-text-column" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Text font="display1" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500 }}>
                {t('hero.ctaMain')}
              </Text>
              <Text font="body" as="p" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px' }}>
                {t('hero.subtitle1')} {t('hero.subtitle2')} {t('hero.subtitle3')}
              </Text>
              <div style={{ marginTop: '16px' }}>
                <Button
                  as="a"
                  href="https://app.defied.money"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="btn-fw-500"
                  style={{
                    borderRadius: '56px',
                    height: '58px',
                    padding: '16px 32px',
                    minWidth: '200px',
                  }}
                >
                  <AnimatedButtonText>{t('hero.cta')}</AnimatedButtonText>
                </Button>
              </div>
            </div>
          </m.div>
          <m.div {...slideInRight} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <HeroSquare name="cryptoPortfolioUsdc" scaleMultiplier={1.8} />
          </m.div>
        </div>
      </section>

      {/* Section 4: Protocols */}
      <section className="section-padding section-vertical-padding">
        <ProtocolsSection />
      </section>

      {/* Section 5: FAQ */}
      <section
        id="faq"
        className="section-padding section-vertical-padding"
      >
        <InfoSection />
      </section>

      {/* Section 7: Footer */}
      <Footer />
    </div>
  );
}
