import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';
import bg from '@/locales/bg.json';

export const metadata: Metadata = {
  title: bg.meta.termsTitle,
  description: bg.meta.termsDescription,
  openGraph: {
    title: `${bg.meta.termsTitle} | Defied`,
    description: bg.meta.termsDescription,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied – Условия за ползване' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: `${bg.meta.termsTitle} | Defied`,
    description: bg.meta.termsDescription,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/bg/terms',
    languages: languageAlternates('/terms'),
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: bg.meta.termsTitle,
          description: bg.meta.termsDescription,
          url: absoluteUrl('/bg/terms'),
          inLanguage: 'bg',
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <TermsPage />
    </>
  );
}
