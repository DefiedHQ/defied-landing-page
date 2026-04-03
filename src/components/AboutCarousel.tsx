'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function EasyAccessIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const CARD_ICONS = [EasyAccessIcon, ShieldIcon, TrendingUpIcon, ZapIcon];

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
        {cards.map((card, i) => {
          const Icon = CARD_ICONS[i];
          return (
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
              {/* Icon at top */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'rgba(0, 82, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon />
              </div>

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
          );
        })}
      </div>
    </div>
  );
}
