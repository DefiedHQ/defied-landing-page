import type { Metadata } from 'next';
import { LandingPage } from '@/components/LandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, absoluteUrl, languageAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: 'Defied Money - Earn on your euros. Send money globally. No bank needed.',
  },
  description: siteConfig.description,
  openGraph: {
    title: 'Defied Money - Earn on your euros. Send money globally. No bank needed.',
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Defied Money' }],
  },
  twitter: {
    title: 'Defied Money - Earn on your euros. Send money globally. No bank needed.',
    description: siteConfig.description,
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
    'Earn on your euro and dollar balance through global lending markets, send money anywhere in seconds, and pay with a virtual card - from a non-custodial wallet only you control.',
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
    'Earn on your balance through decentralized lending protocols',
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
      name: 'What is Defied Money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Defied Money is a non-custodial stablecoin wallet that lets you send, receive, and exchange USDC and EURC on the Base network. It also provides a simple interface for accessing decentralized finance protocols - including lending, staking, and liquidity provision - without requiring any technical knowledge.',
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
        text: "With a non-custodial wallet, you own your funds outright - not a company, not a bank. Defied Money partners with Privy to create a secure wallet tied to your email address. You don't need to manage a private key manually, but you always have access to it. Defied Money cannot access, move, or freeze your funds under any circumstances.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who controls my money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. Only you. Defied Money and Privy have no ability to access or move your funds. If you wish, you can export your private key and use your wallet entirely independently of Defied Money at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw at any time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with no waiting period imposed by Defied Money. If you have deposited funds into a decentralized protocol, withdrawal terms depend on that protocol - most allow instant withdrawal, though some have waiting periods. We display this information clearly before you deposit.',
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
        text: 'There are two main risk categories. First, if someone gains access to your email account, they could gain access to your wallet - we strongly recommend enabling two-factor authentication. Second, decentralized protocols carry smart contract risk - the possibility of a bug or exploit. Defied Money only features protocols with extensive audit histories, but we cannot guarantee against future incidents. Funds are not protected by any deposit guarantee scheme. Please read our full risk disclosure before depositing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is EURC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EURC is a digital euro issued by Circle, the same company that issues USDC. Every EURC token is backed 1:1 by real euros held in regulated banks, and the reserves are audited monthly. You can hold, send and receive EURC 24/7, including weekends and holidays - and when you want to, you can always convert it back to regular euros in your bank account.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Defied Money different from traditional fintech apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Traditional fintech apps are licensed financial institutions - they hold your money on their balance sheet, which means they can freeze accounts, impose limits, or close accounts with limited notice. Defied Money never holds your money. Your balance sits in a wallet that only you can open, and it keeps working even if Defied Money doesn't. You also earn yield directly from public lending markets, rather than whatever rate a bank decides to pay you.",
      },
    },
    {
      '@type': 'Question',
      name: "Is Defied Money safe if I'm not an expert?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Defied Money is designed so you don't need to be. You sign up with your email, we handle the technical parts behind the scenes, and we cover network fees on supported actions. The one thing that's different from a bank: there is no customer support line that can recover your money if you lose access to your email. That's why we recommend enabling two-factor authentication from day one.",
      },
    },
    {
      '@type': 'Question',
      name: "How do Defied Money's yields compare to a European savings account?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most European banks pay very little on savings, often even less after fees. The lending markets Defied Money connects you to typically pay meaningfully more on EURC and USDC - you can see the current rates in the app before you deposit. These rates change over time and carry different risks than a bank deposit - read our risk disclosure for the full picture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Defied Money available in my country?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Defied Money is available throughout the European Economic Area. A few features - specifically topping up from a bank account and the Visa debit card - depend on our regulated partners being live in your country. When you sign up, we show you exactly which features are available for you.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my money if Defied Money shuts down?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Your money stays with you. Defied Money is a front-end - your wallet and the lending markets it connects to exist independently. If we disappeared tomorrow, you'd still have full access to your wallet, through your email login or by exporting your private key into any compatible app. This is the core reason Defied Money is built this way.",
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
