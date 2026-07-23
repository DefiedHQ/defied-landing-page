import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';
import bg from '@/locales/bg.json';

export const metadata: Metadata = {
  title: {
    absolute: bg.meta.defaultTitle,
  },
  description: bg.meta.homeDescription,
  openGraph: {
    title: bg.meta.defaultTitle,
    description: bg.meta.homeDescription,
    url: absoluteUrl('/bg'),
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money' }],
  },
  twitter: {
    title: bg.meta.defaultTitle,
    description: bg.meta.homeDescription,
  },
  alternates: {
    canonical: '/bg',
    languages: languageAlternates('/'),
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: absoluteUrl('/bg'),
  description: bg.meta.homeDescription,
  inLanguage: 'bg',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  legalName: 'Fusion Software LLC',
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(siteConfig.logo),
  },
  image: absoluteUrl(siteConfig.ogImage),
  sameAs: [...siteConfig.socials],
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.telephone,
    contactType: 'customer service',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '81B Bulgaria Blvd',
    addressLocality: 'Sofia',
    addressCountry: 'BG',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: siteConfig.name,
  url: absoluteUrl('/bg'),
  description:
    'Печели върху баланса си в евро и долари чрез глобални пазари за кредитиране, изпращай пари навсякъде за секунди и плащай с виртуална карта - от непопечителски портфейл, който само ти контролираш.',
  inLanguage: 'bg',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  featureList: [
    'Изпращане и получаване на стейбълкойни USDC и EURC глобално за секунди',
    'Доходност върху баланса чрез децентрализирани протоколи за кредитиране',
    'Мигновена обмяна между USDC и EURC',
    'Виртуална дебитна карта за плащане със стейбълкойн баланса навсякъде, където се приема Visa',
    'Непопечителски портфейл с пълен собствен контрол чрез вход с имейл',
    'Спонсорирани транзакции без такси за мрежата',
  ],
  screenshot: absoluteUrl(siteConfig.ogImage),
};

/* FAQ structured data mirrors the visible Bulgarian FAQ section (bg.json). */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'bg',
  mainEntity: ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((i) => ({
    '@type': 'Question',
    name: bg.faq[`q${i}`],
    acceptedAnswer: {
      '@type': 'Answer',
      text: bg.faq[`a${i}`],
    },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />
      <LandingPage />
    </>
  );
}
