import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';
import en from '@/locales/en.json';

export const metadata: Metadata = {
  title: {
    absolute: en.meta.homeTitle,
  },
  description: en.meta.homeDescription,
  openGraph: {
    title: en.meta.homeTitle,
    description: en.meta.homeDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money' }],
  },
  twitter: {
    title: en.meta.homeTitle,
    description: en.meta.homeDescription,
  },
  alternates: {
    canonical: '/',
    languages: languageAlternates('/'),
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(siteConfig.logo),
  },
  image: absoluteUrl(siteConfig.ogImage),
  description: siteConfig.description,
  areaServed: 'European Economic Area',
  sameAs: [...siteConfig.socials],
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.telephone,
    contactType: 'customer service',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    'Self-custodial wallet for digital euros (EURC) and dollars (USDC) on Base: hold them, send them in seconds, exchange between euros and dollars, and put your balance to work in open onchain markets such as Aave and Fluid, from a wallet only you control.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  featureList: [
    'Send and receive USDC and EURC stablecoins any day of the year, settling in seconds',
    'Exchange between euros and dollars with the rate shown before you confirm',
    'Deposit into and withdraw from open onchain lending markets such as Aave and Fluid, straight from your wallet',
    'Self-custodial: sign in with email or Google, no seed phrase, and export your wallet key at any time',
    'No identity check to hold, send or exchange; verification only for bank top-ups and the card',
    'Network fees covered on supported actions',
  ],
  screenshot: absoluteUrl(siteConfig.ogImage),
};

/* FAQ structured data mirrors the visible FAQ section: the same locale
   strings, in the same order, limited to the 8 questions that are
   server-rendered before "show all" (see VISIBLE_FAQ_COUNT in Hero.tsx). */
const FAQ_KEYS = [1, 4, 7, 8, 5, 13, 15, 14] as const;
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en',
  mainEntity: FAQ_KEYS.map((i) => ({
    '@type': 'Question',
    name: en.faq[`q${i}`],
    acceptedAnswer: {
      '@type': 'Answer',
      text: en.faq[`a${i}`],
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
