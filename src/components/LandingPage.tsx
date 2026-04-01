'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      <Link href="/earn" style={{ textDecoration: 'none' }}>
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
      </Link>
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
            <Link
              href="/earn"
              className="inline-block px-8 py-3.5 hover:opacity-80 transition-opacity"
              style={{ background: '#000000', borderRadius: '28px', color: '#ffffff', fontSize: '16px', lineHeight: '24px', fontWeight: 700 }}
            >
              {t('hero.cta')}
            </Link>
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
          scrollSnapAlign: 'start',
        }}
      >
        <ProtocolsSection />
      </div>

      {/* Section 3: Full-bleed hero image with breathing room */}
      <div
        style={{
          height: 'calc(100dvh - var(--header-h, 72px))',
          scrollSnapAlign: 'start',
        }}
      >
        <div
          style={{
            height: '100%',
            position: 'relative',
            backgroundImage: 'url(/hero-car.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)' }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-between py-8 sm:py-[60px]"
            >
              {/* Top-right text block */}
              <div className="self-end max-w-full sm:max-w-[520px] text-left">
                <h2 className="text-xl sm:text-2xl md:text-[32px]" style={{ fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
                  {t('imageSection.heading')}
                </h2>
                <p className="text-lg sm:text-2xl md:text-[32px]" style={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.3, fontWeight: 500 }}>
                  {t('imageSection.subtext1')}<br />{t('imageSection.subtext2')}<br />{t('imageSection.subtext3')}
                </p>
              </div>

              {/* Bottom feature items */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-[clamp(32px,6vw,80px)]" style={{ alignItems: 'flex-end', justifyContent: 'center', width: '100%' }}>
                {(['imageSection.feature1', 'imageSection.feature2', 'imageSection.feature3'] as const).map((key) => (
                  <div key={key}>
                    <p className="text-2xl sm:text-4xl md:text-[48px]" style={{ fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0 }}>
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
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
