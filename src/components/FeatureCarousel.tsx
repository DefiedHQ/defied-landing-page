'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const INTERVAL_MS = 4000;

export function FeatureCarousel() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const STEPS = [
    { title: t('carousel.step1Title'), desc: t('carousel.step1Desc') },
    { title: t('carousel.step2Title'), desc: t('carousel.step2Desc') },
    { title: t('carousel.step3Title'), desc: t('carousel.step3Desc') },
  ];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % STEPS.length);
    }, INTERVAL_MS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleStep = (i: number) => {
    setActive(i);
    startTimer();
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
      {/* Left: fixed-height container so layout never shifts */}
      <div className="sm:h-[128px] flex flex-col justify-start min-w-0 max-w-full sm:max-w-[60%]">
        <p className="text-base sm:text-2xl md:text-[32px]" style={{ fontWeight: 700, color: '#000', lineHeight: 1.2, marginBottom: '6px' }}>
          {STEPS[active].title}
        </p>
        <p
          className="text-base sm:text-2xl md:text-[32px]"
          style={{
            fontWeight: 500,
            color: 'rgb(180, 180, 180)',
            lineHeight: 1.3,
          }}
        >
          {STEPS[active].desc}
        </p>
      </div>

      {/* Right: step numbers + button */}
      <div className="flex items-center gap-4 sm:gap-5 shrink-0">
        {STEPS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleStep(i)}
            className="text-xl sm:text-2xl md:text-[32px]"
            style={{
              fontWeight: active === i ? 700 : 600,
              color: active === i ? '#000' : 'rgb(180, 180, 180)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.3s',
            }}
          >
            0{i + 1}
          </button>
        ))}
        <Link
          href="/earn"
          className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 hover:opacity-80 transition-opacity"
          style={{
            background: '#000000',
            borderRadius: '28px',
            color: '#ffffff',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {t('carousel.cta')}
        </Link>
      </div>
    </div>
  );
}
