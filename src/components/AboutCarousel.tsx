'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

{/* Coinbase-style filled icons — matching data-icon-name equivalents */}
function BrowserIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="#0A0B0D">
      <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm0 2h16v2H2V6zm0 4h16v8H4v-8z" />
      <path d="M4 4h16a2 2 0 0 1 2 2v2H2V6a2 2 0 0 1 2-2z" />
      <rect x="2" y="8" width="20" height="12" rx="0" />
      <rect x="2" y="4" width="20" height="4" rx="2" fill="#0A0B0D" />
      <circle cx="5" cy="6" r="0.75" fill="#fff" />
      <circle cx="7.5" cy="6" r="0.75" fill="#fff" />
      <circle cx="10" cy="6" r="0.75" fill="#fff" />
      <rect x="2" y="8" width="20" height="12" rx="0" ry="0" fill="#0A0B0D" />
      <rect x="4" y="10" width="16" height="8" rx="1" fill="#fff" opacity="0.15" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="#0A0B0D">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 14.59l-3.54-3.54 1.41-1.41 2.13 2.12 4.24-4.24 1.41 1.42L10.5 15.59z" />
    </svg>
  );
}

function PercentageIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="#0A0B0D">
      <path d="M7.5 4C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4zm0 5C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm9 4c-1.93 0-3.5 1.57-3.5 3.5S14.57 20 16.5 20s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.41 20L4 18.59 18.59 4 20 5.41 5.41 20z" />
    </svg>
  );
}

function PaymentCardIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="#0A0B0D">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </svg>
  );
}

const CARD_ICONS = [BrowserIcon, ShieldIcon, PercentageIcon, PaymentCardIcon];

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
            </Link>
          );
        })}
      </div>
    </div>
  );
}
