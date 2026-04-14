import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Defied Money App Privacy Policy. Learn how we process and protect your personal data.',
  openGraph: {
    title: 'Privacy Policy | Defied Money App',
    description:
      'Defied Money App Privacy Policy. Learn how we process and protect your personal data.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money App Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: 'Privacy Policy | Defied Money App',
    description: 'Defied Money App Privacy Policy. Learn how we process and protect your personal data.',
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: '/privacy',
  },
};

export default function Page() {
  return <PrivacyPage />;
}
