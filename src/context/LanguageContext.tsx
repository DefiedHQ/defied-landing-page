'use client';

import { createContext, useContext, useCallback } from 'react';
import bg from '@/locales/bg.json';
import en from '@/locales/en.json';
import { DEFAULT_LANG, localePath as localePathFor, type Lang } from '@/lib/i18n';

export { LANGUAGES, DEFAULT_LANG, type Lang } from '@/lib/i18n';

const translations: Record<Lang, typeof en> = { bg, en };

interface LanguageContextValue {
  lang: Lang;
  /** Maps a locale-neutral path (`/blog`) to this language's URL (`/bg/blog`). */
  localePath: (path: string) => string;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * The language is route-driven: English pages live at the root, Bulgarian
 * under /bg, and each root layout mounts this provider with its language.
 * Server and client render the same language, so search engines index real
 * Bulgarian HTML on /bg URLs. Switching languages is a navigation (see the
 * Header switcher), not a state change.
 */
export function LanguageProvider({
  initialLang = DEFAULT_LANG,
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const lang = initialLang;

  const localePath = useCallback((path: string) => localePathFor(lang, path), [lang]);

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
    <LanguageContext.Provider value={{ lang, localePath, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
