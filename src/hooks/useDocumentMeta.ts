'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Updates document.title and meta description based on the current language.
 * Falls back to the translation key if no translation is found.
 */
export function useDocumentMeta(titleKey: string, descriptionKey: string) {
  const { t, lang } = useLanguage();

  useEffect(() => {
    const title = t(titleKey);
    const suffix = ' | Defied';
    document.title = title.includes('Defied') ? title : `${title}${suffix}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t(descriptionKey));
    }
  }, [lang, t, titleKey, descriptionKey]);
}
