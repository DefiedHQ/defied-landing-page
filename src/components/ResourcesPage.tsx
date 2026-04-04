'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Button } from '@coinbase/cds-web/buttons/Button';
import { Tag } from '@coinbase/cds-web/tag/Tag';
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

  const filtered = currentFilter === allLabel ? articles : articles.filter((a) => a.category === currentFilter);
  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

  return (
    <Box as="div" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px', width: '100%' }}>
      {/* Hero */}
      <VStack as="div" style={{ marginBottom: '48px', gap: '16px' }}>
        <Text font="display1" as="h1" style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 500, marginTop: 'clamp(48px, 10vw, 120px)', maxWidth: '800px' }}>
          {t('resources.heroTitle')}
        </Text>
        <Text font="body" as="p" color="fgMuted" style={{ maxWidth: '640px', fontSize: '18px', lineHeight: '28px' }}>
          {t('resources.heroSubtitle')}
        </Text>
      </VStack>

      {/* Category filters */}
      <Box as="div" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={currentFilter === cat ? 'primary' : 'secondary'}
            compact
            onClick={() => setActiveFilter(cat)}
            style={{ borderRadius: '50px' }}
          >
            {cat} <span style={{ opacity: 0.7, marginLeft: '6px' }}>{countByCategory(cat)}</span>
          </Button>
        ))}
      </Box>

      {/* Featured articles */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '32px' }}>
          {featured.map((article) => (
            <Link key={article.id} href={`/resources/${article.id}`} style={{ textDecoration: 'none' }}>
              <VStack as="article" className="group" style={{ gap: '0px' }}>
                <Box as="div" style={{ width: '100%', height: 'clamp(200px, 25vw, 270px)', overflow: 'hidden', borderRadius: '56px' }}>
                  <img src="/article-cover.svg" alt={article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <VStack as="div" style={{ paddingTop: '20px', gap: '8px' }}>
                  <Tag>{article.category}</Tag>
                  <Text font="title3" as="h2" className="group-hover:underline" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.title}
                  </Text>
                  <Text font="body" as="p" color="fgMuted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.excerpt}
                  </Text>
                  <Text font="caption" as="div" color="fgMuted">
                    {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
                  </Text>
                </VStack>
              </VStack>
            </Link>
          ))}
        </div>
      )}

      {/* Rest of articles */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((article) => (
            <Link key={article.id} href={`/resources/${article.id}`} style={{ textDecoration: 'none' }}>
              <VStack as="article" className="group" style={{ gap: '0px', height: '100%' }}>
                <Box as="div" style={{ width: '100%', height: 'clamp(200px, 25vw, 270px)', overflow: 'hidden', borderRadius: '56px' }}>
                  <img src="/article-cover.svg" alt={article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <VStack as="div" style={{ paddingTop: '16px', gap: '8px' }}>
                  <Tag>{article.category}</Tag>
                  <Text font="title3" as="h3" className="group-hover:underline" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.title}
                  </Text>
                  <Text font="body" as="p" color="fgMuted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.excerpt}
                  </Text>
                  <Text font="caption" as="div" color="fgMuted">
                    {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
                  </Text>
                </VStack>
              </VStack>
            </Link>
          ))}
        </div>
      )}
    </Box>
  );
}
