import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Data Privacy Statement</h1>
          <div className="privacy-meta">
            <div className="meta-item">
              <span className="meta-label">Classification:</span>
              <span className="meta-value">Public</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Effective Date:</span>
              <span className="meta-value">01 December 2025</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Last Review Date:</span>
              <span className="meta-value">01 December 2025</span>
            </div>
          </div>
        </div>

        <div className="privacy-content">
          <div className="notice-box">
            <div className="notice-icon">ℹ️</div>
            <p>
              <strong>Important:</strong> This Data Privacy Statement explains how Weba Infinity Solutions Ltd 
              collects, uses, processes, stores, shares, and protects personal data. Please read it carefully.
            </p>
          </div>

          <section className="privacy-section">
            <h2>1.0 Introduction</h2>
            <p>
              Your privacy is important to us. This Data Privacy Statement explains how Weba Infinity Solutions Ltd, 
              operating as an Internet Service Provider under the brand name WeBANet, collects, uses, processes, stores, 
              shares, and protects personal data.
            </p>
            <p>
              This Statement should be read together with WeBANet's Terms and Conditions for internet services 
              (wired and wireless), public Wi-Fi usage terms, and any other applicable service-specific notices. 
              Where there is a conflict, this Statement shall prevail.
            </p>
            <p>
              This Statement applies to all subscribers, customers, hotspot users, employees, agents, contractors, 
              suppliers, partners, and visitors interacting with Weba Infinity Solutions and WeBANet services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2.0 Definitions</h2>
            <div className="definition-list">
              <div className="definition-item">
                <h3>2.1 "You" means:</h3>
                <ul>
                  <li>Any person who subscribes to, accesses, or uses WeBANet wired or wireless internet services;</li>
                  <li>Any user of WeBANet public or private Wi-Fi hotspots;</li>
                  <li>Any agent, reseller, contractor, supplier, or partner engaged by Weba Infinity Solutions;</li>
                  <li>Any visitor to Weba Infinity Solutions or WeBANet premises.</li>
                </ul>
              </div>
              <div className="definition-item">
                <h3>2.2 "Weba Infinity Solutions Ltd", "WeBANet", "we", "us", "our" means</h3>
                <p>
                  Weba Infinity Solutions Ltd, a Data Controller and, where applicable, a Data Processor under 
                  the Kenya Data Protection Act, 2019.
                </p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>3.0 Statement Details</h2>
            
            <div className="subsection">
              <h3>3.1 Collection of Information</h3>
              <p>We collect personal data with your knowledge and where applicable consent when you:</p>
              <ol className="lettered-list">
                <li>Register for wired (fiber/Ethernet) or wireless (radio/Wi-Fi) internet services;</li>
                <li>Use WeBANet public Wi-Fi hotspots or captive portals;</li>
                <li>Purchase, renew, or manage internet subscriptions;</li>
                <li>Make payments via M-Pesa or other supported payment methods;</li>
                <li>Contact us for customer support, technical assistance, or complaints;</li>
                <li>Visit or use our websites, self-care portals, or mobile platforms;</li>
                <li>Interact with us as an employee, contractor, reseller, or supplier;</li>
                <li>Visit our offices or network facilities.</li>
              </ol>
              <p>
                We do not knowingly provide services to minors except where a parent or legal guardian 
                registers and assumes responsibility.
              </p>
            </div>

            <div className="subsection">
              <h3>3.2 What Information is Collected</h3>
              <p>The personal data we collect may include but is not limited to:</p>
              
              <div className="data-category">
                <h4>3.2.1 Identification data:</h4>
                <p>name, national ID or passport number, phone number, email address, physical and installation address;</p>
              </div>
              
              <div className="data-category">
                <h4>3.2.2 Billing and payment data:</h4>
                <p>M-Pesa numbers, transaction references, invoices, subscription history;</p>
              </div>
              
              <div className="data-category">
                <h4>3.2.3 Network and usage data:</h4>
                <p>IP addresses, MAC addresses, device identifiers, login/logout timestamps, bandwidth usage, session duration;</p>
              </div>
              
              <div className="data-category">
                <h4>3.2.4 Public Wi-Fi and captive portal data:</h4>
                <p>phone numbers or email addresses used for authentication, acceptance of terms and consent records;</p>
              </div>
              
              <div className="data-category">
                <h4>3.2.5 Customer support data:</h4>
                <p>call recordings, emails, messages, tickets, and service history;</p>
              </div>
              
              <div className="data-category">
                <h4>3.2.6 CCTV recordings:</h4>
                <p>at offices and network sites for security and safety purposes;</p>
              </div>
              
              <div className="data-category">
                <h4>3.2.7 Employee, contractor, and supplier data:</h4>
                <p>where applicable for operational and legal purposes.</p>
              </div>
              
              <p>
                We do not monitor the content of customer communications but may log traffic metadata as 
                required for service delivery, security, and lawful compliance.
              </p>
            </div>

            <div className="subsection">
              <h3>3.3 Use of Information</h3>
              <p>We may use and analyse personal data for the following purposes:</p>
              <ol className="lettered-list">
                <li>Provision, management, and maintenance of wired and wireless internet services;</li>
                <li>Billing, payments, account management, and debt recovery;</li>
                <li>Customer support, fault resolution, and service improvement;</li>
                <li>Network security, fraud prevention, and misuse detection;</li>
                <li>Compliance with legal, regulatory, and ODPC requirements;</li>
                <li>Marketing and service communications where consent has been provided;</li>
                <li>Research, analytics, and service optimization using anonymised or aggregated data.</li>
              </ol>
            </div>

            <div className="subsection">
              <h3>3.4 Categories of Data</h3>
              <p>
                Weba Infinity processes personal data categories as defined under the Kenya Data Protection Act, 2019, 
                including general and, where strictly necessary, sensitive personal data in accordance with the law.
              </p>
            </div>

            <div className="subsection">
              <h3>3.5 Lawful Basis for Processing</h3>
              <p>We process personal data based on one or more lawful bases:</p>
              <ul>
                <li>Performance of a service or subscription contract;</li>
                <li>Compliance with a legal or regulatory obligation;</li>
                <li>Legitimate interests such as network security and service reliability;</li>
                <li>Consent provided by you;</li>
                <li>Public interest or protection of vital interests where applicable.</li>
              </ul>
            </div>

            <div className="subsection">
              <h3>3.6 Retention of Information</h3>
              <p>
                We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, 
                including legal, regulatory, accounting, and security requirements. Network logs and Wi-Fi access records 
                are retained for limited periods in line with regulatory and operational needs. Anonymised data may be 
                retained indefinitely.
              </p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>4.0 Disclosure of Information</h2>
            <p>We may disclose personal data only in accordance with applicable law, including to:</p>
            <ol className="lettered-list">
              <li>Law enforcement agencies, regulators, or courts with lawful authority;</li>
              <li>Payment service providers and billing partners;</li>
              <li>Network equipment vendors and managed service providers under data processing agreements;</li>
              <li>Professional advisers and auditors;</li>
              <li>Any other party where disclosure is legally required or consented to.</li>
            </ol>
            <p>We do not sell personal data or disclose it beyond lawful mandate.</p>
          </section>

          <section className="privacy-section">
            <h2>5.0 Direct Marketing</h2>
            <p>
              Marketing communications shall only be sent where you have provided consent. You may opt out at any time 
              without affecting your access to core internet services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6.0 Cookies and Online Platforms</h2>
            <p>
              Our websites and portals may use cookies and similar technologies to improve user experience, security, 
              and performance. You may control cookies through your browser settings, noting that some features may be 
              affected.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7.0 Access to and Updating Your Information</h2>
            <p>
              You may request access, correction, or updating of your personal data by contacting us using the 
              details provided below.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8.0 Safeguarding and Protection of Information</h2>
            <p>
              We have implemented technical and organisational measures including access controls, encryption, 
              network security monitoring, physical security, and staff training to protect personal data.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9.0 International Data Transfers</h2>
            <p>
              Where personal data is transferred outside Kenya, we ensure appropriate safeguards are in place in 
              accordance with the Data Protection Act and ODPC guidance.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10.0 Your Rights</h2>
            <p>Subject to legal limitations, you have the right to:</p>
            <div className="rights-grid">
              <div className="right-item">
                <div className="right-icon">📋</div>
                <span>Be informed</span>
              </div>
              <div className="right-item">
                <div className="right-icon">🔍</div>
                <span>Access your personal data</span>
              </div>
              <div className="right-item">
                <div className="right-icon">✏️</div>
                <span>Rectify inaccurate data</span>
              </div>
              <div className="right-item">
                <div className="right-icon">🗑️</div>
                <span>Request erasure where applicable</span>
              </div>
              <div className="right-item">
                <div className="right-icon">⛔</div>
                <span>Object to or restrict processing</span>
              </div>
              <div className="right-item">
                <div className="right-icon">↩️</div>
                <span>Withdraw consent</span>
              </div>
              <div className="right-item">
                <div className="right-icon">📤</div>
                <span>Request data portability</span>
              </div>
              <div className="right-item">
                <div className="right-icon">📢</div>
                <span>Lodge a complaint with ODPC</span>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>11.0 How to Contact Us</h2>
            <div className="contact-info">
              <h3>Weba Infinity Solutions Ltd (WeBANet)</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">Webasolutions@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <span className="contact-value">0730762762</span>
                </div>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2>12.0 Right to Lodge a Complaint</h2>
            <p>
              You have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC), Kenya.
            </p>
            <div className="complaint-info">
              <p><strong>Office of the Data Protection Commissioner (ODPC)</strong></p>
              <p>Email: info@odpc.go.ke | Website: www.odpc.go.ke</p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>13.0 Non-Compliance</h2>
            <p>
              Failure to comply with this Statement may result in suspension or termination of services where 
              legally permissible.
            </p>
          </section>

          <section className="privacy-section">
            <h2>14.0 Amendments</h2>
            <p>
              Weba Infinity Solutions reserves the right to amend this Data Privacy Statement at any time. 
              Updated versions will be published through official WeBANet channels.
            </p>
          </section>

          <section className="privacy-appendix">
            <h2>Appendix A: Short Wi‑Fi Hotspot Privacy Notice</h2>
            <div className="hotspot-notice">
              <h3>WeBANet Public Wi‑Fi – Privacy Notice</h3>
              
              <div className="notice-point">
                <h4>Service Provider</h4>
                <p>WeBANet public Wi‑Fi is provided by Weba Infinity Solutions Ltd.</p>
              </div>
              
              <div className="notice-point">
                <h4>Data Collection</h4>
                <p>When you access or use this Wi‑Fi service, we may collect and process limited personal data including:</p>
                <ul>
                  <li>Phone number or email address used for login or authentication;</li>
                  <li>Device identifiers such as IP address and MAC address;</li>
                  <li>Connection logs including login time, session duration, and bandwidth usage.</li>
                </ul>
              </div>
              
              <div className="notice-point">
                <h4>Purpose of Collection</h4>
                <p>We collect this data for the purposes of:</p>
                <ul>
                  <li>Providing and securing Wi‑Fi internet access;</li>
                  <li>Preventing fraud, misuse, and unlawful activity;</li>
                  <li>Network performance monitoring and troubleshooting;</li>
                  <li>Compliance with applicable Kenyan laws and regulatory requirements.</li>
                </ul>
              </div>
              
              <div className="notice-point">
                <h4>Important Note</h4>
                <p><strong>We do not monitor the content of your communications.</strong></p>
              </div>
              
              <div className="acceptance-box">
                <div className="acceptance-icon">✅</div>
                <p>
                  <strong>By connecting to this Wi‑Fi network,</strong> you acknowledge that you have read and 
                  understood this notice and agree to the processing of your personal data as described in the 
                  Weba Infinity / WeBANet Data Privacy Statement.
                </p>
              </div>
              
              <div className="contact-info">
                <h4>For more information or to exercise your data protection rights, contact:</h4>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Company:</span>
                    <span className="contact-value">Weba Infinity Solutions Ltd (WeBANet)</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <span className="contact-value">Webasolutions@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="acknowledgement">
            <p>
              <strong>This Data Privacy Statement is compliant with the Kenya Data Protection Act, 2019.</strong>
            </p>
            <p className="last-updated">Last Updated: 01 December 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;