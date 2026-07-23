import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/ArticlePage';
import { JsonLd } from '@/components/seo/JsonLd';
import articles from '@/data/articles-bg.json';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) return { title: 'Статия не е намерена', robots: { index: false, follow: false } };
  const articleUrl = absoluteUrl(`/bg/blog/${slug}`);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Defied Money`,
      description: article.excerpt,
      url: articleUrl,
      siteName: siteConfig.name,
      type: 'article',
      locale: 'bg_BG',
      publishedTime: `${article.date}T00:00:00+00:00`,
      modifiedTime: `${article.date}T00:00:00+00:00`,
      section: article.category,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: `${article.title} | Defied Money`,
      description: article.excerpt,
    },
    alternates: {
      canonical: articleUrl,
      languages: languageAlternates(`/blog/${slug}`),
    },
  };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export default async function ArticleRoute({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);

  if (!article) notFound();

  return (
    <>
      {article && (
        <>
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              description: article.excerpt,
              inLanguage: 'bg',
              image: absoluteUrl(`/blog/${slug}/cover.png`),
              datePublished: `${article.date}T00:00:00+00:00`,
              dateModified: `${article.date}T00:00:00+00:00`,
              dateCreated: `${article.date}T00:00:00+00:00`,
              author: {
                '@type': 'Person',
                name: article.author,
              },
              publisher: {
                '@type': 'Organization',
                name: siteConfig.name,
                logo: {
                  '@type': 'ImageObject',
                  url: absoluteUrl(siteConfig.logo),
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': absoluteUrl(`/bg/blog/${slug}`),
              },
              articleSection: article.category,
              wordCount: article.sections.reduce((sum, s) => sum + s.body.split(/\s+/).length, 0),
            }}
          />
          {article.faq.length > 0 && (
            <JsonLd
              data={{
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                inLanguage: 'bg',
                mainEntity: article.faq.map((qa) => ({
                  '@type': 'Question',
                  name: qa.q,
                  acceptedAnswer: { '@type': 'Answer', text: qa.a },
                })),
              }}
            />
          )}
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Начало',
                  item: absoluteUrl('/bg'),
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Блог',
                  item: absoluteUrl('/bg/blog'),
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: absoluteUrl(`/bg/blog/${slug}`),
                },
              ],
            }}
          />
        </>
      )}
      <ArticlePage />
    </>
  );
}
