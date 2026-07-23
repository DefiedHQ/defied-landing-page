'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Box } from '@coinbase/cds-web/layout/Box';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { HeroSquare } from '@coinbase/cds-web/illustrations/HeroSquare';
import { LocalPictogram } from './LocalPictogram';
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
import { InfrastructureSection } from '@/components/InfrastructureSection';
import { InfoSection } from '@/components/Hero';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';

export function LandingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
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
        background: '#FFFFFF',
      }}
    >
      {/* Section 1: Hero — full-width photo card carousel */}
      <section className="section-padding" style={{ paddingTop: 'clamp(16px, 2vw, 24px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <HeroCarousel />
          </m.div>
        </div>
      </section>

      {/* Section: Trust strip — Infrastructure Partners */}
      <section className="section-padding" style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: 'clamp(48px, 8vw, 80px)' }}>
        <InfrastructureSection />
      </section>

      {/* Section: Features — Features grid */}
      <section id="features" className="section-padding" style={{ paddingTop: 'clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...slideInUp} style={{ textAlign: 'center' }}>
            <Text font="display2" as="h2" display="block" className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, maxWidth: '720px', marginBottom: '24px' }}>
              {t('features.sectionTitle')}
            </Text>
            <Text font="body" as="p" color="fgMuted" display="block" style={{ fontSize: '18px', lineHeight: '28px', maxWidth: '560px', margin: '0 auto 56px', textAlign: 'center' }}>
              {t('features.sectionSubtitle')}
            </Text>
          </m.div>

          {/* Feature cards grid */}
          <div className="features-grid-2x2">
            {[
              { icon: 'transferSend' as const, title: t('features.f1Title'), desc: t('features.f1Desc') },
              { icon: 'apyInterest' as const, title: t('features.f2Title'), desc: t('features.f2Desc') },
              { icon: 'walletExchange' as const, title: t('features.f3Title'), desc: t('features.f3Desc') },
              { icon: 'creditCard' as const, title: t('features.f5Title'), desc: t('features.f5Desc') },
            ].map((feature, i) => (
              <m.div
                key={feature.icon}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <article className="feature-card">
                  <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <LocalPictogram name={feature.icon} dimension="48x48" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Text font="title3" as="h3" style={{ fontWeight: 600 }}>{feature.title}</Text>
                    <Text font="body" as="p" color="fgMuted" style={{ fontSize: '15px', lineHeight: '24px' }}>{feature.desc}</Text>
                  </div>
                </article>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: How it works — Deep dive into advantages */}
      <section id="how-it-works" className="section-padding" style={{ paddingTop: 'clamp(64px, 10vw, 120px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...slideInUp} style={{ textAlign: 'center' }}>
            <Text font="display2" as="h2" display="block" className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, maxWidth: '720px', marginBottom: '24px' }}>
              {t('advantages.title')}
            </Text>
            <Text font="body" as="p" color="fgMuted" display="block" style={{ fontSize: '18px', lineHeight: '28px', maxWidth: '560px', margin: '0 auto 56px', textAlign: 'center' }}>
              {t('advantages.subtitle')}
            </Text>
          </m.div>

          {/* Advantage cards — mission-style: illustration left, text right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px, 10vw, 100px)' }}>
            {[
              {
                illustration: 'usdAndUsdc' as const,
                heading: t('advantages.row1Heading'),
                text: t('advantages.row1Subtext'),
                reversed: false,
                useCustomImage: true,
                customImageSrc: '/explore-card.jpg',
              },
              {
                illustration: 'walletSecurity' as const,
                heading: t('advantages.row2Heading'),
                text: t('advantages.row2Subtext'),
                reversed: true,
                useCustomImage: true,
                customImageSrc: '/explore-add-money.jpg',
              },
              {
                illustration: 'exploreDecentralizedApps' as const,
                heading: t('advantages.row3Heading'),
                text: t('advantages.row3Subtext'),
                reversed: false,
                useCustomImage: true,
                customImageSrc: '/explore-earn.jpg',
              },
            ].map((card, i) => {
              const textBlock = (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
                    {card.heading}
                  </Text>
                  <Text font="body" as="p" color="fgMuted" style={{ fontSize: '17px', lineHeight: '28px' }}>
                    {card.text}
                  </Text>
                </div>
              );
              const illustrationBlock = (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  {'useCustomImage' in card && card.useCustomImage ? (
                    <div className="advantage-photo">
                      <Image src={'customImageSrc' in card ? (card.customImageSrc as string) : '/defi_section.png'} alt={card.heading} width={600} height={450} loading="lazy" sizes="(max-width: 768px) 100vw, 500px" />
                    </div>
                  ) : (
                    <HeroSquare name={card.illustration} scaleMultiplier={1.2} />
                  )}
                </div>
              );
              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className={`mission-layout${card.reversed ? ' mission-layout--reversed' : ''}`}>
                    {illustrationBlock}
                    {textBlock}
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Mission — The why */}
      <section id="mission" className="section-padding" style={{ paddingTop: 'clamp(80px, 10vw, 140px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...slideInUp}>
            <div className="mission-layout">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
                <Text font="label1" as="span" style={{ fontWeight: 600, color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '13px' }}>
                  {t('imageSection.sectionTitle')}
                </Text>
                <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
                  {t('imageSection.title')}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '17px', lineHeight: '28px' }}>
                  {t('imageSection.body1')}
                </Text>
              </div>
              <m.div {...slideInRight} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Lottie source={dappWallet} autoplay loop width="280px" height="280px" />
              </m.div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section: Overview — What Defied is */}
      <section
        id="overview"
        className="section-padding section-vertical-padding"
      >
        <Box as="div" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <AboutCarousel />
        </Box>
      </section>


      {/* Section: FAQ — Catch remaining objections */}
      <section
        id="faq"
        className="section-padding section-vertical-padding"
      >
        <InfoSection />
      </section>

      {/* Section: CTA repeat — Final push (Aave-inspired split layout) */}
      <section className="section-padding" style={{ padding: 'clamp(48px, 8vw, 80px) 16px' }}>
        <m.div {...slideInUp}>
          <div
            className="cta-split-card"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
              background: 'linear-gradient(115deg, #E7F0FB 0%, #F8FBFF 62%, #EDF3FC 100%)',
              borderRadius: '32px',
              overflow: 'hidden',
            }}
          >
            {/* Left: text content */}
            <div className="cta-split-text" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: 'clamp(40px, 6vw, 72px)', justifyContent: 'center', flex: 1 }}>
              <Image
                src="/defied_squared_logo_blue.svg"
                alt=""
                width={56}
                height={56}
              />
              <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500, lineHeight: 1.05 }}>
                {t('cta.heading')}
              </Text>
              <Text font="body" as="p" color="fgMuted" style={{ fontSize: '17px', lineHeight: '28px', maxWidth: '420px' }}>
                {t('cta.subheading')}
              </Text>
              <div style={{ marginTop: '8px' }}>
                <Button
                  as="a"
                  href="https://app.defied.money"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="btn-fw-500"
                  style={{
                    borderRadius: '56px',
                    height: '54px',
                    padding: '14px 28px',
                  }}
                >
                  <AnimatedButtonText>{t('hero.earlyAccess')}</AnimatedButtonText>
                </Button>
              </div>
            </div>
            {/* Right: laptop mockup — centered in the right half, bleeding off
                the card's bottom edge (the source asset is sheared there) */}
            <div className="cta-split-mockup" style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '360px' }}>
              <div style={{ position: 'relative', width: 'min(75%, 496px)', aspectRatio: '1660 / 900' }}>
                <Image
                  src="/cta-app-laptop.png"
                  alt="Defied app"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 75vw, 496px"
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
            </div>
          </div>
        </m.div>
      </section>

      {/* Section 7: Footer */}
      <Footer />
    </div>
  );
}
