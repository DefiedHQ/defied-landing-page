import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for the Defied Money App platform. Read our terms and conditions before using our services.',
  openGraph: {
    title: 'Terms of Use | Defied Money App',
    description:
      'Terms of Use for the Defied Money App platform. Read our terms and conditions before using our services.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money App Terms of Use' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Terms of Use | Defied Money App',
    description: 'Terms of Use for the Defied Money App platform. Read our terms and conditions before using our services.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function Page() {
  return <TermsPage />;
}
