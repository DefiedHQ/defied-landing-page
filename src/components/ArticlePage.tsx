'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import articles from '@/data/articles.json';
import { useLanguage } from '@/context/LanguageContext';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];
  return `${d.getFullYear()} ${months[d.getMonth()]} ${d.getDate()}`;
}

export function ArticlePage() {
  const params = useParams();
  const { t } = useLanguage();
  const slug = params.slug as string;
  const article = articles.find((a) => a.id === slug);
  const recentArticles = articles.filter((a) => a.id !== slug).slice(0, 3);

  if (!article) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-16 text-center" style={{ minHeight: '100vh' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 400, color: '#0A0B0D' }}>
          {t('resources.notFound')}
        </h1>
        <Link href="/resources" style={{ color: '#0052FF', marginTop: '16px', display: 'inline-block' }}>
          &larr; {t('resources.backToResources')}
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pb-16">

        {/* Category badge */}
        <span
          className="inline-block px-3 py-1 mb-4 mt-12 sm:mt-[120px]"
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

        {/* Title */}
        <h1 className="text-[32px] sm:text-[56px] md:text-[80px] mb-4 sm:mb-6" style={{ fontWeight: 400, lineHeight: 1, maxWidth: '800px', color: '#0A0B0D' }}>
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-8">
          <img src="/defied_squared_logo_blue.svg" width={40} height={40} alt="" />
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>
            <div>by <span style={{ color: '#6b7280' }}>Defied</span></div>
            <div>{formatDate(article.date)} &middot; {article.readTime} мин четене</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 mb-16">
          {/* Main content */}
          <article className="min-w-0">
            {/* Hero image placeholder */}
            <div className="mb-10 h-[250px] sm:h-[350px] md:h-[400px]" style={{ maxWidth: '100%', overflow: 'hidden', borderRadius: '56px' }}>
              <img src="/article-cover.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Article body */}
            <div className="space-y-8">
              {/* Lead paragraph */}
              <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', marginBottom: '24px', fontStyle: 'italic', color: '#6b7280' }}>
                {article.excerpt}
              </p>

              {article.sections.map((section, i) => (
                <div key={i}>
                  <h2
                    id={`section-${i}`}
                    style={{ fontSize: '32px', fontWeight: 700, lineHeight: '100%', marginBottom: '24px', color: '#0A0B0D' }}
                  >
                    {section.heading}
                  </h2>
                  <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#5B616E' }}>
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            {/* Share */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 500, lineHeight: '100%', color: '#0A0B0D', marginBottom: '24px' }}>
                {t('resources.shareArticle')}
              </h3>
              <div className="flex items-center gap-5">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: '#0A0B0D', textDecoration: 'none' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://t.me/share/url?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: '#0A0B0D', textDecoration: 'none' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(article.title)}`}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: '#0A0B0D', textDecoration: 'none' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: '#0A0B0D', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </button>
              </div>
            </div>

            {/* Table of Contents */}
            <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {article.sections.map((section, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block hover:text-[#0052FF] transition-colors"
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#374151',
                    textDecoration: 'none',
                    borderLeft: '3px solid',
                    borderColor: i === 0 ? '#0052FF' : '#e5e7eb',
                    paddingLeft: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  }}
                >
                  {section.heading}
                </a>
              ))}
            </div>

            {/* Recent Posts */}
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 500, lineHeight: '100%', color: '#0A0B0D', marginBottom: '24px' }}>
                {t('resources.recentPosts')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {recentArticles.map((a) => (
                  <Link
                    key={a.id}
                    href={`/resources/${a.id}`}
                    className="block group"
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{ height: '190px', maxWidth: '100%', overflow: 'hidden', marginBottom: '12px', borderRadius: '56px' }}>
                      <img src="/article-cover.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h4
                      className="group-hover:text-[#0052FF] transition-colors"
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#0A0B0D',
                        lineHeight: '28px',
                        marginBottom: '8px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {a.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#5B616E',
                        lineHeight: '28px',
                        marginBottom: '8px',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {a.excerpt}
                    </p>
                    <span style={{ fontSize: '14px', fontWeight: 400, color: '#9ca3af' }}>
                      {formatDate(a.date)} &middot; {a.readTime} мин четене
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
    </div>
  );
}
