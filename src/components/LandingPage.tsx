'use client';

import { useState, useRef, useEffect } from 'react';
import { FeatureCarousel } from '@/components/FeatureCarousel';
import { AboutCarousel } from '@/components/AboutCarousel';
import { ProtocolsSection } from '@/components/ProtocolsSection';
import { InfoSection } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

function CtaSection() {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      style={{
        height: 'calc(100dvh - var(--header-h, 72px))',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? 'rgb(30, 30, 232)' : '#fff',
        transition: 'background 0.3s ease',
      }}
    >
      <a href="https://app.defied.bg" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-[85vw] sm:w-[600px] md:w-[734px] h-[140px] sm:h-[220px] md:h-[262px] text-lg sm:text-2xl md:text-[32px]"
          style={{
            borderRadius: '138.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            background: hovered ? '#fff' : '#000',
            color: hovered ? '#000' : '#fff',
            fontWeight: 700,
            lineHeight: 1.1,
            transition: 'all 0.4s ease',
            userSelect: 'none',
            maxWidth: '100%',
          }}
        >
          {hovered ? t('hero.ctaHover') : t('hero.ctaMain')}
        </div>
      </a>
    </div>
  );
}

export function LandingPage() {
  const { t } = useLanguage();
  const promoRef = useRef<HTMLDivElement>(null);
  const [promoExpanded, setPromoExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setPromoExpanded(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (promoRef.current) observer.observe(promoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="landing-scroll-container"
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#000',
      }}
    >
      {/* Section 1: Hero + Protocols + Carousel */}
      <div
        style={{
          minHeight: '93vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 1rem',
          background: '#f7f7f8',
        }}
      >
        <div className="w-full max-w-[800px] mx-auto flex flex-col flex-1 items-center justify-center px-4">
          <h1 className="leading-[1.1] tracking-tight text-center text-[28px] sm:text-[52px] md:text-[72px]" style={{ fontWeight: 700, color: '#000000' }}>
            {t('hero.title')}
          </h1>
          <div className="mt-8 sm:mt-10">
            <a
              href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 hover:opacity-80 transition-opacity"
              style={{ background: '#000000', borderRadius: '28px', color: '#ffffff', fontSize: '16px', lineHeight: '24px', fontWeight: 700, textDecoration: 'none' }}
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6" style={{ marginTop: 'auto', paddingBottom: '48px' }}>
          <FeatureCarousel />
        </div>
      </div>

      {/* Section 2: About Grid */}
      <div
        className="py-10 sm:py-20"
        style={{
          scrollSnapAlign: 'start',
          background: '#fff',
        }}
      >
        <div className="w-full max-w-[1600px] mx-auto">
          <AboutCarousel />
        </div>
      </div>

      {/* Section 2.5: Protocols */}
      <div
        style={{
          height: 'calc(100dvh - var(--header-h, 72px))',
          scrollSnapAlign: 'start',
          overflow: 'hidden',
        }}
      >
        <ProtocolsSection />
      </div>

      {/* Section 3: Blue promo */}
      <div
        ref={promoRef}
        style={{
          height: 'calc(100dvh - var(--header-h, 72px))',
          scrollSnapAlign: 'start',
          background: '#fff',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            background: '#1400FF',
            width: promoExpanded ? '100%' : '90%',
            margin: '0 auto',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: 'clamp(32px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Eyebrow */}
          <p style={{ color: '#fff', fontWeight: 500, margin: '0 0 40px 0', fontSize: '32px' }}>
            {t('imageSection.promoLabel')}
          </p>

          {/* Main heading */}
          <h2
            className="text-[28px] sm:text-[42px] md:text-[56px]"
            style={{ fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 clamp(24px, 4vw, 48px) 0', maxWidth: '800px' }}
          >
            {t('imageSection.heading')}
          </h2>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://app.defied.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: '#fff', color: '#000', borderRadius: '28px', padding: '14px 32px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {t('imageSection.cta1')}
            </a>
            <a
              href="/resources"
              className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '28px', padding: '14px 32px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {t('imageSection.cta2')}
            </a>
          </div>
        </div>
      </div>

      {/* Section 4: FAQ */}
      <div
        style={{
          scrollSnapAlign: 'start',
          background: '#fff',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          minHeight: '50vh',
        }}
      >
        <InfoSection />
      </div>

      {/* Section 5: CTA */}
      <CtaSection />

      {/* Section 6: Footer */}
      <div style={{ scrollSnapAlign: 'start' }}>
        <Footer />
      </div>
    </div>
  );
}
