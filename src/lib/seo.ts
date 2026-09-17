export const siteConfig = {
  name: 'Defied Money',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money',
  description:
    'Defied Money is a self-custodial wallet for digital euros (EURC) and dollars (USDC). Hold, send and use supported stablecoins, and connect to selected decentralized finance markets, from a wallet only you control. Available across the EEA.',
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
} as const;

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

/** English is the site's sole public language and its x-default locale. */
export function languageAlternates(path: string): Record<string, string> {
  const en = path === '/' ? siteConfig.url : absoluteUrl(path);
  return { en, 'x-default': en };
}
