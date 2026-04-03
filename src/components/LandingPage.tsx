'use client';

import { AboutCarousel } from '@/components/AboutCarousel';
import { ProtocolsSection } from '@/components/ProtocolsSection';
import { InfoSection } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export function LandingPage() {
  const { t } = useLanguage();

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
      {/* Section 1: Hero + Carousel */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 1rem',
        }}
      >
        <div className="w-full max-w-[800px] mx-auto flex flex-col flex-1 items-center justify-center px-4">
          <h1 className="leading-[1.05] tracking-tight text-center text-[32px] sm:text-[56px] md:text-[96px]" style={{ display: 'block', fontFamily: 'CoinbaseDisplay, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, color: 'rgb(10, 11, 13)' }}>
            {t('hero.title')}
          </h1>
          <p className="mt-4 sm:mt-6 text-center" style={{ display: 'block', fontFamily: 'CoinbaseText, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: 'rgb(10, 11, 13)', overflowWrap: 'break-word' }}>
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
      </div>

      {/* Section 2: About Grid */}
      <div
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
