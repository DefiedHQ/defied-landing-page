export const siteConfig = {
  name: 'Defied',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money',
  appUrl: 'https://app.defied.money',
  description:
    'Defied lets you earn up to 4% APY on your euro balance, send money anywhere in seconds, and pay with a virtual card - from a wallet only you control. Available in the EU.',
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
