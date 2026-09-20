import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  experimental: {
    // Required for app/global-not-found.tsx: with two root layouts (one per
    // language) there is no single layout to compose a root 404 from.
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Article renamed 2026-09-17 to drop "earn interest" from the URL
      {
        source: '/blog/how-to-earn-interest-on-euros',
        destination: '/blog/euro-yield-options-compared',
        permanent: true,
      },
      // Articles made country-neutral 2026-09-20: the "-bulgaria" slugs moved
      { source: '/blog/revolut-alternatives-bulgaria', destination: '/blog/revolut-alternatives', permanent: true },
      { source: '/blog/send-money-from-bulgaria', destination: '/blog/send-money-abroad', permanent: true },
      { source: '/blog/crypto-taxes-bulgaria', destination: '/blog/crypto-taxes-europe', permanent: true },
      { source: '/blog/digital-euro-bulgaria', destination: '/blog/what-is-the-digital-euro', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
