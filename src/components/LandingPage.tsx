'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';

/* One motion system (design review, Phase 3): everything fades up 20px over
   0.5s with an ease-out-quart curve. No slides from the sides, nothing
   auto-plays. Staggers are 60ms. MotionConfig in CdsProvider handles
   prefers-reduced-motion. */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [...MOTION_EASE] },
};
import { FeaturedPosts } from '@/components/FeaturedPosts';
import { InfrastructureSection } from '@/components/InfrastructureSection';
import { InfoSection } from '@/components/Hero';
import { HeroStatic } from '@/components/HeroStatic';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';

export function LandingPage() {
  const { t } = useLanguage();

  // Smooth-scroll for in-page anchor links (matches the header nav behavior;
  // the global reduced-motion override turns this into an instant jump)
  const scrollToFaq = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById('faq');
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      {/* Section 1: Hero — full-width static photo card, one message */}
      <section className="section-padding" style={{ paddingTop: 'clamp(16px, 2vw, 24px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [...MOTION_EASE] }}
          >
            <HeroStatic />
          </m.div>
        </div>
      </section>

      {/* Section 2: Trust strip — Infrastructure Partners */}
      <section className="section-padding section-rhythm">
        <InfrastructureSection />
      </section>

      {/* Section 3: Earning — signature moment, proves the hero's promise */}
      <section id="earning" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="earning-band">
              <div className="earning-band-text">
                <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
                  {t('earning.title')}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '17px', lineHeight: '28px', maxWidth: '46ch' }}>
                  {t('earning.body')}
                  <sup style={{ fontSize: '0.6em' }}>1</sup>
                </Text>
                <a href="#faq" onClick={scrollToFaq} className="band-link">{t('earning.link')}</a>
              </div>
              {/* Laptop app shot, resting on the band's bottom edge — same
                  treatment as the final CTA card (the asset is sheared there) */}
              <div className="earning-band-device">
                <m.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.12, ease: [...MOTION_EASE] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src="/cta-app-laptop.png"
                    alt={t('earning.screenshotAlt')}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 90vw, 520px"
                    style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                  />
                </m.div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 4: Ownership — answers the control objection right after the
          yield promise. Edge-bleed band: photo fills the left half. */}
      <section id="ownership" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="bleed-band" style={{ background: 'var(--surface)' }}>
              <div className="bleed-band-photo">
                <Image
                  src="/explore-add-money.jpg"
                  alt={t('advantages.bandImageAlt')}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <span className="photo-chip">{t('advantages.bandChip')}</span>
              </div>
              <div className="bleed-band-text">
                <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
                  {t('advantages.bandTitle')}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '17px', lineHeight: '28px', maxWidth: '46ch' }}>
                  {t('advantages.bandBody')}
                </Text>
                <a href="#faq" onClick={scrollToFaq} className="band-link">{t('advantages.bandCta')}</a>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 5: Features — all-photo grid, proof points as chips */}
      <section id="features" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp} style={{ textAlign: 'center' }}>
            <Text font="display2" as="h2" display="block" className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, maxWidth: '720px', marginBottom: '24px' }}>
              {t('features.sectionTitle')}
            </Text>
            <Text font="body" as="p" color="fgMuted" display="block" style={{ fontSize: '18px', lineHeight: '28px', maxWidth: '560px', margin: '0 auto 56px', textAlign: 'center' }}>
              {t('features.sectionSubtitle')}
            </Text>
          </m.div>

          {/* All-photo grid — the earn cell spans both rows on desktop */}
          <div className="features-grid-2x2">
            {[
              { key: 'earn', title: t('features.f2Title'), desc: t('features.f2Desc'), chip: t('features.f2Chip'), image: '/hero-earn.jpg', imageAlt: t('features.f2ImageAlt'), tall: true },
              { key: 'send', title: t('features.f1Title'), desc: t('features.f1Desc'), chip: t('features.f1Chip'), image: '/explore-card.jpg', imageAlt: t('features.f1ImageAlt'), tall: false },
              { key: 'exchange', title: t('features.f3Title'), desc: t('features.f3Desc'), chip: t('features.f3Chip'), image: '/explore-exchange.jpg', imageAlt: t('features.f3ImageAlt'), tall: false, imagePosition: '50% 25%' },
            ].map((feature, i) => (
              /* Plain wrapper carries the grid-child modifier class —
                 framer-motion@10's m.div typings don't accept className */
              <div key={feature.key} className={feature.tall ? 'feature-card--tall' : undefined}>
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [...MOTION_EASE] }}
                  style={{ display: 'flex', width: '100%' }}
                >
                  <article className="feature-card feature-card--photo">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 584px"
                      style={'imagePosition' in feature && feature.imagePosition ? { objectPosition: feature.imagePosition } : undefined}
                    />
                    <span className="photo-chip">{feature.chip}</span>
                    <div className="feature-card-photo-overlay">
                      <Text font="title3" as="h3" style={{ fontWeight: 600, color: '#FFFFFF' }}>{feature.title}</Text>
                      <Text font="body" as="p" style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(255,255,255,0.88)' }}>{feature.desc}</Text>
                    </div>
                  </article>
                </m.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: How it works — edge-bleed band with vertical 3-step list
          and the mid-page CTA */}
      <section id="how-it-works" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="bleed-band" style={{ background: 'var(--surface)' }}>
              <div className="bleed-band-photo">
                <Image
                  src="/explore-earn.jpg"
                  alt={t('steps.imageAlt')}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <span className="photo-chip">{t('steps.chip')}</span>
              </div>
              <div className="bleed-band-text">
                <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
                  {t('steps.title')}
                </Text>
                <div className="steps-list">
                  {[
                    { title: t('steps.s1Title'), desc: t('steps.s1Desc') },
                    { title: t('steps.s2Title'), desc: t('steps.s2Desc') },
                    { title: t('steps.s3Title'), desc: t('steps.s3Desc') },
                  ].map((step, i) => (
                    <div key={i} className="step-row">
                      <div className="step-number" aria-hidden="true">{i + 1}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Text font="title4" as="h3" style={{ fontWeight: 600 }}>{step.title}</Text>
                        <Text font="body" as="p" color="fgMuted" style={{ fontSize: '15px', lineHeight: '24px' }}>{step.desc}</Text>
                      </div>
                    </div>
                  ))}
                </div>
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
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 7: Stablecoins — the one explainer keeping USDC/EURC tickers.
          Edge-bleed band on mist: text left, photo right. */}
      <section id="stablecoins" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="bleed-band bleed-band--photo-right" style={{ background: 'var(--mist)' }}>
              <div className="bleed-band-photo">
                <Image
                  src="/hero-travel.jpg"
                  alt={t('advantages.stablecoinsImageAlt')}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <span className="photo-chip">{t('advantages.stablecoinsChip')}</span>
              </div>
              <div className="bleed-band-text">
                <Text font="label1" as="span" style={{ fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '13px' }}>
                  {t('advantages.stablecoinsKicker')}
                </Text>
                <Text font="display2" as="h3" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
                  {t('advantages.row1Heading')}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '17px', lineHeight: '28px', maxWidth: '46ch' }}>
                  {t('advantages.row1Subtext')}
                </Text>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 8: Mission — full-bleed Sofia photo band, merged with the
          origin story (text anchored bottom-left over a layered scrim) */}
      <section id="mission" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="mission-hero">
              <Image
                src="/sofia-skyline.jpg"
                alt={t('imageSection.imageAlt')}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
              />
              <div className="mission-hero-content">
                <Text font="label1" as="span" style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '13px' }}>
                  {t('imageSection.sectionTitle')}
                </Text>
                <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500, color: '#FFFFFF' }}>
                  {t('imageSection.title')}
                </Text>
                <Text font="body" as="p" style={{ fontSize: '17px', lineHeight: '28px', color: 'rgba(255,255,255,0.88)' }}>
                  {t('imageSection.body1')}
                </Text>
              </div>
              <span className="photo-chip photo-chip--br">{t('imageSection.chip')}</span>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 9: FAQ — Catch remaining objections */}
      <section
        id="faq"
        className="section-padding section-rhythm"
      >
        <InfoSection />
      </section>

      {/* Section 10: CTA repeat — Final push (Aave-inspired split layout) */}
      <section className="section-padding section-rhythm">
        <m.div {...fadeUp}>
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
                  alt="Defied Money app"
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

      {/* Section 11: From the blog — link the landing to the content cluster */}
      <section id="blog-highlights" className="section-padding section-rhythm section-rhythm-bottom">
        <m.div {...fadeUp}>
          <FeaturedPosts />
        </m.div>
      </section>

      {/* Section 12: Footer */}
      <Footer />
    </div>
  );
}
