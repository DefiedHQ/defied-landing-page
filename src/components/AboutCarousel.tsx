'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function AboutCarousel() {
  const { t } = useLanguage();

  const cards = [
    {
      tag: t('aboutCarousel.card1Tag'),
      title: t('aboutCarousel.card1Title'),
      desc: t('aboutCarousel.card1Desc'),
      href: '/about',
    },
    {
      tag: t('aboutCarousel.card2Tag'),
      title: t('aboutCarousel.card2Title'),
      desc: t('aboutCarousel.card2Desc'),
      href: '/about',
    },
    {
      tag: t('aboutCarousel.card3Tag'),
      title: t('aboutCarousel.card3Title'),
      desc: t('aboutCarousel.card3Desc'),
      href: '/about',
    },
    {
      tag: t('aboutCarousel.card4Tag'),
      title: t('aboutCarousel.card4Title'),
      desc: t('aboutCarousel.card4Desc'),
      href: '/about',
    },
  ];

  return (
    <div className="px-4 sm:px-10">
      {/* Header row: title left, subtitle right */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16 mb-12 sm:mb-16">
        <h2
          className="text-[28px] sm:text-[40px] md:text-[52px] lg:max-w-[50%]"
          style={{ fontWeight: 500, color: '#0A0B0D', lineHeight: 1.1 }}
        >
          {t('aboutCarousel.title')}
        </h2>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="about-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(24px, 4vw, 40px)',
              minHeight: '320px',
              textDecoration: 'none',
            }}
          >
            {/* Tag pill at top */}
            <span
              style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                background: '#0052FF',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
                padding: '6px 14px',
                lineHeight: 1.3,
                borderRadius: '100px',
              }}
            >
              {card.tag}
            </span>

            {/* Title + Description at bottom */}
            <div>
              <h4 className="text-lg sm:text-[22px] mb-2" style={{ fontWeight: 500, color: '#0A0B0D', lineHeight: 1.3 }}>
                {card.title}
              </h4>
              <p className="about-card-desc text-base sm:text-lg" style={{ fontWeight: 400, color: '#5B616E', lineHeight: 1.5, margin: 0 }}>
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
