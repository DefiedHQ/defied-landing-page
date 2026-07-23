import { useLanguage } from '@/context/LanguageContext';
import articlesEn from '@/data/articles-en.json';
import articlesBg from '@/data/articles-bg.json';

const articlesMap: Record<string, typeof articlesEn> = { en: articlesEn, bg: articlesBg };

export function useArticles() {
  const { lang } = useLanguage();
  return articlesMap[lang] ?? articlesEn;
}
