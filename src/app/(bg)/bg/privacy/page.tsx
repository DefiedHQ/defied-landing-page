import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';
import bg from '@/locales/bg.json';

export const metadata: Metadata = {
  title: bg.meta.privacyTitle,
  description: bg.meta.privacyDescription,
  openGraph: {
    title: `${bg.meta.privacyTitle} | Defied Money`,
    description: bg.meta.privacyDescription,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money – Политика за поверителност' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: `${bg.meta.privacyTitle} | Defied Money`,
    description: bg.meta.privacyDescription,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/bg/privacy',
    languages: languageAlternates('/privacy'),
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: bg.meta.privacyTitle,
          description: bg.meta.privacyDescription,
          url: absoluteUrl('/bg/privacy'),
          inLanguage: 'bg',
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <PrivacyPage />
    </>
  );
}
