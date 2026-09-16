export const siteConfig = {
  name: 'Defied Money',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money',
  description:
    'Defied Money is a non-custodial account for your digital euros (EURC) and dollars (USDC). Earn on your balance from open lending markets and send money in seconds - only you control your funds. Available across the EEA.',
  ogImage: '/og-image.jpg',
  logo: '/defied_squared_logo_blue.svg',
  twitter: '@defied_money',
  socials: [
    'https://x.com/defied_money',
    'https://linkedin.com/company/defied-money',
    'https://instagram.com/defied_money',
  ],
  contact: {
    email: 'hello@defied.money',
    telephone: '+359884627762',
  },
  address: '81B Bulgaria Blvd, Sofia, Bulgaria',
} as const;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

/** English is the site's sole public language and its x-default locale. */
export function languageAlternates(path: string): Record<string, string> {
  const en = path === '/' ? siteConfig.url : absoluteUrl(path);
  return { en, 'x-default': en };
}
