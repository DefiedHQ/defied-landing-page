'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Icon } from '@coinbase/cds-web/icons/Icon';
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

  const isActive = (paths: string[]) =>
    paths.some(p => p === '/' ? pathname === '/' : pathname.startsWith(p));

  return (
    <header className="header-padding" style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <HStack as="div" style={{ alignItems: 'center' }}>
        {/* Logo + mobile menu toggle */}
        <HStack as="div" style={{ flex: 1, alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="hover-fade" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
            <LogoMark size={48} />
          </Link>
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile-flex"
            style={{ alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#0A0B0D', minWidth: '44px', minHeight: '44px', cursor: 'pointer' }}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <Icon name="close" size="m" color="fgPrimary" accessibilityLabel="Close menu" />
            ) : (
              <Icon name="menu" size="m" color="fgPrimary" accessibilityLabel="Open menu" />
            )}
          </button>
          {/* Nav tabs */}
          <nav className="hide-mobile-flex" style={{ alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="header-tab"
              style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', color: '#0A0B0D' }}
            >
              <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{t('nav.howItWorks')}</Text>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('advantages')}
              className="header-tab"
              style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', color: '#0A0B0D' }}
            >
              <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{t('nav.advantages')}</Text>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq')}
              className="header-tab"
              style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', color: '#0A0B0D' }}
            >
              <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{t('nav.faq')}</Text>
            </button>
            <Link
              href="/about"
              className={`header-tab${isActive(['/about']) ? ' header-tab-active' : ''}`}
              style={{ padding: '8px 16px', borderRadius: '100px', textDecoration: 'none', color: '#0A0B0D' }}
            >
              <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{t('nav.about')}</Text>
            </Link>
            <Link
              href="/resources"
              className={`header-tab${isActive(['/resources']) ? ' header-tab-active' : ''}`}
              style={{ padding: '8px 16px', borderRadius: '100px', textDecoration: 'none', color: '#0A0B0D' }}
            >
              <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>{t('nav.resources')}</Text>
            </Link>
          </nav>
        </HStack>

        {/* Language switcher + CTA button */}
        <HStack as="div" style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
          {/* Language dropdown */}
          <div ref={langDropdownRef} className="hide-mobile-block" style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="header-icon-btn"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgb(237, 239, 242)', border: 'none', color: '#0A0B0D', width: '44px', height: '44px', cursor: 'pointer' }}
              aria-label="Language"
            >
              <Icon name="globe" size="m" dangerouslySetColor="#0A0B0D" accessibilityLabel="Language" />
            </button>
            {langDropdownOpen && (
              <Box
                as="div"
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
                  flexDirection: 'column',
                }}
              >
                <Text font="label1" as="div" color="fgMuted" style={{ marginBottom: '16px', fontSize: '16px' }}>
                  {t('nav.languageAndRegion')}
                </Text>
                <VStack as="div" style={{ margin: '0 -8px', gap: '0px' }}>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setLangDropdownOpen(false); }}
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        color: '#0A0B0D',
                        padding: '12px 16px',
                        borderRadius: '16px',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgb(247, 247, 247)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text font="headline" as="span" display="block">{l.label}</Text>
                        <Text font="body" as="span" display="block" color="fgMuted">{l.region}</Text>
                      </div>
                      {lang === l.code && (
                        <Icon name="checkmark" size="s" dangerouslySetColor="#05B169" accessibilityLabel="Selected" />
                      )}
                    </button>
                  ))}
                </VStack>
              </Box>
            )}
          </div>
          <Button
            as="a"
            href="https://app.defied.bg"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            compact
            style={{ borderRadius: '56px', minWidth: '100px', padding: '0 24px', height: '44px' }}
          >
            {t('hero.ctaHeader')}
          </Button>
        </HStack>
      </HStack>

      {/* Mobile-only collapsible menu */}
      <div
        ref={mobileMenuRef}
        className="show-mobile-block"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          overflow: 'hidden',
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
        <VStack as="nav" style={{ gap: '4px', padding: '12px 16px 8px' }}>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            style={{ padding: '10px 4px', transition: 'color 0.2s ease', textAlign: 'left', background: 'none', border: 'none', color: '#0A0B0D', cursor: 'pointer' }}
          >
            <Text font="body" as="span">{t('nav.howItWorks')}</Text>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('advantages')}
            style={{ padding: '10px 4px', transition: 'color 0.2s ease', textAlign: 'left', background: 'none', border: 'none', color: '#0A0B0D', cursor: 'pointer' }}
          >
            <Text font="body" as="span">{t('nav.advantages')}</Text>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            style={{ padding: '10px 4px', transition: 'color 0.2s ease', textAlign: 'left', background: 'none', border: 'none', color: '#0A0B0D', cursor: 'pointer' }}
          >
            <Text font="body" as="span">{t('nav.faq')}</Text>
          </button>
          {[
            { href: '/about', label: t('nav.about'), paths: ['/about'] },
            { href: '/resources', label: t('nav.resources'), paths: ['/resources'] },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '10px 4px',
                transition: 'color 0.2s ease',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: item.paths.some(p => pathname.startsWith(p)) ? 700 : 400,
              }}
            >
              <Text font="body" as="span">{item.label}</Text>
            </Link>
          ))}
          {/* Mobile language selector */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '4px', paddingTop: '8px' }}>
            <Text font="label1" as="div" style={{ padding: '4px 1px 8px' }}>
              {t('nav.languageAndRegion')}
            </Text>
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLang(l.code); setMobileMenuOpen(false); }}
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 4px',
                  transition: 'color 0.2s ease',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <Text font="label1" as="div">{l.label}</Text>
                  <Text font="caption" as="div" color="fgMuted">{l.region}</Text>
                </div>
                {lang === l.code && (
                  <Icon name="checkmark" size="s" dangerouslySetColor="#0052FF" accessibilityLabel="Selected" />
                )}
              </button>
            ))}
          </div>
        </VStack>
      </div>
    </header>
  );
}
