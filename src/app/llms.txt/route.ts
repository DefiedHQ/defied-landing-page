import articles from '@/data/articles-en.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

// Statically generated at build time; regenerates whenever articles change.
export const dynamic = 'force-static';

/**
 * llms.txt (https://llmstxt.org) - a concise, markdown-formatted summary of
 * the site for LLMs and AI agents. Complements robots.ts, which already
 * allows the major AI crawlers.
 */
export function GET() {
  const articleLines = articles
    .map(
      (a) =>
        `- [${a.title}](${absoluteUrl(`/blog/${a.id}`)}): ${a.excerpt} (${a.date})`
    )
    .join('\n');

  const body = `# Defied Money

> Defied Money is a self-custodial wallet for holding, sending and using digital euros and dollars (EURC/USDC stablecoins) on the Base network, with optional access to selected decentralized finance markets. Defied Money never holds user funds.

Key facts:

- Non-custodial: Defied Money never holds user funds. A personal self-custodial account (an onchain wallet created via Privy) is tied to the user's email; the user can export the private key and use the account independently of Defied Money at any time. Defied Money cannot access, move, or freeze funds.
- Supported assets: USDC and EURC, both issued by Circle, on the Base network. Reserve composition and monthly attestations are published by the issuer; Defied Money does not issue, redeem or back either token.
- Decentralized finance access: balances can be connected to selected public decentralized finance markets (Aave, Compound, Morpho and others; no staking products) through the Defied Money interface. Rates are set by each protocol, are variable and are not guaranteed; funds are not covered by any national deposit guarantee scheme.
- Payments: stablecoin transfers settle in seconds, 24/7 including weekends. A virtual Visa debit card is planned.
- On/off-ramp: converting between bank money and stablecoins is handled by the regulated partner Bridge.xyz and requires identity verification; direct stablecoin transfers require none.
- Network fees on supported actions are covered by Defied Money.
- Availability: the European Economic Area. Card and bank top-up availability depend on partner coverage per country.

## Pages

- [Home](${siteConfig.url}/): product overview, features, and FAQ
- [Blog](${absoluteUrl('/blog')}): guides on stablecoins, decentralized finance and self-custody
- [Risk disclosure](${absoluteUrl('/risks')}): full explanation of the risks of stablecoins and DeFi protocols
- [Terms of service](${absoluteUrl('/terms')})
- [Privacy policy](${absoluteUrl('/privacy')})

## Blog articles

${articleLines}

## Contact

- Email: ${siteConfig.contact.email}
- X: ${siteConfig.socials[0]}
- LinkedIn: ${siteConfig.socials[1]}
- App: https://app.defied.money
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
