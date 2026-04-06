'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import bg from '@/locales/bg.json';
import en from '@/locales/en.json';

export type Lang = 'bg' | 'en';

const translations: Record<Lang, typeof bg> = { bg, en };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = (l: Lang) => {
    setLangState(l);
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
