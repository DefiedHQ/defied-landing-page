'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { IconButton } from '@coinbase/cds-web/buttons/IconButton';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';

/** id of the section the scroll cue jumps to (the trust strip under the hero) */
export const HERO_SCROLL_TARGET_ID = 'after-hero';

/** Base Europe post linked from the hero pill */
const BASE_EUROPE_POST_URL = 'https://x.com/Base_EUR/status/2079858688601280868';

/**
 * Static hero - one message, one CTA.
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

  const goToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId('features');
  };

  return (
    <div className="hero-card">
      <div className="hero-card-content">
        {/* Social-proof pill linking to the Base Europe post */}
        <a className="hero-pill" href={BASE_EUROPE_POST_URL} target="_blank" rel="noopener noreferrer">
          <span>{t('hero.pillLabel')}</span>
          <span className="hero-pill-divider" aria-hidden="true" />
          <span className="hero-pill-cta">{t('hero.pillCta')}</span>
        </a>
        <Text
          font="display1"
          as="h1"
          display="block"
          className="title-tight-lh"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
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
          style={{
            marginTop: 'clamp(20px, 3vw, 32px)',
            maxWidth: '560px',
            textWrap: 'pretty',
            fontSize: '20px',
            lineHeight: '30px',
            color: '#3C4048',
          }}
        >
          {t('hero.cardSubtitle')}
        </Text>

        <div className="hero-card-cta-row">
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
              justifyContent: 'center',
            }}
          >
            <AnimatedButtonText>{t('hero.earlyAccess')}</AnimatedButtonText>
          </Button>
          <Button
            as="a"
            href="#features"
            onClick={goToFeatures}
            variant="secondary"
            className="btn-fw-500"
            style={{
              borderRadius: '56px',
              height: '58px',
              padding: '16px 32px',
              justifyContent: 'center',
            }}
          >
            <AnimatedButtonText>{t('hero.seeFeatures')}</AnimatedButtonText>
          </Button>
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
