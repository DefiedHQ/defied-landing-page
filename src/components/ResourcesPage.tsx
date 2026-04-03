'use client';

import { useState } from 'react';
import Link from 'next/link';
import articles from '@/data/articles.json';
import { useLanguage } from '@/context/LanguageContext';

const categories = ['Всички', 'DeFi Академия', 'Ръководства', 'Сигурност', 'Технологии'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];
  return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
}

function countByCategory(cat: string) {
  if (cat === 'Всички') return articles.length;
  return articles.filter((a) => a.category === cat).length;
}

export function ResourcesPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('Всички');

  const filtered = activeFilter === 'Всички'
    ? articles
    : articles.filter((a) => a.category === activeFilter);

  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pb-16">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-[32px] sm:text-[56px] md:text-[80px] mt-12 sm:mt-[120px] mb-4 sm:mb-6" style={{ fontWeight: 400, lineHeight: 1, maxWidth: '800px', color: '#0A0B0D' }}>
            {t('resources.heroTitle')}
          </h1>
          <p style={{ color: '#5B616E', lineHeight: '28px', maxWidth: '640px', fontWeight: 400, fontSize: '18px' }}>
            {t('resources.heroSubtitle')}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className="resource-filter-btn"
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
                background: activeFilter === cat ? '#0052FF' : 'rgb(247, 248, 249)',
                color: activeFilter === cat ? '#fff' : '#374151',
              }}
            >
              {cat}
              <span className="ml-1.5" style={{ opacity: 0.7 }}>{countByCategory(cat)}</span>
            </button>
          ))}
        </div>

        {/* Featured articles (top 2, responsive grid) */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featured.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.id}`}
                className="block group"
                style={{ textDecoration: 'none' }}
              >
                <div className="overflow-hidden">
                  <div className="w-full h-[200px] sm:h-[270px]" style={{ overflow: 'hidden', borderRadius: '56px' }}>
                    <img src="/article-cover.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="pt-5">
                    <span
                      className="inline-block px-3 py-1 mb-3"
                      style={{
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
                      className="group-hover:underline transition-colors mb-2"
                      style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '32px',
                        color: '#0A0B0D',
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
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div className="mt-4" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#9ca3af' }}>
                      {formatDate(article.date)} &middot; {article.readTime} мин четене
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Rest of articles (responsive grid) */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/resources/${article.id}`}
                className="block group"
                style={{ textDecoration: 'none' }}
              >
                <div className="overflow-hidden h-full">
                  <div className="w-full h-[200px] sm:h-[270px]" style={{ overflow: 'hidden', borderRadius: '56px' }}>
                    <img src="/article-cover.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="pt-4">
                    <span
                      className="inline-block px-3 py-1 mb-2"
                      style={{
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
                      className="group-hover:underline transition-colors mb-2"
                      style={{
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '32px',
                        color: '#0A0B0D',
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
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#9ca3af' }}>
                      {formatDate(article.date)} &middot; {article.readTime} мин четене
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
