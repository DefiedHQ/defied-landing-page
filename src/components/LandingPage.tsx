'use client';

import { useEffect } from 'react';
import { AboutCarousel } from '@/components/AboutCarousel';
import { ProtocolsSection } from '@/components/ProtocolsSection';
import { InfoSection } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export function LandingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div
      className="landing-scroll-container"
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'scroll',
        background: '#FFFFFF',
      }}
    >
      {/* Section 1: Hero */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1rem',
          background: '#FFFFFF',
        }}
      >
        {/* Centered text + CTA */}
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center text-center pt-16 sm:pt-24 md:pt-32 px-4">
          <h1
            className="text-[64px] leading-[68px] md:text-[96px] md:leading-[100px]"
            style={{
              fontFamily: 'CoinbaseDisplay, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 400,
              color: '#000',
              letterSpacing: '-0.02em',
            }}
          >
            {t('hero.title')}
          </h1>
          <p
            className="mt-4 sm:mt-6 text-[15px] sm:text-[16px] md:text-[18px]"
            style={{
              fontFamily: 'CoinbaseText, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 400,
              lineHeight: '26px',
              color: 'rgb(10, 11, 13)',
              overflowWrap: 'break-word',
            }}
          >
            {t('hero.subtitle1')} {t('hero.subtitle2')} {t('hero.subtitle3')}
          </p>
          <div className="mt-8 w-full md:w-auto">
            <a
              href="https://app.defied.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn hover:opacity-80 transition-opacity w-full md:w-auto"
              style={{
                background: '#0052FF',
                border: '1px solid #0052FF',
                borderRadius: '56px',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 600,
                height: '58px',
                lineHeight: '18.4px',
                minWidth: '100px',
                padding: '16px 32px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
              }}
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
        {/* Hero image below */}
        <div className="w-full max-w-[745px] mx-auto mt-12 sm:mt-16 px-4">
          <img
            src="/hero_app_white.png"
            alt="DeFied App"
            style={{
              width: '745px',
              maxWidth: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '56px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Section 2: About Grid */}
      <div
        id="how-it-works"
        style={{
          background: '#fff',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto">
          <AboutCarousel />
        </div>
      </div>

      {/* Section 3: Protocols */}
      <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <ProtocolsSection />
      </div>

      {/* Section 4: Blue promo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1rem',
        }}
      >
        <div
          style={{
            background: '#0052FF',
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20"
            style={{
              maxWidth: '1200px',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '400px',
            }}
          >
          {/* Main heading */}
          <h2
            className="text-[28px] sm:text-[42px] md:text-[56px]"
            style={{ fontWeight: 500, color: '#fff', lineHeight: 1.1, maxWidth: '800px' }}
          >
            {t('imageSection.heading')}
          </h2>
          </div>
        </div>
      </div>

      {/* Section 5: FAQ */}
      <div
        id="faq"
        style={{
          background: '#fff',
          paddingTop: '100px',
          paddingBottom: '48px',
        }}
      >
        <InfoSection />
      </div>

      {/* Section 6: Footer */}
      <Footer />
    </div>
  );
}
