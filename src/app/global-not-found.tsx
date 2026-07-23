import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

/**
 * Global 404 for URLs that match neither language tree. Rendered standalone
 * (outside both root layouts), so it is bilingual and self-contained — no
 * CDS provider or header, just the brand font and a way back into each
 * language version.
 */

const aeonikPro = localFont({
  src: [
    { path: '../../public/fonts/AeonikPro-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/AeonikPro-Medium.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-aeonik-pro',
});

export const metadata: Metadata = {
  title: '404 | Defied',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={aeonikPro.variable}>
      <body>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            padding: '32px 16px',
            gap: '16px',
            fontFamily: 'var(--font-aeonik-pro), system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '64px', fontWeight: 500, margin: 0, color: 'var(--ink)' }}>404</h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', margin: 0 }}>
            Page not found. <span lang="bg">Страницата не е намерена.</span>
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="/"
              style={{
                background: '#0052FF',
                color: '#ffffff',
                borderRadius: '56px',
                padding: '12px 24px',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Go to homepage
            </a>
            <a
              href="/bg"
              lang="bg"
              style={{
                background: 'var(--surface)',
                color: 'var(--ink)',
                borderRadius: '56px',
                padding: '12px 24px',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Към началната страница
            </a>
          </div>
        </section>
      </body>
    </html>
  );
}
