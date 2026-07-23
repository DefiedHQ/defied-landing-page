'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';

// Move curve — directional slide between cards (see ui-animation guidance)
const MOVE_EASE = [0.25, 1, 0.5, 1] as const;
const AUTO_ADVANCE_MS = 5000;

export function HeroCarousel() {
  const { t } = useLanguage();
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const slides = [
    {
      key: 'balloon',
      title: `${t('hero.titleStart')} ${t('hero.titleHighlight')} ${t('hero.titleEnd')}`,
      subtitle: t('hero.cardSubtitle'),
      footnote: true,
      image: '/hero-balloon.jpg',
      imagePosition: '100% 55%',
      imagePositionMobile: '62% 50%',
    },
    {
      key: 'travel',
      title: t('hero.slide2Title'),
      subtitle: t('hero.slide2Subtitle'),
      footnote: false,
      image: '/hero-travel.jpg',
      imagePosition: '75% 35%',
      imagePositionMobile: '75% 30%',
    },
    {
      key: 'earn',
      title: t('hero.slide3Title'),
      subtitle: t('hero.slide3Subtitle'),
      footnote: true,
      image: '/hero-earn.jpg',
      imagePosition: '70% 40%',
      imagePositionMobile: '68% 45%',
    },
  ];

  const count = slides.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      setIndexState([((next % count) + count) % count, dir]);
    },
    [count]
  );

  // Auto-advance — pauses on hover/focus/drag (WCAG 2.2.2), disabled under
  // prefers-reduced-motion. Re-arms on index change, so manual navigation
  // resets the timer.
  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => goTo(index + 1, 1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, paused, reducedMotion, goTo]);

  const slide = slides[index];

  const variants = reducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ x: dir > 0 ? '6%' : '-6%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? '-6%' : '6%', opacity: 0 }),
      };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t('hero.carouselLabel')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-carousel-viewport">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <m.div
            key={slide.key}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [...MOVE_EASE] }}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setPaused(true)}
            onDragEnd={(_, info) => {
              if (info.offset.x < -64 || info.velocity.x < -400) goTo(index + 1, 1);
              else if (info.offset.x > 64 || info.velocity.x > 400) goTo(index - 1, -1);
            }}
            style={{ cursor: 'grab', width: '100%' }}
          >
            <div className="hero-card">
              {/* Photo backdrop — decorative, the headline carries the message */}
              <div className="hero-card-photo" aria-hidden="true">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1248px) 100vw, 1200px"
                  style={
                    {
                      '--op-desktop': slide.imagePosition,
                      '--op-mobile': slide.imagePositionMobile,
                    } as React.CSSProperties
                  }
                />
                <div className="hero-card-scrim" />
              </div>

              <div className="hero-card-content">
                {/* h1 belongs to the anchor slide; rotating slides are h2 */}
                <Text
                  font="display1"
                  as={index === 0 ? 'h1' : 'h2'}
                  display="block"
                  className="title-tight-lh"
                  style={{
                    fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {slide.title}
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
                  {slide.subtitle}
                  {slide.footnote && <sup style={{ fontSize: '0.6em' }}>1</sup>}
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
          </m.div>
        </AnimatePresence>
      </div>

      {/* Dots — elongated active pill */}
      <div className="hero-carousel-dots">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`hero-carousel-dot${i === index ? ' hero-carousel-dot--active' : ''}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={t('hero.goToSlide', { n: String(i + 1) })}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
