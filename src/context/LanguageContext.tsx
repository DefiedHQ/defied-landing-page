'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import bg from '@/locales/bg.json';
import en from '@/locales/en.json';
import { DEFAULT_LANG, type Lang } from '@/lib/i18n';

export { LANGUAGES, DEFAULT_LANG, type Lang } from '@/lib/i18n';

const translations: Record<Lang, typeof en> = { bg, en };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR and the first client render always use the default language (no
  // hydration mismatch); LanguageGeoInit applies the geo-derived language on
  // mount. Geolocation always wins on load — the manual switcher takes
  // effect within the session (same behavior as the defied-app-ui web app).
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
  };

  const t = useCallback((key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: unknown = translations[lang];
    for (const k of keys) {
      if (value == null || typeof value !== 'object') return key;
      value = (value as Record<string, unknown>)[k];
    }
    if (typeof value !== 'string') return key;
    if (!params) return value;
    return value.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k] ?? `{{${k}}}`);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
