'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { Chip } from '@coinbase/cds-web/chips/Chip';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { useArticles } from '@/data/useArticles';
import { useLanguage } from '@/context/LanguageContext';

const allLabelMap: Record<string, string> = { en: 'All' };

const monthsMap: Record<string, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const INITIAL_REST_COUNT = 4;
const LOAD_MORE_STEP = 4;

export function ResourcesPage() {
  const { t, lang } = useLanguage();
  const articles = useArticles();
  const allLabel = allLabelMap[lang];
  const articleCategories = [...new Set(articles.map((a) => a.category))];
  const categories = [allLabel, ...articleCategories];
  const [activeFilter, setActiveFilter] = useState(allLabel);
  const [visibleRestCount, setVisibleRestCount] = useState(INITIAL_REST_COUNT);

  // Reset filter when language changes
  const filterValid = categories.includes(activeFilter);
  const currentFilter = filterValid ? activeFilter : allLabel;

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const months = monthsMap[lang] ?? monthsMap.en;
    return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
  }

  function countByCategory(cat: string) {
    if (cat === allLabel) return articles.length;
    return articles.filter((a) => a.category === cat).length;
  }

  const filtered = currentFilter === allLabel
    ? articles
    : articles.filter((a) => a.category === currentFilter);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const visibleRest = rest.slice(0, visibleRestCount);
  const hasMore = rest.length > visibleRestCount;

  function handleFilter(cat: string) {
    setActiveFilter(cat);
    setVisibleRestCount(INITIAL_REST_COUNT);
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px', width: '100%' }}>
        {/* Hero */}
        <div style={{ marginBottom: '48px' }}>
          <Text font="display1" as="h1" display="block" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, maxWidth: '800px', marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px' }}>
            {t('resources.heroTitle')}
          </Text>
          <Text font="body" as="p" display="block" color="fgMuted" style={{ maxWidth: '640px', fontSize: '18px', lineHeight: '28px' }}>
            {t('resources.heroSubtitle')}
          </Text>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              onClick={() => handleFilter(cat)}
              invertColorScheme={currentFilter === cat}
            >
              {cat} <span style={{ opacity: 0.7, marginLeft: '4px' }}>{countByCategory(cat)}</span>
            </Chip>
          ))}
        </div>

        {/* Featured article (most recent, full-width hero) */}
        {featured && (
          <Link
            href={`/blog/${featured.id}`}
            className="card-group"
            style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}
          >
            <div className="grid-1-2-md" style={{ alignItems: 'center', gap: 'clamp(24px, 4vw, 48px)' }}>
              <div style={{ width: '100%', aspectRatio: '1200 / 630', overflow: 'hidden', borderRadius: 'clamp(24px, 4vw, 56px)', position: 'relative' }}>
                <Image src={featured.image || '/article-cover.svg'} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 580px" style={{ objectFit: 'cover' }} priority />
              </div>
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <span className="category-tag-hover"><Tag colorScheme="gray">{featured.category}</Tag></span>
                </div>
                <Text
                  font="display3"
                  as="h2"
                  display="block"
                  className="card-group-underline"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                    lineHeight: 1.1,
                    fontWeight: 400,
                    margin: '0 0 16px',
                  }}
                >
                  {featured.title}
                </Text>
                <Text
                  font="body"
                  as="p"
                  display="block"
                  color="fgMuted"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                    lineHeight: 1.5,
                    margin: '0 0 16px',
                  }}
                >
                  {featured.excerpt}
                </Text>
                <Text font="label2" as="div" display="block" color="fgMuted">
                  <time dateTime={`${featured.date}T00:00:00+00:00`}>{formatDate(featured.date)}</time> &middot; {featured.readTime} {t('common.minRead')}
                </Text>
              </div>
            </div>
          </Link>
        )}

        {/* Rest of articles (responsive grid) */}
        {visibleRest.length > 0 && (
          <div className="grid-1-2-md">
            {visibleRest.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.id}`}
                className="card-group"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{ height: '100%' }}>
                  <div style={{ width: '100%', aspectRatio: '1200 / 630', overflow: 'hidden', borderRadius: 'clamp(24px, 4vw, 56px)', position: 'relative' }}>
                    <Image src={article.image || '/article-cover.svg'} alt={article.title} fill sizes="(max-width: 768px) 100vw, 580px" style={{ objectFit: 'cover' }} />
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
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        margin: 0,
                      }}
                    >
                      {article.excerpt}
                    </Text>
                    <Text font="label2" as="div" color="fgMuted" style={{ marginTop: '12px' }}>
                      <time dateTime={`${article.date}T00:00:00+00:00`}>{formatDate(article.date)}</time> &middot; {article.readTime} {t('common.minRead')}
                    </Text>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Button
              variant="secondary"
              onClick={() => setVisibleRestCount((c) => c + LOAD_MORE_STEP)}
            >
              {t('resources.readMore')}
            </Button>
          </div>
        )}
    </div>
  );
}
