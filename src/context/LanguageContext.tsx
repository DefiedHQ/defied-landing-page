'use client';

import { createContext, useContext, useCallback } from 'react';
import en from '@/locales/en.json';
import { DEFAULT_LANG, localePath as localePathFor, type Lang } from '@/lib/i18n';

export { DEFAULT_LANG, type Lang } from '@/lib/i18n';

const translations: Record<Lang, typeof en> = { en };

interface LanguageContextValue {
  lang: Lang;
  /** Returns the public English URL for a locale-neutral path. */
  localePath: (path: string) => string;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * The site serves English pages from the root route tree.
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
