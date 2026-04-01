'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { useAccount } from 'wagmi';
import { useState, useRef, useEffect } from 'react';
import { LogoMark } from '@/components/LogoMark';
import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const pathname = usePathname();
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { address } = useAccount();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const { lang, setLang, t } = useLanguage();

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

  const displayLabel = user?.email?.address
    ?? (address ? `${address.slice(0, 6)}…${address.slice(-4)}` : t('nav.connected'));

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
          <Link href="/earn" className={tabClass(['/earn'])} style={{ borderRadius: '24px' }}>
            {t('nav.earn')}
          </Link>
          <Link href="/trade" className={tabClass(['/trade'])} style={{ borderRadius: '24px' }}>
            {t('nav.trade')}
          </Link>
          <Link href="/resources" className={tabClass(['/resources'])} style={{ borderRadius: '24px' }}>
            {t('nav.resources')}
          </Link>
          <Link href="/about" className={tabClass(['/about'])} style={{ borderRadius: '24px' }}>
            {t('nav.about')}
          </Link>
        </div>

        {/* Auth button + lang switcher — right third */}
        <div className="flex-1 flex justify-end items-center gap-3">
          {/* Language switcher — hidden for now, Bulgarian is the default */}
          {/* <div className="flex items-center gap-1" style={{ fontSize: '14px', fontWeight: 600 }}>
            <button
              type="button"
              onClick={() => setLang('bg')}
              className="px-2 py-1 hover:opacity-80 transition-opacity"
              style={{
                color: lang === 'bg' ? '#000' : 'rgb(180,180,180)',
                fontWeight: lang === 'bg' ? 700 : 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              BG
            </button>
            <span style={{ color: 'rgb(180,180,180)' }}>/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className="px-2 py-1 hover:opacity-80 transition-opacity"
              style={{
                color: lang === 'en' ? '#000' : 'rgb(180,180,180)',
                fontWeight: lang === 'en' ? 700 : 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              EN
            </button>
          </div> */}

          {ready && (
            authenticated ? (
              <div ref={dropdownRef} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <button
                  type="button"
                  className="flex items-center px-4 py-2 bg-[#0F0F660D] hover:opacity-80 transition-opacity"
                  style={{ borderRadius: '24px', color: 'rgb(20, 20, 23)', fontSize: '16px', fontWeight: 500 }}
                >
                  <span className="hidden sm:inline">{displayLabel}</span>
                  <span className="sm:hidden">{address ? `${address.slice(0, 4)}…${address.slice(-3)}` : t('nav.connected')}</span>
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0"
                    style={{ background: '#fff', minWidth: '200px', zIndex: 50, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', paddingTop: '8px' }}
                  >
                    {[
                      { type: 'link', href: '/account', label: t('nav.profile') },
                      { type: 'action', label: t('nav.logout'), onClick: () => { logout(); setDropdownOpen(false); } },
                    ].map((item) => {
                      const baseStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', width: '100%', cursor: 'pointer', fontSize: '16px', fontWeight: 500 };
                      const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = '#1E1EE8'; };
                      const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = 'black'; };
                      return item.type === 'link' ? (
                        <Link
                          key={item.label}
                          href={(item as { href: string }).href}
                          onClick={() => setDropdownOpen(false)}
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}
                          style={{ ...baseStyle, textDecoration: 'none', color: 'black' }}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          type="button"
                          onClick={(item as { onClick: () => void }).onClick}
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}
                          style={{ ...baseStyle, color: 'black', background: 'none', border: 'none' }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={login}
                className="hover:opacity-80 transition-opacity"
                style={{ background: '#000000', borderRadius: '28px', color: '#ffffff', fontSize: '16px', lineHeight: '24px', fontWeight: 700, padding: '10px 24px' }}
              >
                {t('nav.login')}
              </button>
            )
          )}
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
            { href: '/earn', label: t('nav.earn'), paths: ['/earn'] },
            { href: '/trade', label: t('nav.trade'), paths: ['/trade'] },
            { href: '/resources', label: t('nav.resources'), paths: ['/resources'] },
            { href: '/about', label: t('nav.about'), paths: ['/about'] },
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
