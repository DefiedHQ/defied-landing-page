import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'A stablecoin wallet with DeFi superpowers',
  description:
    'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
  openGraph: {
    title: 'Defied | A stablecoin wallet with DeFi superpowers',
    description:
      'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Defied' }],
  },
  alternates: {
    canonical: 'https://defied.money',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Defied',
  url: 'https://defied.money',
  description:
    'Move your money freely and securely using stablecoins. Send, receive, and exchange in seconds. Access DeFi with one click.',
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: 'Defied',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Defied',
  url: 'https://defied.money',
  logo: {
    '@type': 'ImageObject',
    url: 'https://defied.money/defied_squared_logo_blue.svg',
  },
  sameAs: [
    'https://x.com/defied_money',
    'https://linkedin.com/company/defied-money',
    'https://instagram.com/defied_money',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@defied.money',
    telephone: '+359884627762',
    contactType: 'customer service',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Defied',
  url: 'https://app.defied.money',
  description:
    'A stablecoin wallet with DeFi superpowers. Send, receive, exchange stablecoins and access decentralized finance.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Send and receive USDC and EURC stablecoins',
    'Exchange stablecoins in seconds',
    'Access decentralized finance protocols',
    'Non-custodial wallet with full self-custody',
    'Sponsored transactions',
  ],
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
        text: 'Defied is a digital stablecoin wallet that allows you to exchange, send, and receive USDC and EURC stablecoins via the Base network. Defied also provides a user interface for connecting to decentralized finance, where users can participate in decentralized lending, staking, and liquidity provision.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a stablecoin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stablecoins are pegged to reserves of physical assets (fiat currency, gold) or algorithms, which keeps their value constant. With 1:1 fiat-backed stablecoins, the risk of drastic value loss is minimal as they are backed by real reserves.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a non-custodial wallet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With a non-custodial wallet, you own your private keys and recovery phrase, meaning assets are entirely under your control, not a third party or exchange.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who controls my funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only you. Neither Defied nor Privy have access to them. We cannot withdraw or transfer them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw my money at any time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, there is no waiting period imposed by us. If you have deposited funds into a decentralized finance protocol, it depends on the protocol. Most allow instant withdrawal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there risk in using Defied?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The risks fall into two categories. If someone gains access to your email, they could gain access to your digital wallet. Decentralized finance also carries the risk of hacking attacks. Defied only features thoroughly tested protocols that have never been hacked, but we cannot guarantee this won\'t happen.',
      },
    },
    {
      '@type': 'Question',
      name: 'What platforms does Defied support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Currently, Defied is available as a web application that can be used on both laptops and mobile phones. We are planning to release a mobile version for iOS and Android soon.',
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
