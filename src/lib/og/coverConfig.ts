import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Blog cover / OG image template system (design review follow-up).
 * One layout grammar, varied per article by category tint + pictogram.
 * Images are generated at build time via ImageResponse - a new article in
 * articles.json gets its cover automatically.
 */

export const COVER_SIZE = { width: 1200, height: 630 };

/* Category → background tint, from the site's token family */
const CATEGORY_TINT: Record<string, string> = {
  Guides: '#E9EFF9', // mist
  Announcements: '#F6F5F1', // stone
};
const DEFAULT_TINT = '#E9EFF9';

/* Per-article tint overrides: with only 8 pictograms for 11 articles, some
   pictograms repeat - the article that reuses one gets the other tint so no
   two covers are identical. */
const ARTICLE_TINT: Record<string, string> = {
  'revolut-alternatives-bulgaria': '#F6F5F1', // creditCard also used by best-euro-stablecoin (mist)
  'send-money-from-bulgaria': '#F6F5F1', // transferSend also used by what-is-a-stablecoin (mist)
  'digital-euro-bulgaria': '#F6F5F1', // walletExchange also used by what-is-eurc (mist)
};

export function tintFor(category: string, slug?: string): string {
  if (slug && ARTICLE_TINT[slug]) return ARTICLE_TINT[slug];
  return CATEGORY_TINT[category] ?? DEFAULT_TINT;
}

/* Article → pictogram (files in public/pictograms). Unique per article so
   covers are distinguishable at a glance. */
const ARTICLE_PICTOGRAM: Record<string, string> = {
  'revolut-alternatives-bulgaria': 'creditCard-3.svg',
  'send-money-from-bulgaria': 'transferSend-3.svg',
  'crypto-taxes-bulgaria': 'gasFees-5.svg',
  'digital-euro-bulgaria': 'walletExchange-3.svg',
  'where-does-defi-yield-come-from': 'decentralizedWeb3-5.svg',
  'how-to-earn-interest-on-euros': 'apyInterest-5.svg',
  'best-euro-stablecoin': 'creditCard-3.svg',
  'what-is-eurc': 'walletExchange-3.svg',
  'what-is-a-stablecoin': 'transferSend-3.svg',
  'what-is-a-non-custodial-wallet': 'selfCustodyWallet-5.svg',
  'introducing-defied': 'browser-3.svg',
};

/* Deterministic fallback for future articles without an explicit mapping */
const FALLBACK_POOL = [
  'apyInterest-5.svg',
  'transferSend-3.svg',
  'walletExchange-3.svg',
  'creditCard-3.svg',
  'decentralizedWeb3-5.svg',
  'browser-3.svg',
  'gasFees-5.svg',
  'selfCustodyWallet-5.svg',
];

export function pictogramFor(slug: string): string {
  if (ARTICLE_PICTOGRAM[slug]) return ARTICLE_PICTOGRAM[slug];
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return FALLBACK_POOL[hash % FALLBACK_POOL.length];
}

/* ── Build-time asset loaders ── */

async function svgDataUri(publicPath: string): Promise<string> {
  const buf = await readFile(path.join(process.cwd(), 'public', publicPath));
  return `data:image/svg+xml;base64,${buf.toString('base64')}`;
}

export function loadPictogram(slug: string): Promise<string> {
  return svgDataUri(`pictograms/${pictogramFor(slug)}`);
}

export function loadLogo(): Promise<string> {
  return svgDataUri('defied_squared_logo_blue.svg');
}

export function loadFont(weight: 'Regular' | 'Medium'): Promise<Buffer> {
  return readFile(path.join(process.cwd(), 'src', 'lib', 'og', `AeonikPro-${weight}.ttf`));
}
