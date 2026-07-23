'use client';

import { m } from 'framer-motion';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { LocalPictogram } from './LocalPictogram';
import { useLanguage } from '@/context/LanguageContext';

const CARD_PICTOGRAMS = [
  'selfCustodyWallet',
  'browser',
  'decentralizedWeb3',
  'gasFees',
] as const;

export function AboutCarousel() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('aboutCarousel.card1Title'),
      desc: t('aboutCarousel.card1Desc'),
    },
    {
      title: t('aboutCarousel.card2Title'),
      desc: t('aboutCarousel.card2Desc'),
    },
    {
      title: t('aboutCarousel.card3Title'),
      desc: t('aboutCarousel.card3Desc'),
    },
    {
      title: t('aboutCarousel.card4Title'),
      desc: t('aboutCarousel.card4Desc'),
    },
  ];

  return (
    <VStack as="div" style={{ gap: '48px' }}>
      {/* Header */}
      <Text font="display2" as="h2" className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 500, maxWidth: '720px' }}>
        {t('aboutCarousel.title')}
      </Text>

      {/* Open 2-column rows — a different layout family from the Features
          card grid, so the two sections stop reading as the same template
          (design review, Phase 1). */}
      <div className="about-rows">
        {cards.map((card, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className="about-row">
              <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <LocalPictogram name={CARD_PICTOGRAMS[i]} dimension="48x48" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text font="title3" as="h3" style={{ fontWeight: 600 }}>
                  {card.title}
                </Text>
                <Text font="body" as="p" color="fgMuted" style={{ fontSize: '15px', lineHeight: '24px' }}>
                  {card.desc}
                </Text>
              </div>
            </article>
          </m.div>
        ))}
      </div>
    </VStack>
  );
}
