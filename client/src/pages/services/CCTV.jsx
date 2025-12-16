import React from 'react';
import { Link } from 'react-router-dom';
import './CCTV.css'

const CCTVInstallation = () => {
  const solutions = [
    'HD & 4K CCTV camera systems',
    'IP network camera installation',
    'Wireless CCTV solutions',
    'Night vision & thermal cameras',
    'Remote monitoring setup',
    'Cloud storage & backup systems',
    'Mobile app integration',
    '24/7 monitoring services'
  ];

  const applications = [
    { type: 'Residential Security', desc: 'Home surveillance and perimeter protection' },
    { type: 'Commercial Security', desc: 'Business premises and retail security systems' },
    { type: 'Industrial Monitoring', desc: 'Factory and warehouse surveillance' },
    { type: 'Institutional Security', desc: 'Schools, hospitals, and government facilities' }
  ];

  return (
    <div className="service-page">
      <div className="container">
        <div className="service-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>CCTV Security Systems</h1>
          <p className="service-tagline">Advanced surveillance solutions for complete peace of mind</p>
          <div className="service-icon">📹</div>
        </div>

        <div className="service-content">
          <div className="service-description">
            <h2>Overview</h2>
            <p>
              Protect your property with our professional CCTV installation services. 
              We provide custom-designed surveillance systems that offer real-time monitoring, 
              remote access, and advanced security features for both residential and commercial clients.
            </p>
          </div>

          <div className="service-solutions">
            <h2>Our CCTV Solutions</h2>
            <div className="solutions-grid">
              {solutions.map((solution, index) => (
                <div key={index} className="solution-card">
                  <div className="solution-icon">📷</div>
                  <h3>{solution}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="service-applications">
            <h2>Application Areas</h2>
            <div className="applications-grid">
              {applications.map((app, index) => (
                <div key={index} className="application-card">
                  <h3>{app.type}</h3>
                  <p>{app.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="service-benefits">
            <h2>Security Benefits</h2>
            <div className="benefits-list">
              <div className="benefit">
                <h3>Crime Deterrence</h3>
                <p>Visible cameras reduce criminal activity by up to 60%</p>
              </div>
              <div className="benefit">
                <h3>24/7 Monitoring</h3>
                <p>Round-the-clock surveillance with remote access</p>
              </div>
              <div className="benefit">
                <h3>Evidence Collection</h3>
                <p>High-quality recording for legal proceedings</p>
              </div>
              <div className="benefit">
                <h3>Insurance Benefits</h3>
                <p>Potential premium reductions with installed security</p>
              </div>
            </div>
          </div>

          <div className="service-cta">
            <h2>Secure Your Property Today</h2>
            <p>Get a free security assessment and customized CCTV solution.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Book Security Audit</button>
              <button className="btn">View CCTV Packages</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCTVInstallation;