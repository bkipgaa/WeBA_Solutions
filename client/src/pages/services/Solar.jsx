import React from 'react';
import { Link } from 'react-router-dom';
import './Solar.css'

const SolarPower = () => {
  const services = [
    'Residential solar system installation',
    'Commercial solar power solutions',
    'Solar water heating systems',
    'Solar street lighting',
    'Solar pump installation',
    'Grid-tied and off-grid systems',
    'Solar system maintenance',
    'Government approval assistance'
  ];

  const packages = [
    { 
      name: 'Home Basic', 
      capacity: '3kW System',
      features: ['4 Solar panels', 'Inverter & battery', 'LED lighting', 'TV & phone charging'],
      price: '149,999'
    },
    { 
      name: 'Home Premium', 
      capacity: '5kW System',
      features: ['8 Solar panels', 'Hybrid inverter', 'Refrigeration', 'Washing machine'],
      price: '249,999'
    },
    { 
      name: 'Business Standard', 
      capacity: '10kW System',
      features: ['16 Solar panels', '3-phase inverter', 'Office equipment', 'Security system'],
      price: '499,999'
    },
    { 
      name: 'Industrial', 
      capacity: 'Custom Solution',
      features: ['Custom design', 'Grid integration', 'Energy monitoring', 'Maintenance package'],
      price: 'Quote Based'
    }
  ];

  return (
    <div className="service-page">
      <div className="container">
        <div className="service-header">
  <Link to="/" className="back-link">← Back to Home</Link>
  <div className="header-content">
    <div className="header-icon">
      ☀️
    </div>
    <h1>Solar Power Solutions</h1>
    <p className="service-tagline">Clean, reliable energy for homes and businesses</p>
  </div>
</div>

        <div className="service-content">
          <div className="intro-section">
  <h2>Overview</h2>
  <p className="intro-text">
              Harness the power of the sun with our professional solar installation services. 
              We provide complete solar energy solutions that reduce electricity costs, 
              increase energy independence, and contribute to environmental sustainability.
            </p>
          </div>

          <div className="service-features">
            <h2>Our Solar Services</h2>
            <div className="features-grid">
              {services.map((service, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">☀️</div>
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="service-packages">
            <h2>Solar Packages</h2>
            <div className="packages-grid">
              {packages.map((pkg, index) => (
                <div key={index} className="package-card">
                  <div className="package-badge">{pkg.name}</div>
                  <div className="package-capacity">{pkg.capacity}</div>
                  <ul className="package-features">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                  <div className="package-price">
                    {pkg.price === 'Quote Based' ? 'Custom Quote' : `Ksh ${pkg.price}`}
                  </div>
                  <button className="btn btn-primary">
                    {pkg.price === 'Quote Based' ? 'Request Quote' : 'Select Package'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="service-benefits">
            <h2>Why Choose Solar?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>Cost Savings</h3>
                <p>Reduce electricity bills by up to 90% with solar power</p>
              </div>
              <div className="benefit-card">
                <h3>Energy Independence</h3>
                <p>Generate your own power and reduce grid dependency</p>
              </div>
              <div className="benefit-card">
                <h3>Environmentally Friendly</h3>
                <p>Clean, renewable energy with zero emissions</p>
              </div>
              <div className="benefit-card">
                <h3>Government Incentives</h3>
                <p>Take advantage of tax benefits and rebates</p>
              </div>
            </div>
          </div>

          <div className="service-cta">
            <h2>Go Solar with Confidence</h2>
            <p>Get a free energy assessment and discover how much you can save with solar.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Calculate Savings</button>
              <button className="btn">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarPower;