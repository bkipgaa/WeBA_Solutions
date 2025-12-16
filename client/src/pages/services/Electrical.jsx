import React from 'react';
import { Link } from 'react-router-dom';
import './Electrical.css'

const ElectricalWorks = () => {
  const services = [
    'New home electrical wiring and installation',
    'Commercial building electrical systems',
    'Electrical panel upgrades and replacements',
    'Lighting design and installation',
    'Electrical safety inspections and testing',
    'Generator installation and backup systems',
    'Smart home automation wiring',
    'Electrical fault finding and repairs'
  ];

  const certifications = [
    { name: 'NEMA Certified', desc: 'National Environmental Management Authority compliance' },
    { name: 'ERB Licensed', desc: 'Engineers Registration Board certified electricians' },
    { name: 'OSHA Trained', desc: 'Occupational Safety and Health Administration standards' },
    { name: 'ISO 9001:2015', desc: 'Quality management system certified' }
  ];

  return (
    <div className="service-page">
      <div className="container">
        <div className="service-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Electrical Installation Services</h1>
          <p className="service-tagline">Professional electrical solutions for homes and commercial buildings</p>
          <div className="service-icon">⚡</div>
        </div>

        <div className="service-content">
          <div className="service-description">
            <h2>Overview</h2>
            <p>
              WeBA Infinity Solutions provides comprehensive electrical installation services 
              for both residential and commercial properties. Our team of certified electricians 
              ensures safe, reliable, and code-compliant electrical systems that meet the 
              highest industry standards.
            </p>
          </div>

          <div className="service-features">
            <h2>Our Electrical Services</h2>
            <div className="features-grid">
              {services.map((service, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="service-certifications">
            <h2>Our Certifications & Qualifications</h2>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-card">
                  <h3>{cert.name}</h3>
                  <p>{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="service-safety">
            <h2>Safety & Compliance</h2>
            <div className="safety-features">
              <div className="safety-item">
                <h3>100% Code Compliance</h3>
                <p>All installations meet Kenya building codes and electrical regulations</p>
              </div>
              <div className="safety-item">
                <h3>Quality Materials</h3>
                <p>We use only certified electrical materials from reputable suppliers</p>
              </div>
              <div className="safety-item">
                <h3>Insurance Covered</h3>
                <p>Fully insured workmanship with liability coverage</p>
              </div>
              <div className="safety-item">
                <h3>Warranty Protection</h3>
                <p>Comprehensive warranty on all installations and materials</p>
              </div>
            </div>
          </div>

          <div className="service-cta">
            <h2>Schedule an Electrical Assessment</h2>
            <p>Contact our certified electricians for a free site survey and quotation.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Request Free Quote</button>
              <button className="btn">Call Now: 0730 862 862</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalWorks;