'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { HStack } from '@coinbase/cds-web/layout/HStack';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { LogoMark } from '@/components/LogoMark';
import { AnimatedButtonText } from '@/components/AnimatedButtonText';
import { useLanguage } from '@/context/LanguageContext';
import { stripLangPrefix } from '@/lib/i18n';
import { HERO_ID } from '@/components/HeroStatic';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const { t, localePath } = useLanguage();

  // Scroll-aware CTA: a quiet "Sign in" while the hero (which owns the one
  // blue CTA per viewport) is on screen; the primary "Create your wallet now"
  // once the hero has scrolled out. Pages without a hero keep "Sign in".
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) {
      setPastHero(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);
    if (stripLangPrefix(pathname) === '/') {
      const el = document.getElementById(sectionId);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(localePath(`/#${sectionId}`));
    }
  }, [pathname, router, localePath]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node) &&
        mobileToggleRef.current && !mobileToggleRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const isActive = (paths: string[]) => {
    const neutral = stripLangPrefix(pathname);
    return paths.some(p => p === '/' ? neutral === '/' : neutral.startsWith(p));
  };

  return (
    <header className="header-padding" style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <HStack as="div" style={{ alignItems: 'center', position: 'relative' }}>
        {/* Logo */}
        <Link href={localePath('/')} className="hover-fade" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
          <LogoMark size={48} />
        </Link>

        {/* Centered nav tabs */}
        <nav className="hide-mobile-flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="header-tab"
            style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}
          >
            <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>{t('nav.features')}</Text>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="header-tab"
            style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}
          >
            <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>{t('nav.howItWorks')}</Text>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="header-tab"
            style={{ padding: '8px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}
          >
            <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>{t('nav.faq')}</Text>
          </button>
          <Link
            href={localePath('/blog')}
            className={`header-tab${isActive(['/blog']) ? ' header-tab-active' : ''}`}
            style={{ padding: '8px 16px', borderRadius: '100px', textDecoration: 'none', color: 'var(--ink)' }}
          >
            <Text as="span" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500 }}>{t('nav.resources')}</Text>
          </Link>
        </nav>

        {/* Header CTA */}
        <HStack as="div" style={{ marginLeft: 'auto', alignItems: 'center', gap: '12px' }}>
          {/* Quiet secondary — the hero owns the one blue CTA per viewport
              (design review, Phase 2) */}
          <Button
            as="a"
            href="https://wallet.defied.money"
            target="_blank"
            rel="noopener noreferrer"
            variant={pastHero ? 'primary' : 'secondary'}
            compact
            className="btn-fw-500 header-cta"
            style={{ borderRadius: '56px', minWidth: pastHero ? '217px' : '100px', padding: '0 24px', height: '44px' }}
          >
            {/* Label cross-fades (out, then in) while the pill's colour and
                width ease over the same window - see .header-cta */}
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={pastHero ? 'cta' : 'signin'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                /* Each label carries its own colour: AnimatePresence freezes the
                   exiting span's props, so the old label fades out in its own
                   ink instead of snapping to white against the still-light pill */
                style={{ display: 'inline-flex', color: pastHero ? '#FFFFFF' : 'var(--ink)' }}
              >
                <AnimatedButtonText>{pastHero ? t('hero.earlyAccess') : t('hero.ctaHeader')}</AnimatedButtonText>
              </m.span>
            </AnimatePresence>
          </Button>
          {/* Mobile menu toggle sits at the right edge, in thumb reach and
              where the convention puts it (design review, Phase 3) */}
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile-flex"
            style={{ alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--ink)', minWidth: '44px', minHeight: '44px', marginRight: '-8px', cursor: 'pointer' }}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <Icon name="close" size="m" dangerouslySetColor="#14161A" accessibilityLabel="Close menu" />
            ) : (
              <Icon name="hamburger" size="m" dangerouslySetColor="#14161A" accessibilityLabel="Open menu" />
            )}
          </button>
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
            onClick={() => scrollToSection('features')}
            style={{ padding: '10px 4px', transition: 'color 0.2s ease', textAlign: 'left', background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer' }}
          >
            <Text font="body" as="span">{t('nav.features')}</Text>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            style={{ padding: '10px 4px', transition: 'color 0.2s ease', textAlign: 'left', background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer' }}
          >
            <Text font="body" as="span">{t('nav.howItWorks')}</Text>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            style={{ padding: '10px 4px', transition: 'color 0.2s ease', textAlign: 'left', background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer' }}
          >
            <Text font="body" as="span">{t('nav.faq')}</Text>
          </button>
          {[
            { href: localePath('/blog'), label: t('nav.resources'), paths: ['/blog'] },
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
                fontWeight: item.paths.some(p => stripLangPrefix(pathname).startsWith(p)) ? 600 : 400,
              }}
            >
              <Text font="body" as="span">{item.label}</Text>
            </Link>
          ))}
        </VStack>
      </div>
    </header>
  );
}
