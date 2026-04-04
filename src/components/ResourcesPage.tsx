'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Chip } from '@coinbase/cds-web/chips/Chip';
import { useArticles } from '@/data/useArticles';
import { useLanguage } from '@/context/LanguageContext';

const categoriesMap = {
  bg: ['Всички', 'DeFi Академия', 'Ръководства', 'Сигурност', 'Технологии'],
  en: ['All', 'DeFi Academy', 'Guides', 'Security', 'Technology'],
};

const monthsBg = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];
const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ResourcesPage() {
  const { t, lang } = useLanguage();
  const articles = useArticles();
  const categories = categoriesMap[lang];
  const allLabel = categories[0];
  const [activeFilter, setActiveFilter] = useState(allLabel);

  // Reset filter when language changes
  const filterValid = categories.includes(activeFilter);
  const currentFilter = filterValid ? activeFilter : allLabel;

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const months = lang === 'en' ? monthsEn : monthsBg;
    return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
  }

  function countByCategory(cat: string) {
    if (cat === allLabel) return articles.length;
    return articles.filter((a) => a.category === cat).length;
  }

  const filtered = currentFilter === allLabel
    ? articles
    : articles.filter((a) => a.category === currentFilter);

  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

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
              onClick={() => setActiveFilter(cat)}
              invertColorScheme={currentFilter === cat}
            >
              {cat} <span style={{ opacity: 0.7, marginLeft: '4px' }}>{countByCategory(cat)}</span>
            </Chip>
          ))}
        </div>

        {/* Featured articles (top 2, responsive grid) */}
        {featured.length > 0 && (
          <div className="grid-1-2-md" style={{ marginBottom: '32px' }}>
            {featured.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.id}`}
                className="card-group"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div>
                  <div style={{ width: '100%', height: 'clamp(200px, 25vw, 270px)', overflow: 'hidden', borderRadius: '56px' }}>
                    <img src="/article-cover.svg" alt={article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ paddingTop: '20px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span className="category-label">{article.category}</span>
                    </div>
                    <Text
                      font="title3"
                      as="h2"
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
                    <Text font="label2" as="div" color="fgMuted" style={{ marginTop: '16px' }}>
                      {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
                    </Text>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Rest of articles (responsive grid) */}
        {rest.length > 0 && (
          <div className="grid-1-2-md">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.id}`}
                className="card-group"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{ height: '100%' }}>
                  <div style={{ width: '100%', height: 'clamp(200px, 25vw, 270px)', overflow: 'hidden', borderRadius: '56px' }}>
                    <img src="/article-cover.svg" alt={article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ paddingTop: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span className="category-label">{article.category}</span>
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
                      {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
                    </Text>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}
