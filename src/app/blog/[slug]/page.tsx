import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/ArticlePage';
import { JsonLd } from '@/components/seo/JsonLd';
import articles from '@/data/articles-en.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.id === slug);
  if (!article) return { title: 'Article not found', robots: { index: false, follow: false } };
  const articleUrl = absoluteUrl(`/blog/${slug}`);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Defied`,
      description: article.excerpt,
      url: articleUrl,
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl(article.image || siteConfig.ogImage), width: 1200, height: 630, alt: article.title }],
      type: 'article',
      publishedTime: `${article.date}T00:00:00+00:00`,
      modifiedTime: `${article.date}T00:00:00+00:00`,
      section: article.category,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title: `${article.title} | Defied`,
      description: article.excerpt,
      images: [article.image || siteConfig.ogImage],
    },
    alternates: {
      canonical: articleUrl,
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
              image: absoluteUrl(article.image || siteConfig.ogImage),
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
                '@id': absoluteUrl(`/blog/${slug}`),
              },
              articleSection: article.category,
              wordCount: article.sections.reduce((sum, s) => sum + s.body.split(/\s+/).length, 0),
            }}
          />
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteConfig.url,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: absoluteUrl('/blog'),
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: absoluteUrl(`/blog/${slug}`),
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
