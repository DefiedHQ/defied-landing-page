'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';

/**
 * Static hero - one message, one CTA.
 */
export function HeroStatic() {
  const { t } = useLanguage();

  return (
    <div className="hero-card">
      <div className="hero-card-content">
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
          {`${t('hero.titleStart')} ${t('hero.titleHighlight')} ${t('hero.titleEnd')}`}
        </Text>

        <Text
          font="body"
          as="p"
          display="block"
          style={{
            marginTop: 'clamp(20px, 3vw, 32px)',
            maxWidth: '440px',
            fontSize: '18px',
            lineHeight: '28px',
            color: '#3C4048',
          }}
        >
          {t('hero.cardSubtitle')}
          <sup style={{ fontSize: '0.6em' }}>1</sup>
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
        </div>
      </div>
    </div>
  );
}
