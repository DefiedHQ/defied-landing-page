'use client';

import { useState } from 'react';
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
        background: hovered ? '#0052FF' : '#fff',
        transition: 'background 0.3s ease',
      }}
    >
      <a href="https://app.defied.bg" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-[85vw] sm:w-[600px] md:w-[734px] h-[140px] sm:h-[220px] md:h-[262px] text-lg sm:text-2xl md:text-[32px]"
          style={{
            borderRadius: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            background: hovered ? '#fff' : '#0A0B0D',
            color: hovered ? '#0052FF' : '#fff',
            fontWeight: 500,
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

  return (
    <div
      className="landing-scroll-container"
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#0A0B0D',
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
          background: '#FFFFFF',
        }}
      >
        <div className="w-full max-w-[800px] mx-auto flex flex-col flex-1 items-center justify-center px-4">
          <h1 className="leading-[1.05] tracking-tight text-center text-[32px] sm:text-[56px] md:text-[80px]" style={{ fontWeight: 400, color: '#0A0B0D' }}>
            {t('hero.title')}
          </h1>
          <p className="mt-4 sm:mt-6 text-center" style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', overflowWrap: 'break-word' }}>
            {t('hero.subtitle1')} {t('hero.subtitle2')} {t('hero.subtitle3')}
          </p>
          <div className="mt-8 sm:mt-10">
            <a
              href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ background: '#0A0B0D', border: '1px solid #0A0B0D', borderRadius: '56px', color: '#ffffff', fontSize: '16px', fontWeight: 600, height: '58px', minHeight: '56px', minWidth: '100px', padding: '16px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', userSelect: 'none' }}
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
        style={{
          height: 'calc(100dvh - var(--header-h, 72px))',
          scrollSnapAlign: 'start',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            background: '#0052FF',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="px-6 sm:px-10 lg:px-16 py-8"
            style={{
              maxWidth: '1600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
          {/* Eyebrow */}
          <p className="text-[24px] sm:text-[32px]"
                style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, margin: '0 0 40px 0', lineHeight: 1.1 }}>
            {t('imageSection.promoLabel')}
          </p>

          {/* Main heading */}
          <h2
            className="text-[28px] sm:text-[42px] md:text-[56px]"
            style={{ fontWeight: 500, color: '#fff', lineHeight: 1.1, margin: '0 0 clamp(24px, 4vw, 48px) 0', maxWidth: '800px' }}
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
              style={{ background: '#fff', color: '#0052FF', border: '1px solid #fff', borderRadius: '56px', fontSize: '16px', fontWeight: 600, height: '44px', minWidth: '100px', padding: '0 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {t('imageSection.cta1')}
            </a>
            <a
              href="/resources"
              className="inline-flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '56px', fontSize: '16px', fontWeight: 600, height: '44px', minWidth: '100px', padding: '0 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {t('imageSection.cta2')}
            </a>
          </div>
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
