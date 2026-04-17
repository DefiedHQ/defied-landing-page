'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
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
import { ProtocolsSection } from '@/components/ProtocolsSection';
import { InfrastructureSection } from '@/components/InfrastructureSection';
import { InfoSection } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';
import { DownloadAppModal } from '@/components/DownloadAppModal';

export function LandingPage() {
  const { t } = useLanguage();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

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
      {/* Section 1: Hero */}
      <section className="section-padding" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <VStack
          as="div"
          style={{
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            textAlign: 'center',
            flex: 1,
            justifyContent: 'center',
            paddingTop: 'clamp(48px, 10vw, 120px)',
          }}
        >
          {/* Pill badge */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="hero-pill-badge">
              <Image
                src="/defied_squared_logo_blue.svg"
                alt=""
                width={28}
                height={28}
                style={{ borderRadius: '50%' }}
              />
              <Text font="label2" as="span" style={{ fontWeight: 500, color: '#0A0B0D' }}>Defied</Text>
            </div>
          </m.div>

          {/* Headline with accent highlight */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            style={{ marginTop: '28px' }}
          >
            <Text font="display1" as="h1" className="title-tight-lh" style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', fontWeight: 500, letterSpacing: '-0.02em', textAlign: 'center' }}>
              {t('hero.titleStart')}{' '}
              <span className="hero-accent-highlight">
                {t('hero.titleHighlight')}
                <svg className="wavy-underline" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 8 Q25 2, 50 8 T100 8 T150 8 T200 8" />
                </svg>
              </span>{' '}
              {t('hero.titleEnd')}
            </Text>
          </m.div>

          {/* Subtitle */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            style={{ marginTop: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Text
              font="body"
              as="p"
              color="fgMuted"
              style={{ maxWidth: '640px', fontSize: '18px', lineHeight: '28px', textAlign: 'center' }}
            >
              {t('hero.subtitle1')}<sup style={{ fontSize: '0.6em' }}>1</sup>
            </Text>

            {/* CTA buttons */}
            <div className="flex-col-row-md" style={{ marginTop: '32px', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                onClick={() => setDownloadModalOpen(true)}
                variant="primary"
                startIcon="download"
                className="btn-fw-500"
                style={{
                  borderRadius: '56px',
                  height: '58px',
                  padding: '16px 32px',
                  width: '240px',
                  justifyContent: 'center',
                }}
              >
                <AnimatedButtonText>{t('hero.cta')}</AnimatedButtonText>
              </Button>
              <Button
                as="a"
                href="#what-it-does"
                variant="secondary"
                className="btn-fw-500"
                style={{
                  borderRadius: '56px',
                  height: '58px',
                  padding: '16px 32px',
                  width: '240px',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1.5px solid #D1D5DB',
                  color: '#0A0B0D',
                }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  const el = document.getElementById('what-it-does');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <AnimatedButtonText>{t('hero.learnMore')}</AnimatedButtonText>
              </Button>
            </div>
          </m.div>
        </VStack>

        {/* Hero phone mockup in rounded gray container */}
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            marginTop: 'clamp(32px, 6vw, 64px)',
            flexShrink: 0,
          }}
        >
          <m.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <div
              className="hero-mockup-container"
              style={{
                background: '#F7F8F9',
                borderRadius: '40px',
                padding: 'clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px) 0',
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '900 / 600' }}>
                <Image
                  src="/hero_landing.png"
                  alt="Defied app interface"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 900px) 100vw, 900px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section: Trust strip — Infrastructure Partners */}
      <section className="section-padding" style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: 'clamp(48px, 8vw, 80px)' }}>
        <InfrastructureSection />
      </section>

      {/* Section: What it does — Features grid + deep dive */}
      <section id="what-it-does" className="section-padding" style={{ paddingTop: 'clamp(48px, 8vw, 80px)' }}>
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

          {/* Deep dive section title */}
          <m.div {...slideInUp} style={{ textAlign: 'center', marginTop: 'clamp(64px, 10vw, 120px)' }}>
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
                customImageSrc: '/stablecoin_section.png',
              },
              {
                illustration: 'walletSecurity' as const,
                heading: t('advantages.row2Heading'),
                text: t('advantages.row2Subtext'),
                reversed: true,
                useCustomImage: true,
                customImageSrc: '/account_section.png',
              },
              {
                illustration: 'exploreDecentralizedApps' as const,
                heading: t('advantages.row3Heading'),
                text: t('advantages.row3Subtext'),
                reversed: false,
                useCustomImage: true,
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
                    <Image src={'customImageSrc' in card ? (card.customImageSrc as string) : '/defi_section.png'} alt={card.heading} width={500} height={500} loading="lazy" sizes="(max-width: 768px) 100vw, 500px" style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '56px' }} />
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

      {/* Section: How it works */}
      <section
        id="how-it-works"
        className="section-padding section-vertical-padding"
      >
        <Box as="div" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <AboutCarousel />
        </Box>
      </section>

      {/* Section: Protocols — DeFi access proof points */}
      <section className="section-padding section-vertical-padding">
        <ProtocolsSection />
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
              background: 'rgba(0, 82, 255, 0.06)',
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
                  onClick={() => setDownloadModalOpen(true)}
                  variant="primary"
                  startIcon="download"
                  className="btn-fw-500"
                  style={{
                    borderRadius: '56px',
                    height: '54px',
                    padding: '14px 28px',
                  }}
                >
                  <AnimatedButtonText>{t('hero.cta')}</AnimatedButtonText>
                </Button>
              </div>
            </div>
            {/* Right: phone mockup */}
            <div className="cta-split-mockup" style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '360px' }}>
              <div style={{ position: 'relative', width: 'clamp(260px, 70%, 340px)', aspectRatio: '390 / 780' }}>
                <Image
                  src="/hero_landing.png"
                  alt="Defied app"
                  fill
                  loading="lazy"
                  sizes="340px"
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </div>
            </div>
          </div>
        </m.div>
      </section>

      {/* Section 7: Footer */}
      <Footer />

      <DownloadAppModal open={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </div>
  );
}
