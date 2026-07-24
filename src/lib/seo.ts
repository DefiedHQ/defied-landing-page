export const siteConfig = {
  name: 'Defied Money',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money',
  description:
    'Defied Money is a non-custodial platform for holding, growing and sending euro (EURC) and dollar (USDC) stablecoins across Europe. Earn from open lending markets, send money in seconds - you keep full control of your funds. Available in the EEA.',
  ogImage: '/og-image.png',
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

/**
 * hreflang alternates for a locale-neutral path. English is canonical at the
 * root and doubles as x-default; Bulgarian lives under /bg. Used by both page
 * metadata (`alternates.languages`) and the sitemap.
 */
export function languageAlternates(path: string): Record<string, string> {
  const en = path === '/' ? siteConfig.url : absoluteUrl(path);
  const bg = absoluteUrl(path === '/' ? '/bg' : `/bg${path}`);
  return { en, bg, 'x-default': en };
}
