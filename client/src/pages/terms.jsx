import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, CheckCircle, AlertCircle, Clock, Users, Globe, Home, Wifi, Zap, Camera, Sun, Cpu, Network } from 'lucide-react';
import './terms.css';

const Terms = () => {
  const sections = [
    {
      id: 'broadband',
      title: 'Fixed Broadband Internet',
      icon: <Wifi size={24} />,
      points: [
        'Fiber optic internet connectivity for residential and commercial use',
        'Speeds advertised as "up to" maximum theoretical speeds',
        'Service availability subject to geographical coverage',
        'Unlimited data plans subject to fair usage policy',
        'Prohibited: Torrenting illegal content, running servers without business plan',
        'Router/WiFi equipment provided remains WeBA property',
        'Customer responsible for damage beyond normal wear and tear'
      ]
    },
    {
      id: 'hotspot',
      title: 'Hotspot Services',
      icon: <Globe size={24} />,
      points: [
        'Public WiFi access in designated commercial spaces',
        'Session time limits may apply based on venue policy',
        'Authentication required via voucher, SMS, or social media',
        'No access to illegal or adult content',
        'Network monitoring for security purposes',
        'Stable power supply and internet backbone required at venue',
        'Venue responsible for user behavior on premises'
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical Installation',
      icon: <Zap size={24} />,
      points: [
        'Electrical wiring and installations as per quoted specifications',
        'Compliance with Kenyan electrical codes and KEBS standards',
        '12-month warranty on workmanship',
        '6-month warranty on supplied materials',
        'Certificate of compliance issued upon completion',
        'Customer responsible for obtaining necessary county permits',
        'Warranty void if modifications made by third parties'
      ]
    },
    {
      id: 'cctv',
      title: 'CCTV Installation',
      icon: <Camera size={24} />,
      points: [
        'Cameras, DVR/NVR, cables, and accessories as specified',
        'Mobile viewing applications and remote access',
        'Customer responsible for complying with data protection laws',
        'Signage required for CCTV monitoring in public areas',
        'Quarterly system check-ups recommended',
        'Storage device replacement after warranty at market rates',
        'WeBA not responsible for illegal surveillance or privacy violations'
      ]
    },
    {
      id: 'solar',
      title: 'Solar Installation',
      icon: <Sun size={24} />,
      points: [
        'Energy generation estimates based on historical weather data',
        'Actual output may vary based on weather conditions',
        'Regular panel cleaning required for optimal performance',
        'Solar panels: 25-year performance warranty (manufacturer)',
        'Inverters: 5-year warranty (extendable)',
        'Batteries: 2-year warranty (varies by type)',
        'KPLC approval required for grid-tied systems'
      ]
    },
    {
      id: 'plc',
      title: 'PLC Design & Installation',
      icon: <Cpu size={24} />,
      points: [
        'PLC programming and system design services',
        'Industrial automation solutions',
        'SCADA system integration',
        'PLC programs remain WeBA intellectual property',
        'Customer receives license for use at specified location',
        'Annual maintenance contracts available',
        'Emergency support response within 24 hours'
      ]
    },
    {
      id: 'networking',
      title: 'Computer Networking',
      icon: <Network size={24} />,
      points: [
        'LAN/WAN design and implementation',
        'Wireless network deployment',
        'Network security configuration',
        'Server setup and administration',
        'Business hours support: 8 AM - 6 PM',
        'Emergency support: 2-hour response time',
        'Customer responsible for maintaining passwords and access controls'
      ]
    }
  ];

  const generalTerms = [
    'By accepting our quotation, making payment, or allowing installation to commence, you agree to these Terms and Conditions',
    'We reserve the right to modify or discontinue any Service with 30 days written notice',
    'Neither party shall be liable for delays or failures due to Force Majeure events',
    'Quotations are valid for 30 days from issue date',
    'Prices subject to change due to material cost fluctuations',
    'Installation Services: 50% deposit, 50% upon completion',
    'Recurring Services: Monthly payment in advance',
    'Late payments incur 5% penalty after 7 days, 15% after 30 days',
    'Services may be suspended for payments over 60 days late',
    'Warranty claims must be reported within warranty period',
    'Maximum liability limited to contract value',
    '30 days written notice required for service termination',
    'All disputes subject to Kenyan law and Nairobi arbitration'
  ];

  return (
    <div className="terms-page">
      <div className="container">
        {/* Header Section */}
        <div className="terms-header">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <div className="header-content">
            <div className="header-icon">
              <Shield size={48} />
            </div>
            <h1>Terms & Conditions</h1>
            <p className="terms-tagline">
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">Services</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30</span>
                <span className="stat-label">Days Notice</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="terms-content">
          {/* Introduction */}
          <div className="intro-section">
            <h2>WEBAL INFINITY SOLUTIONS LIMITED</h2>
            <p className="intro-text">
              These Terms and Conditions govern all services provided by WeBA Infinity Solutions Limited. 
              By using our services, you agree to be bound by these terms. Please read them carefully.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <FileText size={20} />
                <span><strong>Company:</strong> WeBA Infinity Solutions Limited</span>
              </div>
              <div className="contact-item">
                <Clock size={20} />
                <span><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</span>
              </div>
              <div className="contact-item">
                <Users size={20} />
                <span><strong>Contact:</strong> 0730 862 862 | info@webainfinity.co.ke</span>
              </div>
            </div>
          </div>

          {/* General Terms Section */}
          <div className="general-terms-section">
            <h2 className="section-title">
              <FileText size={28} />
              General Terms & Conditions
            </h2>
            <div className="general-terms-grid">
              {generalTerms.map((term, index) => (
                <div key={index} className="general-term-card">
                  <div className="term-number">{index + 1}</div>
                  <p className="term-text">{term}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service-Specific Terms */}
          <div className="service-terms-section">
            <h2 className="section-title">
              <Shield size={28} />
              Service-Specific Terms
            </h2>
            <p className="section-subtitle">
              Detailed terms for each of our professional services
            </p>

            <div className="service-terms-grid">
              {sections.map((service, index) => (
                <div key={service.id} className="service-term-card">
                  <div className="service-header">
                    <div className="service-icon">
                      {service.icon}
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                  
                  <div className="service-points">
                    {service.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="service-point">
                        <CheckCircle size={16} className="point-icon" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-footer">
                    <div className="warranty-badge">
                      <Shield size={14} />
                      <span>Warranty Included</span>
                    </div>
                    <div className="support-badge">
                      <Users size={14} />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Legal Section */}
          <div className="legal-section">
            <div className="legal-card">
              <div className="legal-header">
                <AlertCircle size={32} />
                <h3>Important Legal Information</h3>
              </div>
              
              <div className="legal-grid">
                <div className="legal-item">
                  <h4>Payment Terms</h4>
                  <ul>
                    <li>Installation: 50% deposit, 50% on completion</li>
                    <li>Monthly services: Payment in advance</li>
                    <li>Late fees: 5% (7 days), 15% (30 days)</li>
                    <li>Suspension: After 60 days non-payment</li>
                  </ul>
                </div>

                <div className="legal-item">
                  <h4>Warranty Information</h4>
                  <ul>
                    <li>Workmanship: 12 months standard</li>
                    <li>Materials: As per manufacturer</li>
                    <li>Solar panels: 25 years (manufacturer)</li>
                    <li>Reporting: Within warranty period</li>
                  </ul>
                </div>

                <div className="legal-item">
                  <h4>Liability & Insurance</h4>
                  <ul>
                    <li>Professional indemnity: KES 5M coverage</li>
                    <li>Maximum liability: Contract value</li>
                    <li>Property insurance: Customer responsibility</li>
                    <li>Data loss: Backup recommended</li>
                  </ul>
                </div>

                <div className="legal-item">
                  <h4>Termination</h4>
                  <ul>
                    <li>Customer: 30 days written notice</li>
                    <li>WeBA: 14-30 days notice</li>
                    <li>Immediate: Illegal activities</li>
                    <li>Equipment return: 14 days</li>
                  </ul>
                </div>
              </div>

              <div className="legal-notice">
                <AlertCircle size={20} />
                <p>
                  By proceeding with any service, you acknowledge having read, understood, 
                  and agreed to these Terms and Conditions. These terms supersede all 
                  previous communications and agreements.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="terms-cta-section">
            <div className="cta-content">
              <h2>Need Clarification?</h2>
              <p>Our legal team is available to answer any questions about our terms and conditions.</p>
              
              <div className="cta-buttons">
                <button className="btn btn-primary">
                  <FileText size={20} />
                  <span>Download PDF Version</span>
                </button>
                
                <button className="btn btn-outline">
                  <Users size={20} />
                  <span>Contact Legal Team</span>
                </button>
              </div>
              
              <div className="cta-notes">
                <div className="note-item">
                  <CheckCircle size={18} />
                  <span>Updated regularly for compliance</span>
                </div>
                <div className="note-item">
                  <CheckCircle size={18} />
                  <span>Clear and transparent terms</span>
                </div>
                <div className="note-item">
                  <CheckCircle size={18} />
                  <span>Kenyan law compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;