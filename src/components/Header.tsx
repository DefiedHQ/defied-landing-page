'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { LogoMark } from '@/components/LogoMark';
import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

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
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const tabClass = (paths: string[]) => {
    const isActive = paths.some(p => p === '/' ? pathname === '/' : pathname.startsWith(p));
    return `px-4 py-2 transition-colors ${
      isActive ? 'bg-[#0F0F660D]' : 'hover:bg-[#0F0F660D]'
    }`;
  };

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
            className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 hover:opacity-80 transition-opacity"
            style={{ background: '#0F0F660D', borderRadius: '20px', color: 'rgb(20, 20, 23)', fontSize: '14px', fontWeight: 600, border: 'none' }}
          >
            {t('nav.goTo') || 'Go to...'}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: mobileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Nav tabs */}
          <div className="hidden sm:flex items-center gap-1" style={{ color: '#0A0B0D', fontSize: '16px', fontWeight: 600 }}>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="px-4 py-2 transition-colors hover:bg-[#0F0F660D]"
              style={{ borderRadius: '24px', background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
            >
              {t('nav.howItWorks')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="px-4 py-2 transition-colors hover:bg-[#0F0F660D]"
              style={{ borderRadius: '24px', background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
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

        {/* CTA button — right */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <a
            href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
            className="btn hover:opacity-80 transition-opacity"
            style={{ background: '#0052FF', border: '1px solid #0052FF', borderRadius: '56px', color: '#ffffff', fontSize: '16px', fontWeight: 600, height: '44px', minWidth: '100px', padding: '0 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {t('hero.cta')}
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
          maxHeight: mobileMenuOpen ? '300px' : '0',
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
            style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
          >
            {t('nav.howItWorks')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="py-2.5 px-1 transition-colors text-left"
            style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
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
        </div>
      </div>
    </header>
  );
}
