'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { useArticles } from '@/data/useArticles';
import { useLanguage } from '@/context/LanguageContext';

/* Hand-picked for the landing page: the strongest commercial article, the
   strongest educational one, and the entry-level explainer. */
const FEATURED_SLUGS = [
  'revolut-alternatives-bulgaria',
  'where-does-defi-yield-come-from',
  'what-is-a-stablecoin',
];

/**
 * "From the blog" — three article cards on the landing page. Links the site's
 * strongest page to its content cluster (and vice versa via breadcrumbs), in
 * the same card style as the blog listing.
 */
export function FeaturedPosts() {
  const { t, localePath } = useLanguage();
  const articles = useArticles();
  const featured = FEATURED_SLUGS
    .map((slug) => articles.find((a) => a.id === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (featured.length === 0) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <Text font="display2" as="h2" className="title-tight-lh" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 500 }}>
          {t('blogSection.title')}
        </Text>
        <Link href={localePath('/blog')} className="band-link">
          {t('blogSection.viewAll')}
        </Link>
      </div>
      <div className="grid-1-3-lg">
        {featured.map((article) => (
          <Link
            key={article.id}
            href={localePath(`/blog/${article.id}`)}
            className="card-group"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div style={{ height: '100%' }}>
              <div style={{ width: '100%', aspectRatio: '1200 / 630', overflow: 'hidden', borderRadius: 'clamp(20px, 3vw, 32px)', position: 'relative' }}>
                <Image
                  src={`/blog/${article.id}/cover.png`}
                  alt={article.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 384px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ paddingTop: '16px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span className="category-tag-hover"><Tag colorScheme="gray">{article.category}</Tag></span>
                </div>
                <Text
                  font="title3"
                  as="h3"
                  className="card-group-underline"
                  style={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    margin: '0 0 8px',
                  }}
                >
                  {article.title}
                </Text>
                <Text
                  font="body"
                  as="p"
                  color="fgMuted"
                  style={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    overflow: 'hidden',
                  }}
                >
                  {article.excerpt}
                </Text>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
