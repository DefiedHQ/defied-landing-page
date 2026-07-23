'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { geoLangFromCountry, localePath, LANG_PREF_KEY } from '@/lib/i18n';

/**
 * Suggests the Bulgarian site to Bulgarian visitors landing on English pages.
 *
 * Rendered only in the English root layout. On mount it checks the visitor's
 * explicit language choice (set by the header switcher); with no choice made
 * it falls back to geolocation via the tiny dynamic /api/geo route (the pages
 * themselves stay fully static). Bulgarian visitors are client-side
 * redirected to the /bg mirror of the current page.
 *
 * Deliberately client-side and never forced at the server/edge: search
 * engine crawlers (which mostly fetch without geo-matching JS effects and
 * crawl from US IPs) must be able to reach both language versions — hreflang
 * annotations, not redirects, tell them which is which.
 */
export function LanguageGeoInit() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const goBg = () => router.replace(localePath('bg', pathname));

    let pref: string | null = null;
    try {
      pref = localStorage.getItem(LANG_PREF_KEY);
    } catch {
      // Storage unavailable → treat as no preference.
    }
    if (pref === 'en') return;
    if (pref === 'bg') {
      goBg();
      return;
    }

    let cancelled = false;
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && geoLangFromCountry(data.country) === 'bg') goBg();
      })
      .catch(() => {
        // Network failure → stay on English.
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
