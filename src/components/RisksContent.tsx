'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

const sectionStyle = { marginBottom: '40px' } as const;
const h2Style = { fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 600, marginBottom: '16px', marginTop: '48px', color: 'var(--ink)' } as const;
const pStyle = { fontSize: '16px', lineHeight: '28px', marginBottom: '16px', color: 'var(--muted)' } as const;
const ulStyle = { paddingLeft: '24px', marginBottom: '16px' } as const;
const liStyle = { fontSize: '16px', lineHeight: '28px', color: 'var(--muted)', marginBottom: '8px' } as const;
const strongStyle = { color: 'var(--ink)', fontWeight: 600 } as const;

export function RisksContent() {
  const { t } = useLanguage();

  return (
    <section style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px' }}>
      <Text font="display1" as="h1" display="block" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px', color: 'var(--ink)' }}>
        {t('risks.title')}
      </Text>
      <Text font="body" as="p" color="fgMuted" style={{ fontSize: '16px', marginBottom: '40px', fontStyle: 'italic' }}>
        {t('risks.lastUpdated')}
      </Text>

      <div style={sectionStyle}>
        <p style={pStyle}>Defied Money (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates defied.money as a non-custodial software interface for supported stablecoin transactions and selected third-party onchain applications on Base. This Risk Disclosure explains the nature of the Services and the risks involved in using them.</p>
        <p style={pStyle}>Please read this document carefully before using the Services. By accessing or using the Services, you acknowledge that you have read, understood, and accepted the risks described herein.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>1. Nature of the Services</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Defied Money is a non-custodial software interface.</p>
        <p style={pStyle}>Defied Money provides software that helps users access supported stablecoins and selected third-party onchain applications. We do not hold customer crypto-assets or control the private keys used to access a user&apos;s wallet. We do not issue, mint or redeem supported stablecoins, and we do not provide investment, legal or tax advice.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Role separation.</p>
        <p style={pStyle}>The relevant issuer determines the issuance, reserves and redemption framework for a stablecoin. Third-party protocols determine the terms, functionality and risks of their applications. Defied Money does not control the underlying third-party protocols that may be accessed through the Services.</p>
        <p style={pStyle}>The Services are not designed to provide:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Custody or safekeeping of crypto-assets on behalf of users</li>
          <li style={liStyle}>Stablecoin issuance, minting or redemption by Defied Money</li>
          <li style={liStyle}>Investment, legal or tax advice</li>
          <li style={liStyle}>A guaranteed-return, savings or deposit product</li>
        </ul>

        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Wallet and protocol interactions.</p>
        <p style={pStyle}>Transactions are authorised from a user&apos;s self-custodial wallet and recorded on the relevant blockchain network. A user may choose to interact with third-party protocols from that wallet. Availability and functionality depend on the relevant wallet infrastructure, blockchain network and third-party protocol.</p>
        <p style={pStyle}>For example:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Supported stablecoin transfers are authorised from the user&apos;s wallet</li>
          <li style={liStyle}>Stablecoin exchanges, where available, may use third-party liquidity or service providers</li>
          <li style={liStyle}>Interactions with decentralised finance protocols are made from the user&apos;s wallet and are governed by those protocols&apos; terms and risks</li>
        </ul>
        <p style={pStyle}>Defied Money provides the interface through which users may access these services. We do not custody wallet assets or control the underlying third-party protocols.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Fiat on-ramp and off-ramp services.</p>
        <p style={pStyle}>Where available, conversion between fiat currency and supported stablecoins is provided by independent third-party service providers, including Bridge.xyz. These services are subject to the provider&apos;s terms, eligibility requirements, identity verification and applicable laws and regulations. Defied Money does not itself hold customer fiat or provide the underlying conversion service.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Virtual card services.</p>
        <p style={pStyle}>Where available, virtual card functionality is provided by Gnosis Pay under its own terms. Defied Money does not issue, operate or manage payment cards or electronic money.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>2. Supported Stablecoins</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>EURC and USDC are supported stablecoins designed to reference the value of the euro and US dollar respectively. Defied Money is not the issuer of these tokens and does not determine their reserves, redemption terms, issuer obligations or regulatory status.</p>
        <p style={pStyle}>Defied Money does not issue, mint, redeem or control either stablecoin. For information about a specific stablecoin, refer to the relevant issuer&apos;s documentation and disclosures.</p>
        <p style={pStyle}>Stablecoins carry risks, including issuer insolvency, reserve mismanagement, de-pegging and regulatory changes. Defied Money makes no representation regarding the ongoing compliance or solvency of an issuer.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>3. Technology and Smart Contract Risk</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Smart contracts are experimental technology.</p>
        <p style={pStyle}>The protocols accessible through Defied Money,including Aave, Compound, Morpho and others,operate via smart contracts deployed on public blockchain networks. Smart contracts are self-executing code that, once deployed, operate autonomously without human intervention. While the protocols surfaced by Defied Money have undergone extensive security audits, no smart contract can be guaranteed to be free from bugs, vulnerabilities, or exploits.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Risks include but are not limited to:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Smart contract vulnerabilities:</span> Bugs or logic errors in smart contract code that could be exploited by malicious actors, potentially resulting in partial or total loss of deposited funds</li>
          <li style={liStyle}><span style={strongStyle}>Oracle failures:</span> Protocols that rely on price oracles may be subject to oracle manipulation attacks, which could result in unintended liquidations or other adverse outcomes</li>
          <li style={liStyle}><span style={strongStyle}>Liquidity risk:</span> In periods of extreme market stress, liquidity in decentralised finance protocols may be insufficient to allow immediate withdrawal of deposited funds</li>
          <li style={liStyle}><span style={strongStyle}>Protocol upgrades and governance:</span> Protocol parameters, including interest rates, collateral requirements, and supported assets, may be changed by protocol governance at any time without Defied Money&apos;s involvement or consent</li>
          <li style={liStyle}><span style={strongStyle}>Blockchain network risk:</span> The Base network, like all blockchain networks, is subject to potential disruptions, forks, congestion, and other technical failures that may prevent or delay transactions</li>
          <li style={liStyle}><span style={strongStyle}>Bridge and cross-chain risk:</span> Cross-chain operations facilitated through LI.FI involve additional layers of smart contract complexity and may carry elevated risk compared to single-chain operations</li>
        </ul>
        <p style={pStyle}>Defied Money does not audit, control, or maintain any of the underlying protocols. We cannot guarantee the security, availability, or continued operation of any third-party protocol. You should conduct your own due diligence before depositing funds into any protocol.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>4. Stablecoin Risk</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>Although stablecoins are designed to maintain a stable value relative to a reference currency, they are not risk-free. Risks associated with stablecoin holdings include:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>De-pegging risk:</span> A stablecoin may lose its peg to the reference currency due to market conditions, issuer insolvency, or reserve mismanagement, resulting in a loss of value</li>
          <li style={liStyle}><span style={strongStyle}>Issuer risk:</span> The issuer of a stablecoin may become insolvent, face regulatory action, or otherwise be unable to honour redemptions</li>
          <li style={liStyle}><span style={strongStyle}>Regulatory risk:</span> Changes in applicable law or regulation may adversely affect the availability, usability, or value of stablecoins in certain jurisdictions</li>
          <li style={liStyle}><span style={strongStyle}>Counterparty risk:</span> Stablecoins held in decentralised finance protocols are subject to the counterparty risk of borrowers in those protocols</li>
        </ul>
        <p style={pStyle}>Funds held in stablecoins or deposited in DeFi protocols are not protected by any National Deposit Guarantee Schemes. Defied Money is not a financial institution and does not offer any form of deposit protection.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>5. Yield and Returns Risk</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>Third-party decentralized finance protocols may display rates for stablecoin balances a user chooses to connect to them. Defied Money does not offer, set or pay any rate. Users must understand the following:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Yields are variable:</span> All yields displayed through the Services reflect current third-party protocol rates at the time of display. These rates fluctuate continuously based on supply and demand dynamics within each protocol and may decrease significantly at any time</li>
          <li style={liStyle}><span style={strongStyle}>Yields are not guaranteed:</span> Past yields are not indicative of future performance. Defied Money makes no representations, warranties, or guarantees regarding the level of yield that may be achieved</li>
          <li style={liStyle}><span style={strongStyle}>Yields are not investment returns:</span> Access to decentralised finance protocol yields through Defied Money does not constitute an investment product, collective investment scheme, or any other regulated financial product. Users are interacting directly with public smart contracts, not investing through Defied Money</li>
          <li style={liStyle}><span style={strongStyle}>Yields may be subject to tax:</span> Returns earned through decentralized protocols may be subject to income tax, capital gains tax, or other taxes in your jurisdiction. You are solely responsible for determining your own tax obligations</li>
        </ul>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>6. Account and Wallet Security Risk</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: 'var(--ink)' }}>Your wallet security is your responsibility.</p>
        <p style={pStyle}>When you register with Defied Money, a non-custodial wallet is created on your behalf through Privy, our wallet infrastructure partner. This wallet is tied to your email address. Defied Money and Privy do not have access to your private keys and cannot recover your wallet on your behalf.</p>
        <p style={pStyle}>The following security risks apply:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Email account compromise:</span> If a third party gains unauthorized access to your email account, they may be able to access your Defied Money wallet. You are strongly advised to use a strong, unique password for your email account and to enable two-factor authentication (2FA) immediately</li>
          <li style={liStyle}><span style={strongStyle}>Phishing attacks:</span> Malicious actors may attempt to impersonate Defied Money through fake websites, emails, or social media accounts in order to obtain your credentials. Always verify that you are accessing the Services through defied.money</li>
          <li style={liStyle}><span style={strongStyle}>Device compromise:</span> If the device you use to access the Services is compromised by malware or unauthorized access, your wallet may be at risk. Keep your devices and software up to date and use reputable security software</li>
          <li style={liStyle}><span style={strongStyle}>Private key export:</span> If you choose to export your private key from Privy, you become solely responsible for its security. Anyone with access to your private key has full control over your wallet and funds</li>
          <li style={liStyle}><span style={strongStyle}>Irreversibility of transactions:</span> All blockchain transactions are final and irreversible. If you send funds to an incorrect wallet address or fall victim to a scam or phishing attack, Defied Money has no ability to reverse or recover the transaction</li>
        </ul>
        <p style={pStyle}>We strongly recommend enabling two-factor authentication on your email account before using the Services.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>7. Regulatory and Legal Risk</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>The regulatory environment for crypto-assets, stablecoins, and decentralized finance is evolving rapidly across the European Union and globally. Changes in applicable law or regulation may:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Restrict or prohibit the use of certain stablecoins or DeFi protocols in certain jurisdictions</li>
          <li style={liStyle}>Impose new obligations on users, including reporting or tax obligations</li>
          <li style={liStyle}>Affect the availability or functionality of the Services in certain jurisdictions</li>
          <li style={liStyle}>Require Defied Money to modify, restrict, or discontinue certain features of the Services</li>
        </ul>
        <p style={pStyle}>Defied Money monitors the regulatory environment and will make reasonable efforts to ensure the Services remain compliant with applicable law. However, we cannot guarantee that the Services will remain available or unchanged in all jurisdictions. Users are responsible for ensuring that their use of the Services complies with the laws of their own jurisdiction.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>8. Operational Risk</Text>
      <div style={sectionStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Service availability:</span> The Services may be unavailable from time to time due to maintenance, technical failures, third-party outages, or other factors beyond our control. Defied Money does not guarantee uninterrupted access to the Services</li>
          <li style={liStyle}><span style={strongStyle}>Third-party dependency:</span> The Services depend on a number of third-party providers, including Privy, Bridge.xyz, Gnosis Pay, LI.FI, and the Base network. Failure or disruption of any of these providers may affect the availability or functionality of the Services</li>
          <li style={liStyle}><span style={strongStyle}>Interface risk:</span> Even where underlying protocols are functioning normally, access through the Defied Money interface may be disrupted. Users may interact with all underlying protocols directly via their wallet at any time</li>
        </ul>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>9. No Deposit Protection</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>Funds held in your Defied Money wallet or deposited in any decentralized protocol are not:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Protected by National Deposit Guarantee Schemes</li>
          <li style={liStyle}>Insured by any government or regulatory body</li>
          <li style={liStyle}>Recoverable by Defied Money in the event of loss</li>
        </ul>
        <p style={pStyle}>You should only use the Services with funds you can afford to lose in their entirety.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>10. Limitation of Liability</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>To the fullest extent permitted by applicable law, Defied Money and its officers, directors, employees, and agents shall not be liable for any loss or damage,including loss of funds, loss of data, or loss of access,arising from:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Smart contract vulnerabilities, exploits, or failures in any third-party protocol</li>
          <li style={liStyle}>De-pegging or failure of any stablecoin</li>
          <li style={liStyle}>Compromise of your email account or wallet credentials</li>
          <li style={liStyle}>Irreversible blockchain transactions, including transactions made in error</li>
          <li style={liStyle}>Unavailability of the Services for any reason</li>
          <li style={liStyle}>Changes in applicable law or regulation</li>
          <li style={liStyle}>Actions or failures of any third-party service provider, including Bridge.xyz, Privy, Gnosis Pay, or LI.FI</li>
          <li style={liStyle}>Any force majeure event</li>
        </ul>
        <p style={pStyle}>Nothing in this Risk Disclosure limits or excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under applicable EU law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>11. Contact Us</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>If you have questions about this Risk Disclosure or about the risks associated with using the Services, please contact us:</p>
        <p style={pStyle}>
          <span style={strongStyle}>Defied Money</span><br />
          hello@defied.money
        </p>
        <p style={pStyle}>For regulatory enquiries, please contact us at the same email address, marking your correspondence clearly as a regulatory enquiry.</p>
      </div>
    </section>
  );
}
