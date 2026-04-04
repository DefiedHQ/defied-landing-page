'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { LogoMark } from '@/components/LogoMark';
import { useLanguage } from '@/context/LanguageContext';

const languages = [
  { code: 'bg' as const, label: 'Български', region: 'България' },
  { code: 'en' as const, label: 'English', region: 'Global' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang } = useLanguage();

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  }, [pathname, router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node) &&
        mobileToggleRef.current && !mobileToggleRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
      if (
        langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const tabClass = (paths: string[]) => {
    const isActive = paths.some(p => p === '/' ? pathname === '/' : pathname.startsWith(p));
    return `px-4 py-2 transition-colors ${
      isActive ? 'bg-[#0F0F660D]' : 'hover:bg-[#0F0F660D]'
    }`;
  };

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="relative w-full px-4 sm:px-6 py-3 sm:py-4 max-w-[1200px] mx-auto">
      <div className="flex items-center">
        {/* Logo + mobile menu toggle */}
        <div className="flex-1 flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogoMark size={48} />
          </Link>
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ background: 'none', border: 'none', color: 'rgb(10, 11, 13)', minWidth: '44px', minHeight: '44px' }}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
              </svg>
            )}
          </button>
          {/* Nav tabs */}
          <div className="hidden sm:flex items-center gap-1" style={{ color: '#0A0B0D', fontSize: '16px', fontWeight: 600 }}>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className={tabClass([])}
              style={{ borderRadius: '24px', fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
            >
              {t('nav.howItWorks')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className={tabClass([])}
              style={{ borderRadius: '24px', fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
            >
              {t('nav.faq')}
            </button>
            <Link href="/about" className={tabClass(['/about'])} style={{ borderRadius: '24px' }}>
              {t('nav.about')}
            </Link>
            <Link href="/resources" className={tabClass(['/resources'])} style={{ borderRadius: '24px' }}>
              {t('nav.resources')}
            </Link>
          </div>
        </div>

        {/* Language switcher + CTA button — right */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {/* Language dropdown */}
          <div ref={langDropdownRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{ borderRadius: '50%', background: 'rgb(237, 239, 242)', border: 'none', color: '#0A0B0D', width: '44px', height: '44px' }}
              aria-label="Language"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  padding: '24px',
                  minWidth: '280px',
                  zIndex: 200,
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgb(91, 97, 110)', marginBottom: '16px' }}>
                  {t('nav.languageAndRegion')}
                </div>
                <div className="flex flex-col" style={{ margin: '0 -8px' }}>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setLangDropdownOpen(false); }}
                      className="w-full flex items-center justify-between text-left"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0A0B0D',
                        fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        padding: '12px 16px',
                        borderRadius: '16px',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgb(247, 247, 247)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                    >
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: '22px' }}>{l.label}</div>
                        <div style={{ fontSize: '16px', fontWeight: 400, color: '#8A919E', lineHeight: '22px' }}>{l.region}</div>
                      </div>
                      {lang === l.code && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05B169" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a
            href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
            className="btn hover:opacity-80 transition-opacity"
            style={{ background: '#0052FF', border: '1px solid #0052FF', borderRadius: '56px', color: '#ffffff', fontSize: '16px', fontWeight: 600, height: '44px', minWidth: '100px', padding: '0 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {t('hero.ctaHeader')}
          </a>
        </div>
      </div>

      {/* Mobile-only collapsible menu — absolute overlay */}
      <div
        ref={mobileMenuRef}
        className="sm:hidden absolute left-0 right-0 overflow-hidden"
        style={{
          top: '100%',
          zIndex: 100,
          background: '#FFFFFF',
          boxShadow: mobileMenuOpen ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
          maxHeight: mobileMenuOpen ? '400px' : '0',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s ease',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col gap-1 px-4 pt-3 pb-2" style={{ color: '#0A0B0D', fontSize: '18px', fontWeight: 400 }}>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="py-2.5 px-1 transition-colors text-left"
            style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
          >
            {t('nav.howItWorks')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="py-2.5 px-1 transition-colors text-left"
            style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' }}
          >
            {t('nav.faq')}
          </button>
          {[
            { href: '/about', label: t('nav.about'), paths: ['/about'] },
            { href: '/resources', label: t('nav.resources'), paths: ['/resources'] },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-2.5 px-1 transition-colors ${
                item.paths.some(p => pathname.startsWith(p)) ? 'font-bold' : ''
              }`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile language selector */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '4px', paddingTop: '8px' }}>
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#0A0B0D', padding: '4px 1px 8px' }}>
              {t('nav.languageAndRegion')}
            </div>
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLang(l.code); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between py-2.5 px-1 transition-colors text-left"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>{l.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 400, color: '#5B616E', lineHeight: '18px' }}>{l.region}</div>
                </div>
                {lang === l.code && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
