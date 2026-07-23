'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { geoLangFromCountry } from '@/lib/i18n';

/**
 * Applies the geolocation-derived default language on mount.
 *
 * The pages are fully static, so the visitor's country is fetched from the
 * tiny dynamic /api/geo route instead of being read in the layout (which
 * would force every route to render dynamically). SSR and the first client
 * render use the default language to avoid a hydration mismatch; geolocation
 * always wins on load, so a returning visitor's language tracks their
 * current country. Within a session the manual language switcher still takes
 * effect until the next reload.
 */
export function LanguageGeoInit() {
  const { setLang } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setLang(geoLangFromCountry(data.country));
      })
      .catch(() => {
        // Network failure → stay on the default language.
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
