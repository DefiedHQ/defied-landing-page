'use client';

import Image from 'next/image';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { useLanguage } from '@/context/LanguageContext';
import { useDownloadModal } from '@/context/DownloadModalContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';
import { HeroPhones } from '@/components/HeroPhones';

/* Android robot head - CDS has no Android glyph. The Android robot is
   licensed by Google under CC BY 3.0 (attribution in the SVG title). */
function AndroidIcon() {
  return (
    <svg width="32" height="18" viewBox="0 5.2 24 13.6" fill="currentColor" aria-hidden="true" className="hero-android-icon">
      <title>Android robot, Google, CC BY 3.0</title>
      <path d="M17.523 15.341a.998.998 0 1 1 0-1.996.998.998 0 0 1 0 1.996m-11.046 0a.998.998 0 1 1 0-1.996.998.998 0 0 1 0 1.996m11.405-6.02 1.997-3.46a.416.416 0 0 0-.72-.415l-2.023 3.505A12.2 12.2 0 0 0 12 7.803c-1.83 0-3.573.38-5.136 1.148L4.84 5.446a.416.416 0 0 0-.72.415l1.997 3.46C2.688 11.19.343 14.658 0 18.762h24c-.343-4.104-2.688-7.572-6.118-9.441" />
    </svg>
  );
}

/** id of the section the scroll cue jumps to (the trust strip under the hero) */
export const HERO_SCROLL_TARGET_ID = 'after-hero';

/** id of the hero itself - the header watches it to swap its CTA once scrolled past */
export const HERO_ID = 'hero';

/* Social-proof avatars (placeholder portraits from randomuser.me; swap for
   real customer photos in public/avatars/) */
const PILL_AVATARS = ['/avatars/a.jpg', '/avatars/b.jpg', '/avatars/c.jpg'];

/**
 * Hero - one message, one CTA, and the product running on two phones.
 */
export function HeroStatic() {
  const { t } = useLanguage();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const scrollPastHero = () => scrollToId(HERO_SCROLL_TARGET_ID);

  const { open: openWaitlist } = useDownloadModal();

  return (
    <div className="hero-card" id={HERO_ID}>
      <div className="hero-card-content">
        <div className="hero-card-layout">
          <div className="hero-card-copy">
            {/* Social-proof pill directly above the headline so the two read
                as one block: three faces, then "10k+ users" + claim */}
            <p className="hero-pill">
              <span className="hero-pill-avatars" aria-hidden="true">
                {PILL_AVATARS.map((src) => (
                  <Image key={src} src={src} alt="" width={28} height={28} className="hero-pill-avatar" />
                ))}
              </span>
              <span>
                <strong>{t('hero.pillLabel')}</strong> {t('hero.pillText')}
              </span>
            </p>
            <Text
              font="display1"
              as="h1"
              display="block"
              className="title-tight-lh hero-title"
              style={{
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}
            >
              {t('hero.titleLine1')}{' '}
              <span className="hero-title-line2">{t('hero.titleLine2')}</span>
            </Text>

            <Text
              font="body"
              as="p"
              display="block"
              color="fgMuted"
              className="text-lead"
              style={{
                marginTop: 'clamp(20px, 3vw, 32px)',
                maxWidth: '490px',
                textWrap: 'balance',
              }}
            >
              {t('hero.cardSubtitle')}
            </Text>

            <div className="hero-card-cta-row">
              <Button
                as="a"
                href="https://wallet.defied.money"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                /* start slot (not startIcon): keeps the glyph next to the
                   label when the pill stretches to full width on phones */
                start={<Icon name="wallet" size="m" dangerouslySetColor="currentColor" />}
                className="btn-fw-500"
                style={{
                  borderRadius: '56px',
                  height: '56px',
                  padding: '16px 32px',
                  justifyContent: 'center',
                }}
              >
                <AnimatedButtonText>{t('hero.earlyAccess')}</AnimatedButtonText>
              </Button>
              {/* Transparent secondary (CDS: "supplementary actions with
                  lower prominence", pill shows on hover): the app waitlist is
                  the side door and must not weigh the same as the wallet CTA */}
              <Button
                onClick={openWaitlist}
                aria-haspopup="dialog"
                variant="secondary"
                transparent
                className="btn-fw-500"
                start={
                  <span className="hero-platform-icons" aria-hidden="true">
                    <Icon name="appleLogo" size="m" dangerouslySetColor="currentColor" className="hero-apple-icon" />
                    <AndroidIcon />
                  </span>
                }
                style={{
                  borderRadius: '56px',
                  height: '56px',
                  padding: '16px 32px',
                  justifyContent: 'center',
                }}
              >
                <AnimatedButtonText>{t('hero.waitlistCta')}</AnimatedButtonText>
              </Button>
            </div>
          </div>

          {/* The product itself: the live wallet and markets feeds, on phones */}
          <HeroPhones />
        </div>
      </div>

      {/* Scroll cue pinned to the bottom of the first viewport */}
      <div className="hero-scroll-cue">
        <IconButton
          name="caretDown"
          variant="secondary"
          onClick={scrollPastHero}
          aria-label={t('hero.scrollCue')}
        />
      </div>
    </div>
  );
}
