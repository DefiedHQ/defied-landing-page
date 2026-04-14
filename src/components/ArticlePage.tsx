'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Text } from '@coinbase/cds-web/typography/Text';
import { Tag } from '@coinbase/cds-web/tag/Tag';
import { useArticles } from '@/data/useArticles';
import { useLanguage } from '@/context/LanguageContext';

export function ArticlePage() {
  const params = useParams();
  const { t, lang } = useLanguage();
  const articles = useArticles();
  const slug = params.slug as string;
  const article = articles.find((a) => a.id === slug);

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const monthsMap: Record<string, string[]> = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };
    const months = monthsMap[lang] ?? monthsMap.en;
    return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
  }
  const recentArticles = articles.filter((a) => a.id !== slug).slice(0, 3);

  if (!article) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 16px', textAlign: 'center', minHeight: '100vh' }}>
        <Text font="title2" as="h1">{t('resources.notFound')}</Text>
        <Link href="/blog" style={{ color: '#0052FF', marginTop: '16px', display: 'inline-block', textDecoration: 'none' }}>
          &larr; {t('resources.backToResources')}
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px', width: '100%' }}>

        {/* Category badge */}
        <div style={{ marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px' }}>
          <span className="category-tag-hover"><Tag colorScheme="gray">{article.category}</Tag></span>
        </div>

        {/* Title */}
        <Text font="display1" as="h1" display="block" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', fontWeight: 400, lineHeight: 1, maxWidth: '800px', marginBottom: '24px' }}>
          {article.title}
        </Text>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <img src="/defied_squared_logo_blue.svg" width={40} height={40} alt="Defied Money App" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Text font="label2" as="div" color="fgMuted">
              {t('common.by')} <Text font="label2" as="span" style={{ color: '#6b7280' }}>Defied Money App</Text>
            </Text>
            <Text font="label2" as="div" color="fgMuted">
              {formatDate(article.date)} &middot; {article.readTime} {t('common.minRead')}
            </Text>
          </div>
        </div>

        <div className="grid-article" style={{ marginBottom: '64px' }}>
          {/* Main content */}
          <article style={{ minWidth: 0 }}>
            {/* Hero image placeholder */}
            <div style={{ marginBottom: '40px', height: 'clamp(250px, 30vw, 400px)', maxWidth: '100%', overflow: 'hidden', borderRadius: '56px' }}>
              <img src="/article-cover.svg" alt={article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Article body */}
            <div>
              {/* Lead paragraph */}
              <Text font="body" as="p" display="block" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '24px', fontStyle: 'italic' }}>
                {article.excerpt}
              </Text>

              {article.sections.map((section: { heading: string; body: string }, i: number) => (
                <div key={i} style={{ marginBottom: '32px' }}>
                  <Text font="title2" as="h2" display="block" id={`section-${i}`} style={{ marginBottom: '24px' }}>
                    {section.heading}
                  </Text>
                  <Text font="body" as="p" display="block" color="fgMuted" style={{ fontSize: '18px', lineHeight: '28px' }}>
                    {section.body}
                  </Text>
                </div>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            {/* Share */}
            <div style={{ marginBottom: '40px' }}>
              <Text font="title3" as="h3" display="block" style={{ marginBottom: '24px' }}>
                {t('resources.shareArticle')}
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-fade-70"
                  style={{ color: '#0A0B0D', textDecoration: 'none' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://t.me/share/url?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-fade-70"
                  style={{ color: '#0A0B0D', textDecoration: 'none' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(article.title)}`}
                  className="hover-fade-70"
                  style={{ color: '#0A0B0D', textDecoration: 'none' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="hover-fade-70"
                  style={{ color: '#0A0B0D', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </button>
              </div>
            </div>

            {/* Table of Contents */}
            <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {article.sections.map((section: { heading: string }, i: number) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover-color-blue"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    borderLeft: '3px solid',
                    borderColor: i === 0 ? '#0052FF' : '#e5e7eb',
                    paddingLeft: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  }}
                >
                  <Text font="headline" as="span" style={{ color: '#374151' }}>
                    {section.heading}
                  </Text>
                </a>
              ))}
            </div>

            {/* Recent Posts */}
            <div>
              <Text font="title3" as="h3" display="block" style={{ marginBottom: '24px' }}>
                {t('resources.recentPosts')}
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {recentArticles.map((a) => (
                  <Link
                    key={a.id}
                    href={`/blog/${a.id}`}
                    className="card-group"
                    style={{ display: 'block', textDecoration: 'none' }}
                  >
                    <div style={{ height: '190px', maxWidth: '100%', overflow: 'hidden', marginBottom: '12px', borderRadius: '56px' }}>
                      <img src="/article-cover.svg" alt={a.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <Text
                      font="headline"
                      as="h4"
                      className="card-group-blue"
                      style={{
                        marginBottom: '8px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {a.title}
                    </Text>
                    <Text font="body" as="p" color="fgMuted" style={{ marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {a.excerpt}
                    </Text>
                    <Text font="label2" as="span" color="fgMuted">
                      {formatDate(a.date)} &middot; {a.readTime} {t('common.minRead')}
                    </Text>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
    </div>
  );
}
