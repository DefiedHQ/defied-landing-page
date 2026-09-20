import articles from '@/data/articles-en.json';
import { siteConfig, absoluteUrl } from '@/lib/seo';

// Statically generated at build time; regenerates whenever articles change.
export const dynamic = 'force-static';

/**
 * llms.txt (https://llmstxt.org) - a concise, markdown-formatted summary of
 * the site for LLMs and AI agents. Complements robots.ts, which already
 * allows the major AI crawlers.
 *
 * Written to be quotable: short declarative facts, one idea per line, the
 * same wording as the landing page so an answer engine that cites either
 * source says the same thing. No rates or yields are stated anywhere, by
 * design - they are variable and set by third-party protocols.
 */
export function GET() {
  const articleLines = articles
    .map(
      (a) =>
        `- [${a.title}](${absoluteUrl(`/blog/${a.id}`)}): ${a.excerpt} (${a.date})`
    )
    .join('\n');

  const home = siteConfig.url;

  const body = `# Defied Money

> Defied Money is a self-custodial wallet for digital euros and dollars (the EURC and USDC stablecoins) on the Base network. You can hold them, send them to people in seconds, exchange between euros and dollars, and put your balance to work in open onchain lending markets such as Aave and Fluid, all from a wallet only you control. Defied Money never holds user funds.

## What it is

- A non-custodial wallet and software interface, not a bank, an e-money institution or an exchange.
- Sign-in is with an email address or a Google account. An embedded onchain wallet (created through Privy) is tied to that login. There is no seed phrase to write down.
- The wallet's private key can be exported by the user at any time and used outside Defied Money. Defied Money cannot access, move or freeze funds.
- Supported assets: USDC (digital dollars) and EURC (digital euros), both issued by Circle on the Base network. Circle mints and redeems them and publishes what backs them. Defied Money does not issue, redeem or back either token.
- Stablecoins held in a self-custodial wallet are not bank deposits and are not covered by any national deposit guarantee scheme.

## What you can do

- Send: transfer EURC or USDC to anyone, any day of the year, settling in seconds. Network fees and limits may apply.
- Receive: accept EURC or USDC from any wallet or app on Base.
- Exchange: move between euros and dollars in a couple of taps, with the rate shown before you confirm. Exchanges run through independent providers under their terms.
- Onchain markets: deposit into and withdraw from selected public lending protocols (Aave, Compound, Fluid and YO) straight from the wallet, if you choose to. Rates are set by each protocol, move with the market and are never guaranteed. Withdrawals depend on market liquidity. This is not an investment product.
- Bank top-up and withdrawal (SEPA), where available, through the regulated partner Bridge.xyz. Requires a one-time identity verification.
- Virtual Visa debit card, where available, through Gnosis Pay. Requires identity verification.
- Network fees on supported actions are covered by Defied Money.

## How it compares

| | Bank | Fintech app | Defied Money |
|---|---|---|---|
| Only you hold the keys | No | No | Yes |
| Sends settle in seconds, any day of the year | Partly | Partly | Yes |
| Money you can use in other onchain apps | No | No | Yes |
| Access to open onchain markets | No | No | Yes |
| Your money stays yours if the company shuts down | No | No | Yes |
| Get started without an identity check | No | No | Yes (verification only for bank top-ups and the card) |
| Covered by a deposit guarantee | Yes | Partly | No |

Banks and fintech apps differ; this shows the typical model.

## Self-custody, in practice

- Your key, yours to export: created at sign-up, exportable any time, never held by Defied Money.
- Sign in without a seed phrase: email or Google account; nothing to write down, photograph or lose.
- Verification only where a bank needs it: holding, sending and exchanging need no identity check. Bank transfers and the card do, run by the regulated providers behind them.
- Money and markets you can inspect: Circle publishes its reserves; onchain deposits go only to protocols with public, audited smart contracts.
- Automation Defied Money runs on a user's behalf, such as covering network fees, is bound by policies set on the wallet.

## How it works

1. Create your wallet: sign up with your email. The wallet is yours from the first second.
2. Add digital euros or dollars: receive EURC or USDC from anywhere, or top up from your bank where available.
3. Use it for real life: send, exchange, or put your balance to work in onchain markets.

## Availability

- Web app at https://app.defied.money, optimised for desktop and mobile browsers. Native iOS and Android apps are on a waitlist.
- Intended for users in the European Economic Area. Bank top-up and card availability depend on partner coverage per country.

## Risks

Digital assets and decentralised protocols involve risk, including loss of assets, smart-contract vulnerabilities and variable rates. Holdings are not bank deposits and are not covered by deposit guarantees. Full text: [Risk Disclosure](${absoluteUrl('/risks')}).

## Pages

- [Home](${home}/): product overview. Sections: [Features](${home}/#features), [How it compares](${home}/#compare), [How it works](${home}/#how-it-works), [What are stablecoins](${home}/#stablecoins), [Open markets](${home}/#earning), [Self-custodial by design](${home}/#safety), [FAQ](${home}/#faq)
- [Blog](${absoluteUrl('/blog')}): guides on stablecoins, decentralised finance and self-custody
- [Risk Disclosure](${absoluteUrl('/risks')}): the risks of stablecoins, self-custodial wallets and third-party onchain protocols
- [Terms of Use](${absoluteUrl('/terms')})
- [Privacy Policy](${absoluteUrl('/privacy')})
- [Sitemap](${absoluteUrl('/sitemap.xml')})

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
