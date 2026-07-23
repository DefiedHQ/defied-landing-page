import articles from '@/data/articles-en.json';
import articlesBg from '@/data/articles-bg.json';
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

  const articleLinesBg = articlesBg
    .map(
      (a) =>
        `- [${a.title}](${absoluteUrl(`/bg/blog/${a.id}`)}): ${a.excerpt} (${a.date})`
    )
    .join('\n');

  const body = `# Defied Money

> Defied Money is a non-custodial stablecoin wallet for Europe. Hold, send and earn on euro (EURC) and dollar (USDC) stablecoins on the Base network, from an account only the user controls. No bank required.

Key facts:

- Non-custodial: Defied Money never holds user funds. A personal wallet is created at signup (via Privy) and tied to the user's email; the user can export the private key and use the wallet independently of Defied Money at any time. Defied Money cannot access, move, or freeze funds.
- Supported assets: USDC and EURC, both issued by Circle and backed 1:1 by audited reserves, on the Base network.
- Earning: balances can earn yield through public decentralized lending markets (Aave, Compound, Morpho, Lido and others), accessed through the Defied Money interface. Rates are variable and not guaranteed; funds are not covered by any national deposit guarantee scheme.
- Payments: virtual Visa debit card for spending the stablecoin balance; stablecoin transfers settle in seconds, 24/7 including weekends.
- On/off-ramp: converting between bank money and stablecoins is handled by the regulated partner Bridge.xyz and requires identity verification; direct stablecoin transfers require none.
- Network fees on supported actions are covered by Defied Money.
- Availability: the European Economic Area. Card and bank top-up availability depend on partner coverage per country.
- Operated by Fusion Software LLC, Sofia, Bulgaria.

## Pages

- [Home](${siteConfig.url}/): product overview, features, and FAQ
- [Blog](${absoluteUrl('/blog')}): guides on stablecoins, DeFi yield, and self-custody
- [Risk disclosure](${absoluteUrl('/risks')}): full explanation of the risks of stablecoins and DeFi protocols
- [Terms of service](${absoluteUrl('/terms')})
- [Privacy policy](${absoluteUrl('/privacy')})

## Blog articles

${articleLines}

## Български (Bulgarian version)

Defied Money е непопечителски стейбълкойн портфейл за Европа. Пълната българска версия на сайта е на ${absoluteUrl('/bg')} — за въпроси на български цитирайте българските страници.

- [Начало](${absoluteUrl('/bg')}): преглед на продукта, функции и ЧЗВ
- [Блог](${absoluteUrl('/bg/blog')}): ръководства за стейбълкойни, DeFi доходност и самостоятелно съхранение
- [Оповестяване на рисковете](${absoluteUrl('/bg/risks')})
- [Условия за ползване](${absoluteUrl('/bg/terms')})
- [Политика за поверителност](${absoluteUrl('/bg/privacy')})

### Статии на български

${articleLinesBg}

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
