'use client';

import { Text } from '@coinbase/cds-web/typography/Text';
import { useLanguage } from '@/context/LanguageContext';

const sectionStyle = { marginBottom: '40px' } as const;
const h2Style = { fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 600, marginBottom: '16px', marginTop: '48px', color: '#0A0B0D' } as const;
const pStyle = { fontSize: '16px', lineHeight: '28px', marginBottom: '16px', color: '#5B616E' } as const;
const ulStyle = { paddingLeft: '24px', marginBottom: '16px' } as const;
const liStyle = { fontSize: '16px', lineHeight: '28px', color: '#5B616E', marginBottom: '8px' } as const;
const strongStyle = { color: '#0A0B0D', fontWeight: 600 } as const;

export function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <section style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 16px', paddingBottom: '64px' }}>
      <Text font="display1" as="h1" display="block" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, marginTop: 'clamp(48px, 10vw, 120px)', marginBottom: '16px', color: '#0A0B0D' }}>
        {t('privacy.title')}
      </Text>
      <Text font="body" as="p" color="fgMuted" style={{ fontSize: '16px', marginBottom: '40px', fontStyle: 'italic' }}>
        {t('privacy.lastUpdated')}
      </Text>

      <div style={sectionStyle}>
        <p style={pStyle}>Defied operates as a non-custodial software interface providing access to public, permissionless blockchain protocols. Although we may collect and process information about users of defied.money in accordance with this Privacy Policy, we do not have access to information about all protocol interactions beyond what is already publicly available and recorded on the blockchain.</p>
        <p style={pStyle}>This Privacy Policy explains how Fusion Software LLC (&ldquo;Defied,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, uses, and shares information in connection with our services, as well as your rights and choices regarding such information, in accordance with the General Data Protection Regulation (GDPR) and applicable EU data protection law.</p>
        <p style={pStyle}>These terms apply to defied.money, and any other online location that links to this Privacy Policy (collectively, the &ldquo;Services&rdquo;).</p>
        <p style={pStyle}>By using the Services, you agree to our collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree, you should not use or access the Services.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>1. Information We Collect</Text>
      <div style={sectionStyle}>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>A. Information You Provide</p>
        <p style={pStyle}>We may collect the following information when you use the Services:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Correspondence:</span> When you contact us for support or other inquiries, you may share your contact details and contextual information relevant to your issue, such as wallet type, transaction details, device type, or error codes. This helps us respond to your inquiry and improve the Services.</li>
        </ul>
        <p style={pStyle}>You may choose to voluntarily provide other information we have not requested. In such cases, you are solely responsible for that information.</p>

        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D', marginTop: '24px' }}>B. Information Collected Automatically</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Wallet Address:</span> We may collect the wallet address you use to connect to the interface, including to identify wallets associated with legally prohibited conduct and to improve the user experience.</li>
          <li style={liStyle}><span style={strongStyle}>Device Information:</span> We may collect information about the device you use to access the Services, such as device type, operating system, browser type, and screen dimensions. This helps us optimise the interface and troubleshoot technical issues.</li>
          <li style={liStyle}><span style={strongStyle}>Usage Information:</span> We may collect information about how you use the Services, including wallet address, access times, pages visited, features interacted with, links clicked, and search queries. This helps us understand user behaviour and improve the Services continuously.</li>
        </ul>
        <p style={pStyle}>We will not make decisions producing legal effects concerning you based solely on automated processing of your personal data, unless we have expressly concluded in writing that such processing meets the requirements of applicable data protection law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>2. How We Use Your Information</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We collect and use information for legitimate business purposes in accordance with this Privacy Policy, including where necessary for the performance of a contract, compliance with legal obligations, or in pursuit of our legitimate interests. Specifically:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Operating and managing the Services:</span> To make the Services available, respond to your comments and requests, send technical notices and security alerts, detect and prevent fraud, and comply with legal and regulatory requirements.</li>
          <li style={liStyle}><span style={strongStyle}>Improving the Services:</span> To continually improve the Services and fulfil other legitimate business purposes permitted under applicable law.</li>
          <li style={liStyle}><span style={strongStyle}>Security and legal compliance:</span> To maintain the security and integrity of the Services, prevent attacks on our systems, investigate potential wrongdoing, enforce our Terms of Use, and comply with lawful requests and legal process.</li>
          <li style={liStyle}><span style={strongStyle}>Business transfers:</span> In connection with any proposed or actual merger, acquisition, financing, reorganisation, or transfer of all or part of our business or assets.</li>
          <li style={liStyle}><span style={strongStyle}>Fulfilling your requests:</span> To comply with requests or directions you make directly.</li>
          <li style={liStyle}><span style={strongStyle}>Consent:</span> For purposes for which we have obtained your explicit consent, where required by applicable law.</li>
        </ul>
        <p style={pStyle}>We may use information that does not identify you,including aggregated or de-identified data,for any purpose not prohibited by applicable law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>3. Sharing and Disclosure of Information</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We may share or disclose information as described in this Privacy Policy and for the purposes set out in Section 2 above. Categories of parties with whom we may share information include:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Service Providers:</span> Third-party providers supporting our operations, including fraud detection and prevention, security monitoring, data analytics, IT infrastructure, and blockchain transaction monitoring. All service providers are contractually restricted to using your information solely on our behalf and in accordance with our instructions. Current key service providers include Privy (wallet infrastructure), Bridge.xyz (fiat on-ramp and off-ramp), Gnosis Pay (virtual card services), and LI.FI (cross-chain routing).</li>
          <li style={liStyle}><span style={strongStyle}>Professional Advisors:</span> Legal, accounting, and compliance advisors engaged for audits and legal obligations.</li>
          <li style={liStyle}><span style={strongStyle}>Regulatory and Government Authorities:</span> Where we are legally required to share your personal data with relevant regulatory or governmental authorities.</li>
        </ul>
        <p style={pStyle}>We may share information that does not identify you,including aggregated or de-identified data,except as prohibited by applicable law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>4. Third-Party Services</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>The Services may include links to or integrations with websites, platforms, and services not operated or controlled by us. When you interact with those third parties,including when you leave our interface,they may independently collect information about you. Their information practices are governed by their own privacy policies and terms of use, which we encourage you to review.</p>
        <p style={pStyle}>In particular, your use of a third-party wallet to engage with public blockchain networks is governed by that wallet provider&apos;s terms of service and privacy policy.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>5. Cookies</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We use a minimal set of cookies strictly necessary to operate the Services. We do not use advertising cookies or tracking cookies for third-party purposes.</p>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Types of cookies we use:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Strictly Necessary Cookies:</span> Essential for the Services to function, including page navigation and access to secure areas. These do not collect personal information.</li>
          <li style={liStyle}><span style={strongStyle}>Analytical/Performance Cookies:</span> Used to understand how visitors use the Services, helping us improve functionality. Used only with your consent where required.</li>
          <li style={liStyle}><span style={strongStyle}>Functional Cookies:</span> Enable enhanced functionality and personalisation, such as remembering your previously connected wallet.</li>
        </ul>
        <p style={pStyle}>You can control, disable, or delete cookies through your browser settings at any time. For more information, visit <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0052FF' }}>aboutcookies.org</a>.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>6. Analytics</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We use privacy-respecting analytics tools to understand how users interact with the Services. Analytics data helps us improve the Services and analyse usage trends. You may opt out of analytics data collection at any time through the cookie settings on our website or by adjusting your browser settings.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>7. Data Security</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We implement and maintain reasonable administrative, physical, and technical security measures to protect your information from loss, theft, misuse, unauthorised access, disclosure, alteration, and destruction. However, no transmission over the internet is completely secure, and we cannot guarantee the absolute security of your information.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>8. Data Retention</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We retain information only for as long as necessary to fulfil the purposes for which it was collected, as described in this Privacy Policy, and to the extent required by applicable law. Where you request deletion of your information, we may continue to retain it where permitted or required by law, including for legal, tax, or regulatory purposes, or to resolve disputes and enforce our agreements.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>9. International Transfers</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>Fusion Software LLC is incorporated in Bulgaria and operates within the European Union. Information collected through the Services may be transferred to, processed, or stored in the EU and in other jurisdictions where our service providers operate.</p>
        <p style={pStyle}>Where personal data is transferred outside the European Economic Area, we ensure appropriate safeguards are in place in accordance with GDPR requirements, including standard contractual clauses or equivalent mechanisms, where applicable.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>10. Your Rights Under GDPR</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>As a data subject under the GDPR, you have the following rights:</p>
        <ul style={ulStyle}>
          <li style={liStyle}><span style={strongStyle}>Access:</span> Request a copy of the personal data we hold about you.</li>
          <li style={liStyle}><span style={strongStyle}>Rectification:</span> Request correction of inaccurate or incomplete personal data.</li>
          <li style={liStyle}><span style={strongStyle}>Erasure:</span> Request deletion of your personal data in certain circumstances.</li>
          <li style={liStyle}><span style={strongStyle}>Restriction:</span> Request that we restrict processing of your personal data.</li>
          <li style={liStyle}><span style={strongStyle}>Portability:</span> Request transfer of your personal data to you or a third party in a structured, machine-readable format.</li>
          <li style={liStyle}><span style={strongStyle}>Objection:</span> Object to processing of your personal data based on legitimate interests or for direct marketing purposes.</li>
          <li style={liStyle}><span style={strongStyle}>Withdrawal of Consent:</span> Where processing is based on consent, withdraw that consent at any time without affecting the lawfulness of prior processing.</li>
        </ul>
        <p style={pStyle}>Please note that we cannot edit or delete information stored on a public blockchain. This includes transaction data related to your wallet address, which is recorded permanently and publicly on-chain.</p>
        <p style={pStyle}>To exercise any of these rights, please contact us at <a href="mailto:hello@defied.money" style={{ color: '#0052FF' }}>hello@defied.money</a>. We will respond within 30 days. We may require information to verify your identity before processing your request.</p>
        <p style={pStyle}>You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (CPDP) or the supervisory authority in your EU member state of residence.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>11. Lawful Basis for Processing (GDPR)</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We act as a data controller with respect to personal data collected through the Services. Our lawful bases for processing are as follows:</p>
        <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', lineHeight: '24px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E2E4E9', color: '#0A0B0D', fontWeight: 600 }}>Purpose</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid #E2E4E9', color: '#0A0B0D', fontWeight: 600 }}>Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Operating and managing the Services</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Necessary for the performance of our agreement with you</td></tr>
              <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Communicating with you</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Necessary for the performance of our agreement with you</td></tr>
              <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Improving the Services</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Legitimate interests; Consent</td></tr>
              <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Security and legal compliance</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Legal obligation; Legitimate interests</td></tr>
              <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Business transfers</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Legitimate interests; Legal obligation</td></tr>
              <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Other consent-based purposes</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #F0F1F3', color: '#5B616E' }}>Consent</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>12. Children</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>The Services are not directed at children under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us at <a href="mailto:hello@defied.money" style={{ color: '#0052FF' }}>hello@defied.money</a> and we will delete it promptly.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>13. Changes to This Privacy Policy</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>We reserve the right to update this Privacy Policy at any time. Changes take effect immediately upon posting. Your continued use of the Services following any update constitutes your acceptance of the revised policy. We will notify you of material changes where required by applicable law.</p>
      </div>

      <Text font="title2" as="h2" display="block" style={h2Style}>14. Contact Us</Text>
      <div style={sectionStyle}>
        <p style={pStyle}>If you have any questions about this Privacy Policy, our data practices, or your rights, please contact us:</p>
        <p style={{ ...pStyle, fontWeight: 600, color: '#0A0B0D' }}>Fusion Software LLC</p>
        <p style={pStyle}>81B Bulgaria Blvd, Sofia, Bulgaria<br /><a href="mailto:hello@defied.money" style={{ color: '#0052FF' }}>hello@defied.money</a></p>
      </div>
    </section>
  );
}
