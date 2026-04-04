'use client';

import { useState } from 'react';
import Link from 'next/link';
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
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, maxWidth: '800px', color: '#0A0B0D', marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px' }}>
            {t('resources.heroTitle')}
          </h1>
          <p style={{ color: '#5B616E', lineHeight: '28px', maxWidth: '640px', fontWeight: 400, fontSize: '18px' }}>
            {t('resources.heroSubtitle')}
          </p>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              style={{
                alignItems: 'center',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 450,
                lineHeight: '24px',
                padding: '16px 24px',
                transition: 'all .2s ease',
                whiteSpace: 'nowrap' as const,
                background: currentFilter === cat ? '#0052FF' : 'rgb(247, 248, 249)',
                color: currentFilter === cat ? '#fff' : '#374151',
              }}
            >
              {cat}
              <span style={{ opacity: 0.7, marginLeft: '6px' }}>{countByCategory(cat)}</span>
            </button>
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
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        marginBottom: '12px',
                        borderRadius: '32px',
                        background: '#0F0F660D',
                        color: '#6b7280',
                        fontSize: '16px',
                        fontWeight: 450,
                        lineHeight: '24px',
                      }}
                    >
                      {article.category}
                    </span>
                    <h2
                      className="card-group-underline"
                      style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '32px',
                        color: '#0A0B0D',
                        margin: '0 0 8px',
                      }}
                    >
                      {article.title}
                    </h2>
                    <p
                      style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: '28px',
                        color: '#6b7280',
                        margin: 0,
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#9ca3af' }}>
                      {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
                    </div>
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
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        marginBottom: '8px',
                        borderRadius: '32px',
                        background: '#0F0F660D',
                        color: '#6b7280',
                        fontSize: '16px',
                        fontWeight: 450,
                        lineHeight: '24px',
                      }}
                    >
                      {article.category}
                    </span>
                    <h3
                      className="card-group-underline"
                      style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '32px',
                        color: '#0A0B0D',
                        margin: '0 0 8px',
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: '28px',
                        color: '#6b7280',
                        margin: 0,
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#9ca3af' }}>
                      {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}
