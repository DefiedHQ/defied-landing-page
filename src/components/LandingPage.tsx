'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Icon } from '@coinbase/cds-web/icons/Icon';

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
import { HeroStatic, HERO_SCROLL_TARGET_ID } from '@/components/HeroStatic';
import { HeroWalletCard } from '@/components/HeroWalletCard';
import { PhoneFrame } from '@/components/PhoneFrame';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';
import { PictogramCover } from '@/components/PictogramCover';
import Link from 'next/link';
import { LocalPictogram, type LocalPictogramName } from '@/components/LocalPictogram';

type FeatureCard = {
  key: string;
  title: string;
  desc: string;
  pictogram: LocalPictogramName;
  tint: 'mist' | 'stone';
  tall: boolean;
};

export function LandingPage() {
  const { t, localePath } = useLanguage();

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
      {/* Section 1: Hero — centered introduction, one message */}
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
      <section id={HERO_SCROLL_TARGET_ID} className="section-padding section-rhythm trust-strip-after-hero">
        <InfrastructureSection />
      </section>

      {/* Section 3: Features — pictogram-cover grid, the plain "what you get" */}
      <section id="features" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp} style={{ textAlign: 'center' }}>
            <Text font="label1" as="span" display="block" className="kicker" style={{ textAlign: 'center', marginBottom: '12px' }}>
              {t('features.kicker')}
            </Text>
            <Text font="display2" as="h2" display="block" className="section-title section-heading" style={{ maxWidth: '720px', marginBottom: '24px' }}>
              {t('features.sectionTitle')}
            </Text>
            <Text font="body" as="p" color="fgMuted" display="block" className="text-lead" style={{ maxWidth: '560px', margin: '0 auto 56px', textAlign: 'center', textWrap: 'pretty' }}>
              {t('features.sectionSubtitle')}
            </Text>
          </m.div>

          {/* Pictogram-cover grid (same grammar as the blog covers) — the
              earn cell spans both rows on desktop */}
          <div className="features-grid-2x2">
            {([
              { key: 'earn', title: t('features.f2Title'), desc: t('features.f2Desc'), pictogram: 'decentralizedWeb3', tint: 'mist', tall: true },
              { key: 'send', title: t('features.f1Title'), desc: t('features.f1Desc'), pictogram: 'sendPaymentToOthers', tint: 'stone', tall: false },
              { key: 'exchange', title: t('features.f3Title'), desc: t('features.f3Desc'), pictogram: 'walletExchange', tint: 'stone', tall: false },
            ] satisfies FeatureCard[]).map((feature, i) => (
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
                  <article className={`feature-card feature-card--cover feature-card--cover-${feature.tint}`}>
                    <div className="feature-card-cover-art">
                      <PictogramCover name={feature.pictogram} tint={feature.tint} />
                    </div>
                    <div className="feature-card-cover-text">
                      <Text font="title3" as="h3" className="card-title" style={{ fontWeight: 600 }}>{feature.title}</Text>
                      <Text font="body" as="p" color="fgMuted" className="text-card">{feature.desc}</Text>
                    </div>
                  </article>
                </m.div>
              </div>
            ))}
          </div>
          <m.div {...fadeUp}>
            <div className="note-stack note-stack--section">
              <p>{t('features.noteText')}</p>
              <Link href={localePath('/risks')} className="band-link note-stack-link">{t('features.noteLink')}</Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 4: Comparison — Aave's bank-vs-fintech chart, reframed
          around control instead of a rate. Three honest states per cell
          (yes / partly / no); the guarantee row goes against us on purpose. */}
      <section id="compare" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="safety-head">
              <Text font="label1" as="span" className="kicker">
                {t('compare.kicker')}
              </Text>
              <Text font="display2" as="h2" className="section-heading">
                {t('compare.title')}
              </Text>
              <Text font="body" as="p" color="fgMuted" className="text-lead" style={{ maxWidth: '46ch' }}>
                {t('compare.subtitle')}
              </Text>
            </div>
          </m.div>
          <m.div {...fadeUp}>
            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">{t('compare.kicker')}</span></th>
                    <th scope="col">{t('compare.colBank')}</th>
                    <th scope="col">{t('compare.colFintech')}</th>
                    <th scope="col" className="compare-col-us">{t('compare.colDefied')}</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    { key: 'r1', cells: ['no', 'no', 'yes'] },
                    { key: 'r2', cells: ['partly', 'partly', 'yes'] },
                    { key: 'r3', cells: ['no', 'no', 'yes'] },
                    { key: 'r4', cells: ['no', 'no', 'yes'] },
                    { key: 'r5', cells: ['no', 'no', 'yes'] },
                    { key: 'r6', cells: ['no', 'no', 'yes'] },
                    { key: 'r7', cells: ['yes', 'partly', 'no'] },
                  ] as { key: string; cells: ('yes' | 'no' | 'partly')[] }[]).map((row) => (
                    <tr key={row.key}>
                      <th scope="row">{t(`compare.${row.key}`)}</th>
                      {row.cells.map((cell, i) => (
                        <td key={i} className={i === 2 ? 'compare-col-us' : undefined}>
                          <span className={`compare-cell compare-cell--${cell}`}>
                            {cell === 'yes' && <Icon name="checkmark" size="s" dangerouslySetColor="currentColor" />}
                            {cell === 'no' && <Icon name="minus" size="s" dangerouslySetColor="currentColor" />}
                            <span className={cell === 'yes' || cell === 'no' ? 'sr-only' : undefined}>{t(`compare.${cell}`)}</span>
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </m.div>
          <m.div {...fadeUp}>
            <div className="note-stack note-stack--section">
              <p>{t('compare.noteText')}</p>
              <Link href={localePath('/risks')} className="band-link note-stack-link">{t('compare.noteLink')}</Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 5: How it works — edge-bleed band with vertical 3-step list
          and the mid-page CTA */}
      <section id="how-it-works" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="bleed-band" style={{ background: 'var(--surface)' }}>
              <div className="bleed-band-photo bleed-band-photo--cover">
                <PictogramCover name="getStarted" tint="mist" />
              </div>
              <div className="bleed-band-text">
                <Text font="label1" as="span" className="kicker">
                  {t('steps.kicker')}
                </Text>
                <Text font="display2" as="h2" className="section-heading">
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
                        <Text font="title4" as="h3" className="card-title" style={{ fontWeight: 600 }}>{step.title}</Text>
                        <Text font="body" as="p" color="fgMuted" className="text-card">{step.desc}</Text>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <Button
                    as="a"
                    href="https://wallet.defied.money"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="btn-fw-500"
                    style={{
                      borderRadius: '56px',
                      height: '56px',
                      padding: '14px 28px',
                    }}
                  >
                    <AnimatedButtonText>{t('hero.earlyAccess')}</AnimatedButtonText>
                  </Button>
                </div>
                <div className="note-stack">
                  <p>{t('steps.noteText')}</p>
                  <Link href={localePath('/terms')} className="band-link note-stack-link">{t('steps.noteLink')}</Link>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 6: Stablecoins — the one explainer keeping USDC/EURC tickers.
          Edge-bleed band on mist: text left, photo right. */}
      <section id="stablecoins" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="bleed-band bleed-band--photo-right" style={{ background: 'var(--mist)' }}>
              <div className="bleed-band-photo bleed-band-photo--cover">
                <PictogramCover name="stableCoinMetaphor" tint="stone" />
              </div>
              <div className="bleed-band-text">
                <Text font="label1" as="span" className="kicker">
                  {t('advantages.stablecoinsKicker')}
                </Text>
                <Text font="display2" as="h3" className="section-heading">
                  {t('advantages.row1Heading')}
                </Text>
                <Text font="body" as="p" color="fgMuted" className="text-lead" style={{ maxWidth: '46ch' }}>
                  {t('advantages.row1Subtext')}
                </Text>
                <div className="note-stack">
                  <p>{t('advantages.row1NoteText')}</p>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 7: Earning — the differentiator, placed after the basics */}
      <section id="earning" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="earning-band">
              <div className="earning-band-text">
                <Text font="label1" as="span" className="kicker">
                  {t('earning.kicker')}
                </Text>
                <Text font="display2" as="h2" className="section-heading">
                  {t('earning.title')}
                </Text>
                <Text font="body" as="p" color="fgMuted" className="text-lead" style={{ maxWidth: '46ch' }}>
                  {t('earning.body')}
                </Text>
                <a href="#faq" onClick={scrollToFaq} className="band-link">{t('earning.link')}</a>
                <div className="note-stack">
                  <p>{t('earning.noteText')}</p>
                  <Link href={localePath('/risks')} className="band-link note-stack-link">{t('earning.noteLink')}</Link>
                </div>
              </div>
              {/* The markets view of the live card on an upright phone that
                  rises from the band's bottom edge: money in Aave and Fluid,
                  deposits and withdrawals rolling through, no rate anywhere */}
              <div className="earning-band-device">
                <m.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.12, ease: [...MOTION_EASE] }}
                >
                  <PhoneFrame>
                    <HeroWalletCard variant="markets" visibleRows={4} />
                  </PhoneFrame>
                </m.div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 8: Self-custody — the claim (former ownership band) as the
          header, the four concrete mechanisms as the proof. Quiet list on
          white, no cards, so it reads as facts rather than features. The
          hedge lives in one footnote, not inside each item. */}
      <section id="safety" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="safety-head">
              <Text font="label1" as="span" className="kicker">
                {t('safety.kicker')}
              </Text>
              <Text font="display2" as="h2" className="section-heading">
                {t('advantages.bandTitle')}
              </Text>
              <Text font="body" as="p" color="fgMuted" className="text-lead" style={{ maxWidth: '52ch' }}>
                {t('advantages.bandBody')}
              </Text>
              <a href="#faq" onClick={scrollToFaq} className="band-link">{t('advantages.bandCta')}</a>
            </div>
          </m.div>
          <ul className="safety-grid">
            {([
              { key: 'i1', pictogram: 'selfCustodyWallet' },
              { key: 'i2', pictogram: 'browser' },
              { key: 'i3', pictogram: 'creditCard' },
              { key: 'i4', pictogram: 'stableCoinMetaphor' },
            ] satisfies { key: string; pictogram: LocalPictogramName }[]).map((item, i) => (
              <li key={item.key} className="safety-item">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [...MOTION_EASE] }}
                >
                  <div className="safety-item-art" aria-hidden="true">
                    <LocalPictogram name={item.pictogram} dimension="48x48" />
                  </div>
                  <Text font="title3" as="h3" className="card-title" style={{ fontWeight: 600 }}>{t(`safety.${item.key}Title`)}</Text>
                  <Text font="body" as="p" color="fgMuted" className="text-card">{t(`safety.${item.key}Desc`)}</Text>
                </m.div>
              </li>
            ))}
          </ul>
          <m.div {...fadeUp}>
            <div className="note-stack note-stack--section note-stack--after-list">
              <p>{t('safety.noteText')}</p>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 9: Mission — edge-bleed band, art left on stone, text on
          mist (mirrors the stablecoins band above) */}
      <section id="mission" className="section-padding section-rhythm">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <m.div {...fadeUp}>
            <div className="bleed-band" style={{ background: 'var(--mist)' }}>
              <div className="bleed-band-photo bleed-band-photo--cover">
                <PictogramCover name="lightbulbLearn" tint="stone" />
              </div>
              <div className="bleed-band-text">
                <Text font="label1" as="span" className="kicker">
                  {t('imageSection.sectionTitle')}
                </Text>
                <Text font="display2" as="h2" className="section-heading">
                  {t('imageSection.title')}
                </Text>
                <Text font="body" as="p" color="fgMuted" className="text-lead" style={{ maxWidth: '46ch' }}>
                  {t('imageSection.body1')}
                </Text>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 10: FAQ — Catch remaining objections */}
      <section
        id="faq"
        className="section-padding section-rhythm"
      >
        <InfoSection />
      </section>

      {/* Section 11: CTA repeat — Final push (Aave-inspired split layout) */}
      <section className="section-padding section-rhythm">
        <m.div {...fadeUp}>
          <div
            className="cta-split-card"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
              background: 'linear-gradient(115deg, var(--mist) 0%, var(--mist-wash) 62%, var(--mist) 100%)',
              borderRadius: '32px',
              overflow: 'hidden',
            }}
          >
            {/* Left: text content */}
            <div className="cta-split-text" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 'var(--band-pad)', justifyContent: 'center', flex: 1 }}>
              <Image
                src="/defied_squared_logo_blue.svg"
                alt=""
                width={56}
                height={56}
              />
              <Text font="display2" as="h2" className="section-heading">
                {t('cta.heading')}
              </Text>
              <Text font="body" as="p" color="fgMuted" className="text-lead" style={{ maxWidth: '420px' }}>
                {t('cta.subheading')}
              </Text>
              <div style={{ marginTop: '8px' }}>
                <Button
                  as="a"
                  href="https://wallet.defied.money"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="btn-fw-500"
                  style={{
                    borderRadius: '56px',
                    height: '56px',
                    padding: '14px 28px',
                  }}
                >
                  <AnimatedButtonText>{t('hero.earlyAccess')}</AnimatedButtonText>
                </Button>
              </div>
            </div>
            {/* Right: the payments view of the live card on an upright phone
                that rises from the card's bottom edge (the card's overflow
                crops the lower part of the device) */}
            <div className="cta-split-mockup">
              <div className="cta-split-phone">
                <PhoneFrame>
                  <HeroWalletCard variant="payments" visibleRows={4} />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </m.div>
      </section>

      {/* Section 12: From the blog — link the landing to the content cluster */}
      <section id="blog-highlights" className="section-padding section-rhythm section-rhythm-bottom">
        <m.div {...fadeUp}>
          <FeaturedPosts />
        </m.div>
      </section>

      {/* Section 13: Footer */}
      <Footer />
    </div>
  );
}
