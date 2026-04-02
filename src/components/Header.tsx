'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { LogoMark } from '@/components/LogoMark';
import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

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
    <header className="relative w-full px-4 sm:px-6 py-3 sm:py-4 max-w-[1600px] mx-auto">
      <div className="flex items-center">
        {/* Logo + mobile menu toggle */}
        <div className="flex-1 flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogoMark size={36} />
            <span className="tracking-tight hidden sm:inline" style={{ fontWeight: 700, fontSize: '36px', color: '#000000' }}>
              defied
            </span>
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
        </div>

        {/* Center nav tabs */}
        <div className="hidden sm:flex items-center gap-1" style={{ color: 'rgb(20, 20, 23)', fontSize: '16px', fontWeight: 500 }}>
          <Link href="/about" className={tabClass(['/about'])} style={{ borderRadius: '24px' }}>
            {t('nav.about')}
          </Link>
          <Link href="/resources" className={tabClass(['/resources'])} style={{ borderRadius: '24px' }}>
            {t('nav.resources')}
          </Link>
          {pathname === '/' && (
            <button
              onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-4 py-2 transition-colors hover:bg-[#0F0F660D]"
              style={{ borderRadius: '24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 500, color: 'rgb(20, 20, 23)' }}
            >
              {t('nav.faq')}
            </button>
          )}
        </div>

        {/* CTA button — right */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <a
            href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ background: '#000000', borderRadius: '28px', color: '#ffffff', fontSize: '16px', lineHeight: '24px', fontWeight: 700, padding: '10px 24px', textDecoration: 'none' }}
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
          background: '#f7f7f8',
          boxShadow: mobileMenuOpen ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
          maxHeight: mobileMenuOpen ? '300px' : '0',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s ease',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col gap-1 px-4 pt-3 pb-2" style={{ color: 'rgb(20, 20, 23)', fontSize: '18px', fontWeight: 500 }}>
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
          {pathname === '/' && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="py-2.5 px-1 text-left transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 500, color: 'rgb(20, 20, 23)' }}
            >
              {t('nav.faq')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
