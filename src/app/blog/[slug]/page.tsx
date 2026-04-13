import type { Metadata } from 'next';
import { ArticlePage } from '@/components/ArticlePage';
import { JsonLd } from '@/components/seo/JsonLd';
import articles from '@/data/articles-en.json';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Defied`,
      description: article.excerpt,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: article.title }],
      type: 'article',
    },
    alternates: {
      canonical: `https://defied.money/blog/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export default async function ArticleRoute({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);

  return (
    <>
      {article && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: 'https://defied.money/og-image.png',
            datePublished: `${article.date}T00:00:00+00:00`,
            dateModified: `${article.date}T00:00:00+00:00`,
            author: {
              '@type': 'Organization',
              name: 'Defied',
              url: 'https://defied.money',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Defied',
              logo: {
                '@type': 'ImageObject',
                url: 'https://defied.money/defied_squared_logo_blue.svg',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://defied.money/blog/${slug}`,
            },
          }}
        />
      )}
      <ArticlePage />
    </>
  );
}
