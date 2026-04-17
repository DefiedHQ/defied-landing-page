import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Earn on Your Euros. Send Money Globally. No Bank Needed.',
  description: siteConfig.description,
  openGraph: {
    title: 'Defied - Earn on Your Euros. Send Money Globally. No Bank Needed.',
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied' }],
  },
  alternates: {
    canonical: '/',
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
  url: siteConfig.url,
  description:
    'Earn up to 4% APY on your euro balance, send money anywhere in seconds, and pay with a virtual card - from a non-custodial wallet only you control.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  featureList: [
    'Send and receive USDC and EURC stablecoins globally in seconds',
    'Earn up to 4% APY through decentralized lending protocols',
    'Exchange between USDC and EURC instantly',
    'Virtual debit card to spend stablecoin balance anywhere Visa is accepted',
    'Non-custodial wallet with full self-custody via email login',
    'Sponsored gas-free transactions',
  ],
  screenshot: absoluteUrl(siteConfig.ogImage),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Defied?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Defied is a non-custodial stablecoin wallet that lets you send, receive, and exchange USDC and EURC on the Base network. It also provides a simple interface for accessing decentralized finance protocols - including lending, staking, and liquidity provision - without requiring any technical knowledge.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a stablecoin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A stablecoin is a digital currency pegged to a real-world asset - in our case, the euro (EURC) or US dollar (USDC). Unlike bitcoin or ether, their value doesn't fluctuate wildly. You can send them globally, instantly, at any time of day - including weekends. They're backed 1:1 by real currency reserves held by regulated issuers.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is a non-custodial wallet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "With a non-custodial wallet, you own your funds outright - not a company, not a bank. Defied partners with Privy to create a secure wallet tied to your email address. You don't need to manage a private key manually, but you always have access to it. Defied cannot access, move, or freeze your funds under any circumstances.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who controls my money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. Only you. Defied and Privy have no ability to access or move your funds. If you wish, you can export your private key and use your wallet entirely independently of Defied at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw at any time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with no waiting period imposed by Defied. If you have deposited funds into a decentralized protocol, withdrawal terms depend on that protocol - most allow instant withdrawal, though some have waiting periods. We display this information clearly before you deposit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to verify my identity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To send and receive stablecoins directly, no verification is required. To convert euros or dollars from your bank account into stablecoins (on-ramp) or back (off-ramp), identity verification is required by our regulated partner Bridge.xyz. This takes under two minutes and is required by EU financial regulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the risks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are two main risk categories. First, if someone gains access to your email account, they could gain access to your wallet - we strongly recommend enabling two-factor authentication. Second, decentralized protocols carry smart contract risk - the possibility of a bug or exploit. Defied only features protocols with extensive audit histories, but we cannot guarantee against future incidents. Funds are not protected by any deposit guarantee scheme. Please read our full risk disclosure before depositing.',
      },
    },
  ],
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
