'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

const sectionStyle = { marginBottom: '40px' } as const;
const h2Style = { fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 600, marginBottom: '16px', marginTop: '48px', color: '#0A0B0D' } as const;
const pStyle = { fontSize: '16px', lineHeight: '28px', marginBottom: '16px', color: '#5B616E' } as const;
const ulStyle = { paddingLeft: '24px', marginBottom: '16px' } as const;
const liStyle = { fontSize: '16px', lineHeight: '28px', color: '#5B616E', marginBottom: '8px' } as const;
const strongStyle = { color: '#0A0B0D', fontWeight: 600 } as const;
const capsStyle = { fontSize: '15px', lineHeight: '26px', marginBottom: '16px', color: '#5B616E' } as const;

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <section style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px' }}>
      <Text font="display1" as="h1" display="block" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px', color: '#0A0B0D' }}>
        {t('terms.title')}
      </Text>
      <Text font="body" as="p" color="fgMuted" style={{ fontSize: '16px', marginBottom: '40px', fontStyle: 'italic' }}>
        {t('terms.lastUpdated')}
      </Text>

      <Text font="title2" as="h2" display="block" style={h2Style}>1. Introduction</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of defied.money, app.defied.money, and any other online location that links to these Terms (collectively, the &ldquo;Services&rdquo;). The Services are provided by Fusion Software LLC (&ldquo;Defied,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), incorporated in Bulgaria.</p>
        <p style={pStyle}>Defied provides a non-custodial software interface that connects users to public, permissionless smart contracts deployed on the Base blockchain network. Defied does not control or operate any of the underlying protocols accessible through the Services, including Aave, Compound, Morpho, Lido, or any other third-party decentralized protocol.</p>
        <p style={pStyle}>By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not access or use the Services.</p>
        <p style={pStyle}>We may update these Terms at any time. Continued use of the Services after any update constitutes your acceptance of the revised Terms.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>2. Eligibility</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>To use the Services, you must be legally capable of entering into a binding agreement under the laws of your jurisdiction. By using the Services, you represent and warrant that you meet this requirement. If you do not, you must not access or use the Services.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>3. Nature of the Services</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Defied is a software interface, not a financial institution.</p>
        <p style={pStyle}>The Services provide a front-end interface through which users may interact with public, permissionless blockchain protocols via their self-custodial wallets. All information provided through the Services is for informational purposes only. Nothing on the Services constitutes financial, investment, legal, or tax advice. You should not make any financial decision based solely on information available through the Services.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>You retain full control over your assets at all times.</p>
        <p style={pStyle}>Defied is not a party to any transaction on any blockchain network. We do not have possession, custody, or control over any cryptoassets or user funds at any time. When you interact with any protocol through the Services, you retain full control over your assets.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>We are not intermediaries.</p>
        <p style={pStyle}>Due to the non-custodial and decentralized nature of the technology, Defied is not an intermediary, agent, advisor, or custodian, and we do not have a fiduciary relationship or obligation to you regarding any decisions, actions, or transactions you make when using the Services. You are solely responsible for ensuring the accuracy, legality, and appropriateness of your interactions with any third-party protocol or smart contract.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Wallet infrastructure is provided by third parties.</p>
        <p style={pStyle}>To use the Services, you will interact with a self-custodial wallet created and managed through Privy, a third-party wallet infrastructure provider. Your use of Privy is subject to Privy&apos;s own terms and conditions. Defied has no access to your private keys or wallet credentials.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Fiat on-ramp and off-ramp services are provided by Bridge.xyz.</p>
        <p style={pStyle}>The conversion of fiat currency (euros or dollars) to and from stablecoins is facilitated by Bridge.xyz, a regulated third-party service provider. Your use of these services is subject to Bridge.xyz&apos;s terms and conditions and applicable regulatory requirements, including identity verification.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Virtual card services are provided by Gnosis Pay.</p>
        <p style={pStyle}>Virtual debit card functionality is provided by Gnosis Pay. Your use of the card is subject to Gnosis Pay&apos;s terms and conditions.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Blockchain transactions may incur fees.</p>
        <p style={pStyle}>Transactions on blockchain networks may be subject to network fees (such as gas fees) imposed by third parties. Certain protocols or services accessible through the Services may also charge their own fees. Some blockchain fees are non-refundable regardless of the outcome of a transaction. You are solely responsible for understanding and bearing all costs associated with your use of the Services.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>We have no information beyond what is publicly available on-chain.</p>
        <p style={pStyle}>We do not have access to information regarding all protocol interactions beyond what is publicly available and recorded on the relevant blockchain.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>4. Assumption of Risk</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Blockchain technology is experimental and carries significant risk.</p>
        <p style={pStyle}>Smart contracts, cryptoassets, and other blockchain-based systems are experimental, speculative, and subject to change. Bugs, malfunctions, cyberattacks, or changes to the underlying blockchain (such as forks) could disrupt these technologies and result in partial or total loss of funds. Defied assumes no liability for any such risks.</p>
        <p style={pStyle}>If you are not comfortable assuming these risks, you should not use the Services.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>All blockchain transactions are irreversible.</p>
        <p style={pStyle}>You acknowledge that all transactions on blockchain networks are final and irreversible. Defied has no ability to reverse, cancel, or recover any transaction once it has been submitted to the blockchain.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>You are solely responsible for your wallet security.</p>
        <p style={pStyle}>You are solely responsible for maintaining the security of your self-custodial wallet and any associated credentials. Defied has no access to your private keys and cannot assist in recovering lost or compromised wallets. Unauthorized access to your wallet by third parties could result in the permanent loss of your funds.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Third-party protocols carry their own risks.</p>
        <p style={pStyle}>Defied only surfaces protocols with established audit histories, but we cannot guarantee that any protocol will remain free from exploits, bugs, or other failures. We do not endorse any protocol as risk-free. You should conduct your own due diligence before depositing funds into any protocol.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Yields are variable and not guaranteed.</p>
        <p style={pStyle}>Any yields or returns referenced through the Services reflect current third-party protocol rates and are subject to change at any time based on market conditions. Past performance is not indicative of future results. Yields do not constitute guaranteed returns or investment products.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>We may restrict access to the Services.</p>
        <p style={pStyle}>We reserve the right to restrict your access to the Services, at our sole discretion, if we have reasonable grounds to believe that you are:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Using the Services for money laundering, terrorist financing, or any other illegal activity</li>
          <li style={liStyle}>Subject to sanctions administered by the European Union, United Nations, or any other applicable regulatory authority</li>
          <li style={liStyle}>Located in a jurisdiction where use of the Services is prohibited or restricted by applicable law</li>
          <li style={liStyle}>In breach of these Terms in any way</li>
        </ul>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>5. Taxes</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>You are solely responsible for determining and paying any taxes, duties, or assessments arising from your use of the Services or your interactions with any blockchain protocol. The tax treatment of cryptoasset transactions is uncertain and may vary by jurisdiction. Defied does not provide tax advice.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>6. Intellectual Property</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>License to use the Services.</p>
        <p style={pStyle}>Subject to your ongoing compliance with these Terms, we grant you a personal, non-exclusive, non-transferable, revocable license to access and use the Services solely as permitted by these Terms.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>We own all rights in the Services.</p>
        <p style={pStyle}>All right, title, and interest in and to the Services, including all content, code, data, and materials, belongs to Fusion Software LLC. Your use of the Services does not grant you any ownership or rights beyond the limited license set out above.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Feedback.</p>
        <p style={pStyle}>Any feedback, suggestions, or ideas you provide about the Services are entirely voluntary. You agree that we may use such feedback freely without any obligation to you.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>7. Prohibited Conduct</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>You may only use the Services in compliance with these Terms and all applicable laws. The following conduct is strictly prohibited:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Using the Services for money laundering, terrorist financing, tax evasion, sanctions violations, or any other illegal purpose</li>
          <li style={liStyle}>Using the Services to purchase or facilitate the purchase of illegal goods or services</li>
          <li style={liStyle}>Uploading or transmitting viruses, malware, or any other harmful code</li>
          <li style={liStyle}>Attempting to reverse engineer, disassemble, or derive the source code of any part of the Services</li>
          <li style={liStyle}>Scraping, mining, or collecting data from the Services through automated means without authorization</li>
          <li style={liStyle}>Impersonating any person or entity or using false credentials</li>
          <li style={liStyle}>Interfering with other users&apos; access to or use of the Services</li>
          <li style={liStyle}>Attempting to circumvent security features, access restrictions, or technical limitations of the Services</li>
          <li style={liStyle}>Attacking, exploiting, or manipulating any smart contract or protocol accessible through the Services</li>
          <li style={liStyle}>Any conduct that violates the spirit or intent of these Terms, as determined by us in our sole discretion</li>
        </ul>
        <p style={pStyle}>Violation of these prohibitions may result in immediate suspension or permanent termination of your access to the Services. We reserve the right to investigate suspected violations and to disclose information as required by applicable law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>8. Disclaimers</Text>
      <div style={sectionStyle}>
        <p style={capsStyle}>THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, FUSION SOFTWARE LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS (&ldquo;DEFIED PARTIES&rdquo;) DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        <p style={capsStyle}>THE DEFIED PARTIES ARE NOT RESPONSIBLE FOR:</p>
        <ul style={ulStyle}>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>THE ACCURACY, COMPLETENESS, OR TIMELINESS OF ANY INFORMATION PROVIDED THROUGH THE SERVICES</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY LOSS OR DAMAGE ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICES</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY LOSS OF FUNDS RESULTING FROM SMART CONTRACT VULNERABILITIES, BLOCKCHAIN FAILURES, CYBERATTACKS, OR THIRD-PARTY SERVICE FAILURES</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY UNAUTHORIZED ACCESS TO YOUR WALLET OR FUNDS</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY INTERRUPTION OR UNAVAILABILITY OF THE SERVICES FOR ANY REASON</li>
        </ul>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>9. Limitation of Liability</Text>
      <div style={sectionStyle}>
        <p style={capsStyle}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE DEFIED PARTIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, FUNDS, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING FROM:</p>
        <ul style={ulStyle}>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>YOUR USE OF OR INABILITY TO USE THE SERVICES</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY UNAUTHORIZED ACCESS TO OR USE OF THE SERVICES</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY TRANSACTION CONDUCTED THROUGH OR IN CONNECTION WITH THE SERVICES</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY CHANGE IN VALUE OF ANY CRYPTOASSET</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY THIRD-PARTY CONDUCT, SERVICE, OR CONTENT</li>
          <li style={{ ...liStyle, fontSize: '15px', lineHeight: '26px' }}>ANY FORCE MAJEURE EVENT</li>
        </ul>
        <p style={capsStyle}>WHERE LIABILITY CANNOT BE EXCLUDED UNDER APPLICABLE EU LAW, THE TOTAL AGGREGATE LIABILITY OF THE DEFIED PARTIES TO YOU SHALL NOT EXCEED €100 OR THE AMOUNT YOU PAID TO USE THE SERVICES IN THE THREE MONTHS PRECEDING THE CLAIM, WHICHEVER IS GREATER.</p>
        <p style={pStyle}>Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be limited under applicable EU law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>10. Indemnification</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>You agree to indemnify, defend, and hold harmless the Defied Parties from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from:</p>
        <ul style={ulStyle}>
          <li style={liStyle}>Your breach of these Terms</li>
          <li style={liStyle}>Your misuse of the Services</li>
          <li style={liStyle}>Your violation of any applicable law or regulation</li>
          <li style={liStyle}>Your violation of any third party&apos;s rights</li>
          <li style={liStyle}>Any misrepresentation made by you</li>
        </ul>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>11. Dispute Resolution</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Good faith negotiation.</p>
        <p style={pStyle}>Before initiating any legal proceedings, you agree to first attempt to resolve any dispute with us informally by contacting us at <a href="mailto:hello@defied.money" style={{ color: '#0052FF' }}>hello@defied.money</a>. We will attempt to resolve the dispute within 30 days of receiving written notice.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Governing law and jurisdiction.</p>
        <p style={pStyle}>These Terms and any disputes arising from them shall be governed by and construed in accordance with the laws of the Republic of Bulgaria and applicable EU law. Any disputes that cannot be resolved informally shall be submitted to the exclusive jurisdiction of the competent courts of Sofia, Bulgaria, unless mandatory consumer protection laws in your country of residence provide otherwise.</p>
        <p style={pStyle}>If you are a consumer resident in the EU, you may also have the right to submit a complaint to an alternative dispute resolution body. The European Commission&apos;s Online Dispute Resolution platform is available at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: '#0052FF' }}>https://ec.europa.eu/consumers/odr</a>.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>12. Termination</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>These Terms remain in effect until terminated by either you or us. You may terminate your agreement with us at any time by ceasing all use of the Services.</p>
        <p style={pStyle}>We reserve the right to suspend or permanently terminate your access to the Services at any time, with or without notice, if we reasonably believe that you have violated these Terms, that your use of the Services creates legal or regulatory risk for us, or that it is no longer commercially viable to provide the Services to you.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>13. Severability</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>14. Assignment</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We may assign our rights and obligations under these Terms without your prior consent in connection with a merger, acquisition, or sale of all or substantially all of our assets. You may not assign your rights or obligations under these Terms without our prior written consent.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>15. Entire Agreement</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Defied with respect to the Services and supersede all prior agreements and understandings.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>16. Contact Us</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>If you have any questions about these Terms, please contact us:</p>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Fusion Software LLC</p>
        <p style={pStyle}>81B Bulgaria Blvd, Sofia, Bulgaria<br /><a href="mailto:hello@defied.money" style={{ color: '#0052FF' }}>hello@defied.money</a></p>
      </div>
    </section>
  );
}
