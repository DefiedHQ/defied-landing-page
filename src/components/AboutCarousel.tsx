'use client';

import { m } from 'framer-motion';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { HeroSquare } from '@coinbase/cds-web/illustrations/HeroSquare';
import { useLanguage } from '@/context/LanguageContext';

const CARD_ILLUSTRATIONS = [
  'selfCustody',
  'decentralizedWebWeb3',
  'retailUSDCRewards',
  'sendCryptoFaster',
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

      {/* 2-column grid */}
      <div className="grid-1-2">
        {cards.map((card, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
          >
            <Box
              as="article"
              className="about-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(24px, 4vw, 40px)',
                minHeight: '320px',
                background: 'rgb(247, 248, 249)',
                borderRadius: '56px',
              }}
            >
              {/* Illustration at top */}
              <Box as="div" style={{ width: 80, height: 80, overflow: 'hidden', flexShrink: 0 }}>
                <HeroSquare name={CARD_ILLUSTRATIONS[i]} scaleMultiplier={0.33} />
              </Box>
              {/* Title + Description at bottom */}
              <VStack as="div" style={{ gap: '8px' }}>
                <Text font="title3" as="h4" style={{ fontWeight: 600 }}>
                  {card.title}
                </Text>
                <Text font="body" as="p" color="fgMuted">
                  {card.desc}
                </Text>
              </VStack>
            </Box>
          </m.div>
        ))}
      </div>
    </VStack>
  );
}
