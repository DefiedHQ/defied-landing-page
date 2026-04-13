import type { Metadata } from 'next';
import { AboutPage } from '@/components/AboutPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Defied provides non-custodial infrastructure for easy access to decentralized finance. The first crypto savings product in Bulgaria.',
  openGraph: {
    title: 'About us | Defied',
    description:
      'Defied provides non-custodial infrastructure for easy access to decentralized finance.',
    url: absoluteUrl('/about'),
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'About Defied' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'About us | Defied',
    description:
      'Defied provides non-custodial infrastructure for easy access to decentralized finance.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Defied',
          description:
            'Defied provides non-custodial infrastructure for easy access to decentralized finance. The first crypto savings product in Bulgaria.',
          url: absoluteUrl('/about'),
          isPartOf: {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
          },
          mainEntity: {
            '@type': 'Organization',
            name: siteConfig.name,
            url: siteConfig.url,
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl(siteConfig.logo),
            },
            description:
              'Defied provides non-custodial infrastructure for easy access to decentralized finance.',
            foundingLocation: {
              '@type': 'Place',
              address: siteConfig.address,
            },
            sameAs: [...siteConfig.socials],
            contactPoint: {
              '@type': 'ContactPoint',
              email: siteConfig.contact.email,
              telephone: siteConfig.contact.telephone,
              contactType: 'customer service',
            },
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteConfig.url,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'About',
              item: absoluteUrl('/about'),
            },
          ],
        }}
      />
      <AboutPage />
    </>
  );
}
