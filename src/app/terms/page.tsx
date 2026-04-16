import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
  openGraph: {
    title: 'Terms of Use | Defied',
    description:
      'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Terms of Use' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Terms of Use | Defied',
    description: 'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Terms of Use',
          description: 'Terms of Use for the Defied platform. Read our terms and conditions before using our services.',
          url: absoluteUrl('/terms'),
          isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <TermsPage />
    </>
  );
}
