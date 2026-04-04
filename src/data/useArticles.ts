import { useLanguage } from '@/context/LanguageContext';
import articlesBg from '@/data/articles.json';
import articlesEn from '@/data/articles-en.json';

export function useArticles() {
  const { lang } = useLanguage();
  return lang === 'en' ? articlesEn : articlesBg;
}
