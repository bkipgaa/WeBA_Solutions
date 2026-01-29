import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy & Data Protection Statement</h1>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="text-sm text-gray-500">Effective Date:</span>
                <span className="ml-2 font-medium">01 December 2025</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Version:</span>
                <span className="ml-2 font-medium">2.0</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Classification:</span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Public</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Important:</strong> This Privacy Policy complies with global data protection regulations including GDPR, CCPA, Kenya Data Protection Act 2019, and other applicable laws. We are committed to protecting your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents (for better navigation) */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'Introduction & Scope',
              'Data We Collect',
              'How We Use Your Data',
              'Legal Basis for Processing',
              'Data Sharing & Third Parties',
              'International Data Transfers',
              'Data Security',
              'Your Rights',
              'SMS Communications',
              'Contact Information'
            ].map((item, index) => (
              <a 
                key={index}
                href={`#section-${index + 1}`}
                className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Updated Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section id="section-1" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction & Scope</h2>
            <p className="text-gray-700 mb-3">
              Weba Infinity Solutions Ltd (operating as WeBANet) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our services.
            </p>
            <p className="text-gray-700 mb-3">
              This policy applies to all our services including fixed broadband, hotspot services, SMS communications, and any other services provided by WeBANet.
            </p>
            <p className="text-gray-700">
              <strong>Compliance Status:</strong> We comply with:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
              <li>General Data Protection Regulation (GDPR) - European Union</li>
              <li>California Consumer Privacy Act (CCPA) - United States</li>
              <li>Kenya Data Protection Act, 2019</li>
              <li>Data Protection Act 2018 - United Kingdom</li>
              <li>Other applicable global data protection laws</li>
            </ul>
          </section>

          {/* Section 2 - Data Collection */}
          <section id="section-2" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data We Collect</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Personal Data You Provide</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Name, email address, phone number</li>
                <li>National ID/Passport number (for KYC compliance)</li>
                <li>Physical address and installation location</li>
                <li>Payment information (M-Pesa numbers, transaction records)</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Data Collected Automatically</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>IP addresses and MAC addresses</li>
                <li>Device information (type, operating system, browser)</li>
                <li>Network usage data and session information</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Location data (for service delivery and compliance)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2.3 SMS-Specific Data</h3>
              <p className="text-gray-700 mb-2">For SMS communications, we collect and process:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Phone numbers for message delivery</li>
                <li>Message content (stored encrypted and for limited time)</li>
                <li>Delivery status and timestamps</li>
                <li>Opt-in/opt-out preferences</li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Legal Basis */}
          <section id="section-4" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing (GDPR Article 6)</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Contractual Necessity</h4>
                <p className="text-gray-700">Processing necessary for service delivery and contract fulfillment.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Legal Obligation</h4>
                <p className="text-gray-700">Processing required by law (e.g., tax, regulatory compliance).</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Legitimate Interests</h4>
                <p className="text-gray-700">Processing for network security, fraud prevention, and service improvement.</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-800">Consent</h4>
                <p className="text-gray-700">Processing based on your explicit consent (e.g., marketing communications).</p>
              </div>
            </div>
          </section>

          {/* Section 4 - Third Parties */}
          <section id="section-5" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Data Sharing</h2>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">We share data with third parties only when necessary:</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Third Party</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Protection</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">SMS Gateway Providers</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Message delivery and routing</td>
                      <td className="px-4 py-3 text-sm text-gray-700">DPA signed, GDPR compliant</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Payment Processors</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Payment processing</td>
                      <td className="px-4 py-3 text-sm text-gray-700">PCI-DSS compliant</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Cloud Service Providers</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Data hosting and storage</td>
                      <td className="px-4 py-3 text-sm text-gray-700">ISO 27001 certified</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Regulatory Authorities</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Legal compliance</td>
                      <td className="px-4 py-3 text-sm text-gray-700">As required by law</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 5 - SMS Communications */}
          <section id="section-9" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. SMS Communications</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">9.1 Consent for SMS Communications</h3>
                <p className="text-gray-700">
                  We will only send SMS communications where we have obtained your explicit opt-in consent. You can withdraw consent at any time by:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                  <li>Replying STOP to any SMS message</li>
                  <li>Updating preferences in your Self-care Portal</li>
                  <li>Contacting our customer support</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">9.2 SMS Compliance Standards</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>TCPA (Telephone Consumer Protection Act) - US compliance</li>
                  <li>PECR (Privacy and Electronic Communications Regulations) - UK</li>
                  <li>CTA (Canadian Telecommunications Association) guidelines</li>
                  <li>Local carrier requirements for message delivery</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">9.3 SMS Data Retention</h3>
                <p className="text-gray-700">
                  SMS message content is retained for 90 days for delivery verification and troubleshooting purposes. 
                  Message metadata (sender, recipient, timestamp) is retained for 12 months for compliance purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 - Data Protection Officer */}
          <section id="section-10" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Protection & Governance</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">10.1 Data Protection Officer (DPO)</h3>
                <p className="text-gray-700">
                  In compliance with GDPR Article 37, we have appointed a Data Protection Officer:
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">Data Protection Officer</p>
                  <p className="text-gray-700">Weba Infinity Solutions Ltd</p>
                  <p className="text-gray-700">Email: <span className="text-emerald-600">webasolutions@gmail.com</span></p>
                  <p className="text-gray-700">Phone: 0718831298</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">10.2 Data Breach Notification</h3>
                <p className="text-gray-700">
                  In the event of a data breach, we will notify the relevant supervisory authority within 72 hours 
                  (as required by GDPR) and affected individuals without undue delay.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 - Your Rights */}
          <section id="section-8" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Data Protection Rights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '📋', title: 'Right to Access', desc: 'Request copies of your personal data' },
                { icon: '✏️', title: 'Right to Rectification', desc: 'Correct inaccurate or incomplete data' },
                { icon: '🗑️', title: 'Right to Erasure', desc: 'Request deletion of your data' },
                { icon: '⛔', title: 'Right to Restrict Processing', desc: 'Limit how we use your data' },
                { icon: '📤', title: 'Right to Data Portability', desc: 'Receive your data in a portable format' },
                { icon: '🚫', title: 'Right to Object', desc: 'Object to certain types of processing' },
                { icon: '↩️', title: 'Right to Withdraw Consent', desc: 'Withdraw consent at any time' },
                { icon: '🤖', title: 'Rights re: Automated Decisions', desc: 'Not to be subject to automated decision-making' },
              ].map((right, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{right.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{right.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{right.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Exercise Your Rights:</strong> To exercise any of these rights, please contact our Data Protection Officer at webasolutions@gmail.com. 
                We will respond within 30 days as required by GDPR.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">WeBA Infinity Solutions Ltd</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-700">webasolutions@gmail.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-700">+254 718 831 298</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Supervisory Authorities</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-700">Office of the Data Protection Commissioner (Kenya)</p>
                    <p className="text-sm text-gray-600">info@odpc.go.ke | www.odpc.go.ke</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Information Commissioner's Office (UK)</p>
                    <p className="text-sm text-gray-600">www.ico.org.uk</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center py-6">
            <p className="text-gray-600">
              This Privacy Policy was last updated on <strong>01 December 2025</strong>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We regularly review and update our privacy practices to ensure compliance with evolving global standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;