import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const service = [
    {
      id: 'broadband',
      name: 'Fixed Broadband Internet',
      icon: '🌐',
      description: 'High-speed fiber connections for homes and businesses',
      color: 'white'
    },
    {
      id: 'hotspot',
      name: 'Hotspot service',
      icon: '📶',
      description: 'Public WiFi solutions for commercial spaces',
      color: 'red'
    },
    {
      id: 'electrical',
      name: 'Electrical Installation',
      icon: '⚡',
      description: 'Professional wiring and electrical service',
      color: 'green'
    },
    {
      id: 'cctv',
      name: 'CCTV Installation',
      icon: '📹',
      description: 'Advanced security and surveillance systems',
      color: 'red'
    },
    {
      id: 'solar',
      name: 'Solar Installation',
      icon: '☀️',
      description: 'Complete solar power solutions',
      color: 'green'
    },
    {
      id: 'plc',
      name: 'PLC Design & Installation',
      icon: '🎛️',
      description: 'Industrial automation and control systems',
      color: 'red'
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Section with Gradient */}
      <div className="hero-section gradient-bg">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">⚡ Trusted Since 2025</span>
            </div>
            <h1 className="hero-title">
              Powering <span className="text-green">Homes</span> &{' '}
              <span className="text-red">Businesses</span> with Excellence
            </h1>
            <p className="hero-subtitle">
              WeBA Solutions delivers cutting-edge engineering and internet service 
              with unmatched reliability. From high-speed connectivity to professional 
              installations, we're your trusted partner in technology.
            </p>
            <div className="hero-buttons">
              <Link to="/service" className="btnn btnn-green">
                Explore Our service →
              </Link>
              <Link to="/coverage" className="btnn btnn-red">
                Check Coverage Areas
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">2,500+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Core service</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* service Section */}
      <div className="container">
        <div className="sectionn-header">
          <h2 className="sectionn-title">
            <span className="text-green">Our Core</span>{' '}
            <span className="text-red">Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive engineering and technology solutions tailored to your needs
          </p>
        </div>

        <div className="service-grid">
          {service.map((service, index) => (
            <Link 
              key={service.id} 
              to={`/service/${service.id}`}
              className={`service-card ${service.color}-card`}
            >
              <div className="service-card-header">
                <span className="service-badge">Service {index + 1}</span>
              </div>
              <div className="service1-card-content">
                <h3>{service.name}</h3>
                
              </div>
              <div className="service-card-footer">
                <span className="learn-more">
                  Learn More 
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="service-cta">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>
              Our team of experts can design a solution specifically for your 
              business or home requirements.
            </p>
            <div className="cta-buttons">
              <Link to="/support" className="btnn btnn-red">
                Get a Free Quote
              </Link>
              <Link to="/support" className="btnn btnn-green">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="features1-section">
          <div className="sectionn-header">
            <h2 className="sectionn-title">
              Why <span className="text-green">Choose</span>{' '}
              <span className="text-red">WeBA Solutions</span>
            </h2>
          </div>
          
          <div className="features1-grid">
            <div className="feature1-card">
              <div className="feature1-icon green-bg">🏆</div>
              <h3>Expertise & Experience</h3>
              <p>15+ years of proven excellence in engineering and internet service</p>
            </div>
            <div className="feature1-card">
              <div className="feature1-icon red-bg">⚡</div>
              <h3>Quick Response</h3>
              <p>24/7 support with average response time under 30 minutes</p>
            </div>
            <div className="feature1-card">
              <div className="feature1-icon green-bg">🛡️</div>
              <h3>Quality Guarantee</h3>
              <p>All installations come with a comprehensive warranty</p>
            </div>
            <div className="feature1-card">
              <div className="feature1-icon red-bg">💼</div>
              <h3>Professional Team</h3>
              <p>Certified engineers and technicians for all service</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <div className="sectionn-header">
            <h2 className="sectionn-title">Quick Access</h2>
          </div>
          
          <div className="links-grid">
            <Link to="/selfcare" className="link-card green-gradient">
              <div className="link-icon">🔐</div>
              <div className="link-content">
                <h3>Self-care Portal</h3>
                <p>Manage your account, bills, and service online</p>
              </div>
              <div className="link-arrow">→</div>
            </Link>
            
            <Link to="/support" className="link-card red-gradient">
              <div className="link-icon">🛟</div>
              <div className="link-content">
                <h3>Technical Support</h3>
                <p>24/7 assistance for all your service needs</p>
              </div>
              <div className="link-arrow">→</div>
            </Link>
            
            <Link to="/coverage" className="link-card green-gradient">
              <div className="link-icon">🗺️</div>
              <div className="link-content">
                <h3>Coverage Areas</h3>
                <p>Check if we serve your location</p>
              </div>
              <div className="link-arrow">→</div>
            </Link>
            
            <Link to="/careers" className="link-card red-gradient">
              <div className="link-icon">👥</div>
              <div className="link-content">
                <h3>Join Our Team</h3>
                <p>Explore career opportunities with us</p>
              </div>
              <div className="link-arrow">→</div>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
<div className="final-cta-contact-section">
  <div className="final-cta-contact-container">
    <h1 className="final-cta-contact-title">
      <span className="final-cta-contact-green">Ready To </span> 
      <span className="final-cta-contact-red">Transform </span>  
      <span className="final-cta-contact-green"> Your </span>  
      <span className="final-cta-contact-red">Space </span>
    </h1>
    
    <p>
      Get in touch with us today for a consultation or request a quote 
      for our service.
    </p>
    
    <div className="final-cta-contact-info">
      <div className="final-cta-contact-item">
        <span className="final-cta-icon">📞</span>
        <div>
          <div className="final-cta-label">Call Us</div>
          <div className="final-cta-value">0730 862 862</div>
        </div>
      </div>
      
      <div className="final-cta-contact-item">
        <span className="final-cta-icon">✉️</span>
        <div>
          <div className="final-cta-label">Email Us</div>
          <div className="final-cta-value">webasolutions@gmail.com</div>
        </div>
      </div>
      
      <div className="final-cta-contact-item">
        <span className="final-cta-icon">💬</span>
        <div>
          <div className="final-cta-label">WhatsApp</div>
          <div className="final-cta-value">0730762762</div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Home;