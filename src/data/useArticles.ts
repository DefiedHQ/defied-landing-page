import { useLanguage } from '@/context/LanguageContext';
import articlesEn from '@/data/articles-en.json';

const articlesMap: Record<string, typeof articlesEn> = { en: articlesEn };

export function useArticles() {
  const { lang } = useLanguage();
  return articlesMap[lang] ?? articlesEn;
}
