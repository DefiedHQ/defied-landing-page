import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Defied Money Privacy Policy. Learn how we process and protect your personal data.',
  openGraph: {
    title: 'Privacy Policy | Defied Money',
    description:
      'Defied Money Privacy Policy. Learn how we process and protect your personal data.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Privacy Policy | Defied Money',
    description: 'Defied Money Privacy Policy. Learn how we process and protect your personal data.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/privacy',
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
          name: 'Privacy Policy',
          description: 'Defied Money Privacy Policy. Learn how we process and protect your personal data.',
          url: absoluteUrl('/privacy'),
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <PrivacyPage />
    </>
  );
}
