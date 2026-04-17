export const siteConfig = {
  name: 'Defied',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://defied.money',
  description:
    'Hold, send and earn on your euros and dollars from an account only you control. Up to 4% a year. Global transfers in seconds. No bank required. Join the waitlist.',
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
