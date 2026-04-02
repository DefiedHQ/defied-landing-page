'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function AboutCarousel() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) setHasDragged(true);
    el.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
    }
  }, [hasDragged]);

  const cards = [
    {
      tag: t('aboutCarousel.card1Tag'),
      title: t('aboutCarousel.card1Title'),
      desc: t('aboutCarousel.card1Desc'),
      href: '/about',
      cta: t('aboutCarousel.learnMore'),
      hoverClass: 'about-card-1',
    },
    {
      tag: t('aboutCarousel.card2Tag'),
      title: t('aboutCarousel.card2Title'),
      desc: t('aboutCarousel.card2Desc'),
      href: '/about',
      cta: t('aboutCarousel.learnMore'),
      hoverClass: 'about-card-2',
    },
    {
      tag: t('aboutCarousel.card3Tag'),
      title: t('aboutCarousel.card3Title'),
      desc: t('aboutCarousel.card3Desc'),
      href: '/about',
      cta: t('aboutCarousel.learnMore'),
      hoverClass: 'about-card-3',
    },
    {
      tag: t('aboutCarousel.card4Tag'),
      title: t('aboutCarousel.card4Title'),
      desc: t('aboutCarousel.card4Desc'),
      href: '/about',
      cta: t('aboutCarousel.learnMore'),
      hoverClass: 'about-card-4',
    },
  ];

  return (
    <div>
      {/* Centered title */}
      <h2
        className="text-[24px] sm:text-[36px] md:text-[48px] mb-8 sm:mb-[70px] pl-4 sm:pl-10"
        style={{ fontWeight: 700, color: '#000', lineHeight: 1.1, textAlign: 'left' }}
      >
        {t('aboutCarousel.title')}
      </h2>

      {/* Mobile: vertical stack / Desktop: horizontal scroll */}
      <div
        ref={scrollRef}
        className="about-carousel-scroll flex-col sm:flex-row gap-4 sm:gap-20 px-4 sm:pl-10 sm:pr-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: 'flex',
          overflowX: 'auto',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            onClick={handleClick}
            draggable={false}
            className={`about-card ${card.hoverClass} sm:shrink-0 w-full sm:w-[640px] h-[420px] sm:h-[540px] p-6 sm:p-14 gap-6 sm:gap-0`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              textDecoration: 'none',
              scrollSnapAlign: 'start',
            }}
          >
            {/* Top: Tag + Title + Description */}
            <div className="flex-1">
              <span
                style={{
                  display: 'inline-block',
                  background: '#000',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '6px 12px',
                  lineHeight: 1.3,
                }}
              >
                {card.tag}
              </span>

              <h4 className="text-lg sm:text-2xl mt-4 sm:mt-7 mb-1" style={{ fontWeight: 700, color: '#000', lineHeight: 1.3 }}>
                {card.title}
              </h4>
              <p className="about-card-desc text-base sm:text-2xl" style={{ fontWeight: 600, color: 'rgb(118, 119, 122)', lineHeight: 1.4 }}>
                {card.desc}
              </p>
            </div>

            {/* CTA button */}
            <span
              className="about-card-btn"
              style={{
                alignSelf: 'flex-start',
                fontSize: '16px',
                fontWeight: 700,
                padding: '12px 24px',
                borderRadius: '28px',
                lineHeight: '24px',
                height: 56,
                minWidth: 148,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {card.cta}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
