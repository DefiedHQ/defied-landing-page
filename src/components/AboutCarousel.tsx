'use client';

import { useLanguage } from '@/context/LanguageContext';

const darkColor = '#0052FF';
const lightColor = 'rgba(0, 82, 255, 0.3)';

function GearIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={lightColor} />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill={darkColor} />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke={darkColor} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={lightColor} />
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={darkColor} strokeWidth="1.5" fill="none" />
      <path d="m9 12 2 2 4-4" stroke={darkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="20" height="18" rx="3" fill={lightColor} />
      <polyline points="7 15 10.5 10.5 13.5 13 17 8" stroke={darkColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="8" r="1.5" fill={darkColor} />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="4" width="22" height="16" rx="3" fill={lightColor} />
      <rect x="1" y="4" width="22" height="5" rx="0" fill={darkColor} />
      <rect x="1" y="4" width="22" height="16" rx="3" stroke={darkColor} strokeWidth="1.5" fill="none" />
      <rect x="4" y="14" width="6" height="2" rx="1" fill={darkColor} />
    </svg>
  );
}

const CARD_ICONS = [GearIcon, ShieldIcon, ChartIcon, CardIcon];

export function AboutCarousel() {
  const { t } = useLanguage();

  const cards = [
    {
      tag: t('aboutCarousel.card1Tag'),
      title: t('aboutCarousel.card1Title'),
      desc: t('aboutCarousel.card1Desc'),
    },
    {
      tag: t('aboutCarousel.card2Tag'),
      title: t('aboutCarousel.card2Title'),
      desc: t('aboutCarousel.card2Desc'),
    },
    {
      tag: t('aboutCarousel.card3Tag'),
      title: t('aboutCarousel.card3Title'),
      desc: t('aboutCarousel.card3Desc'),
    },
    {
      tag: t('aboutCarousel.card4Tag'),
      title: t('aboutCarousel.card4Title'),
      desc: t('aboutCarousel.card4Desc'),
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
            <div
              key={i}
              className="about-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(24px, 4vw, 40px)',
                minHeight: '320px',
              }}
            >
              {/* Icon at top */}
              <div style={{ width: 48, height: 48 }}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
