import type { Metadata } from 'next';
import { ArticlePage } from '@/components/ArticlePage';
import articles from '@/data/articles.json';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) return { title: 'Статия не е намерена' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export default function ArticleRoute() {
  return <ArticlePage />;
}
