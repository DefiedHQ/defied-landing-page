import type { Metadata } from 'next';
import { RisksContent } from '@/components/RisksContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';
import bg from '@/locales/bg.json';

export const metadata: Metadata = {
  title: bg.meta.risksTitle,
  description: bg.meta.risksDescription,
  openGraph: {
    title: `${bg.meta.risksTitle} | Defied Money`,
    description: bg.meta.risksDescription,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImageBg, width: 1200, height: 630, alt: 'Defied Money – Рискове' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: `${bg.meta.risksTitle} | Defied Money`,
    description: bg.meta.risksDescription,
    images: [siteConfig.ogImageBg],
  },
  alternates: {
    canonical: '/bg/risks',
    languages: languageAlternates('/risks'),
  },
};

export default function RisksPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: bg.meta.risksTitle,
          description: bg.meta.risksDescription,
          url: absoluteUrl('/bg/risks'),
          inLanguage: 'bg',
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <RisksContent />
    </>
  );
}
