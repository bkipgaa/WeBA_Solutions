import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ServiceOverview.css';

const ServiceOverview = () => {
  const location = useLocation();
  const serviceId = location.pathname.split('/').pop();

  const allServices = {
    broadband: {
      id: 'broadband',
      name: 'Fixed Broadband Internet',
      icon: '🌐',
      tagline: 'Ultra-fast fiber connectivity for modern living',
      description: 'Experience lightning-fast internet with our fiber optic broadband services. Perfect for streaming, gaming, remote work, and smart homes.',
      features: [
        'Fiber-to-the-Home (FTTH) connections',
        'Speeds from 10Mbps to 1Gbps',
        'Unlimited data with no throttling',
        '24/7 network monitoring',
        'Free installation & router',
        'WiFi optimization included'
      ],
      benefits: [
        'Low latency for gaming & video calls',
        'Symmetrical upload/download speeds',
        'Business-grade reliability',
        'No data caps or fair usage policies',
        'Professional installation'
      ],
      packages: [
        { name: 'Basic Plan', speed: '10Mbps', price: 'Ksh 2,500/month' },
        { name: 'Standard Plan', speed: '20Mbps', price: 'Ksh 3,500/month' },
        { name: 'Premium Plan', speed: '50Mbps', price: 'Ksh 6,500/month' },
        { name: 'Business Plan', speed: '100Mbps+', price: 'Custom Quote' }
      ],
      color: 'green'
    },
    hotspot: {
      id: 'hotspot',
      name: 'Hotspot Services',
      icon: '📶',
      tagline: 'Commercial WiFi solutions that scale',
      description: 'Transform your business with reliable public WiFi solutions. Perfect for hotels, restaurants, offices, and public spaces.',
      features: [
        'Custom hotspot portals with branding',
        'User management & analytics',
        'Bandwidth control per device',
        'Splash page customization',
        'Social media login options',
        'Usage analytics dashboard'
      ],
      benefits: [
        'Increase customer dwell time',
        'Collect customer insights',
        'Boost business reputation',
        'Monetization options',
        'Easy management portal'
      ],
      packages: [
        { name: 'Small Business', users: 'Up to 50', price: 'Ksh 15,000 setup' },
        { name: 'Medium Business', users: '50-200', price: 'Ksh 25,000 setup' },
        { name: 'Enterprise', users: '200+', price: 'Custom Quote' }
      ],
      color: 'red'
    },
    electrical: {
      id: 'electrical',
      name: 'Electrical Installation',
      icon: '⚡',
      tagline: 'Safe, reliable electrical solutions',
      description: 'Professional electrical wiring and installations for residential, commercial, and industrial properties.',
      features: [
        'Complete house wiring',
        'DB board installation & upgrades',
        'Lighting system design',
        'Socket & switch installation',
        'Safety systems (earthing, RCDs)',
        'Electrical fault finding'
      ],
      benefits: [
        'KEB/EPRA certified electricians',
        'Warranty on all installations',
        'Energy-efficient solutions',
        'Safety compliance guaranteed',
        'Emergency call-out service'
      ],
      packages: [
        { name: 'Basic Wiring', area: '1-2 Bedroom', price: 'From Ksh 45,000' },
        { name: 'Standard Wiring', area: '3-4 Bedroom', price: 'From Ksh 75,000' },
        { name: 'Commercial Wiring', area: 'Office/Small Business', price: 'Custom Quote' }
      ],
      color: 'green'
    },
    cctv: {
      id: 'cctv',
      name: 'CCTV Installation',
      icon: '📹',
      tagline: 'Advanced security surveillance',
      description: 'Comprehensive security camera systems for homes and businesses with remote monitoring capabilities.',
      features: [
        'HD & 4K camera systems',
        'Night vision & motion detection',
        'Remote viewing via mobile app',
        'Cloud storage options',
        'AI-powered analytics',
        'Professional installation'
      ],
      benefits: [
        '24/7 property monitoring',
        'Crime deterrence',
        'Remote access from anywhere',
        'Evidence collection',
        'Insurance premium discounts'
      ],
      packages: [
        { name: 'Home Package', cameras: '4 Cameras', price: 'Ksh 35,000' },
        { name: 'Business Package', cameras: '8 Cameras', price: 'Ksh 65,000' },
        { name: 'Enterprise Package', cameras: '16+ Cameras', price: 'Custom Quote' }
      ],
      color: 'red'
    },
    solar: {
      id: 'solar',
      name: 'Solar Installation',
      icon: '☀️',
      tagline: 'Clean, reliable solar power',
      description: 'Complete solar energy solutions for homes and businesses to reduce electricity costs and ensure power backup.',
      features: [
        'Solar panel installation',
        'Inverter systems (on-grid/off-grid)',
        'Battery backup systems',
        'Solar water heating',
        'System monitoring',
        'Maintenance services'
      ],
      benefits: [
        'Reduce electricity bills by up to 90%',
        'Power backup during outages',
        'Environmentally friendly',
        'Government incentives available',
        '25-year panel warranty'
      ],
      packages: [
        { name: 'Home Backup', capacity: '3KVA', price: 'From Ksh 180,000' },
        { name: 'Home Complete', capacity: '5KVA', price: 'From Ksh 250,000' },
        { name: 'Business System', capacity: '10KVA+', price: 'Custom Quote' }
      ],
      color: 'green'
    },
    plc: {
      id: 'plc',
      name: 'PLC Design & Installation',
      icon: '🎛️',
      tagline: 'Industrial automation excellence',
      description: 'Professional Programmable Logic Controller systems for industrial automation and process control.',
      features: [
        'PLC programming & installation',
        'SCADA system design',
        'HMI interface development',
        'Motor control systems',
        'Process automation',
        'System integration'
      ],
      benefits: [
        'Increase production efficiency',
        'Reduce operational costs',
        'Improve process consistency',
        'Real-time monitoring',
        'Predictive maintenance'
      ],
      packages: [
        { name: 'Small Automation', scope: 'Basic PLC', price: 'From Ksh 150,000' },
        { name: 'Medium System', scope: 'PLC + HMI', price: 'From Ksh 300,000' },
        { name: 'Full Automation', scope: 'Complete SCADA', price: 'Custom Quote' }
      ],
      color: 'red'
    }
  };

  // If specific service ID, show that service, otherwise show all
  const service = serviceId in allServices ? allServices[serviceId] : null;
  const servicesArray = Object.values(allServices);

  return (
    <div className="service-overview-page">
      <div className="service-hero">
        <div className="container">
          {service ? (
            <div className={`service-hero-content ${service.color}-theme`}>
              <div className="service-header">
                <div className="service-icon-large">
                  <span>{service.icon}</span>
                </div>
                <h1 className="service-title">{service.name}</h1>
                <p className="service-tagline">{service.tagline}</p>
              </div>
              <div className="service-hero-actions">
                <Link to="/support" className="btn btn-primary">
                  Get a Quote
                </Link>
                <Link to="/services" className="btn btn-outline">
                  View All Services
                </Link>
              </div>
            </div>
          ) : (
            <div className="service-hero-content">
              <h1 className="service-title">Our Services</h1>
              <p className="service-subtitle">
                Comprehensive engineering and technology solutions tailored to your needs
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {service ? (
          <div className="service-detail">
            <div className="service-description">
              <h2>Service Overview</h2>
              <p>{service.description}</p>
            </div>

            <div className="service-details-grid">
              <div className="service-features">
                <h3>Key Features</h3>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-benefits">
                <h3>Benefits</h3>
                <ul>
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-packages">
              <h2>Packages & Pricing</h2>
              <div className="packages-grid">
                {service.packages.map((pkg, index) => (
                  <div key={index} className="package-card">
                    <div className="package-header">
                      <h4>{pkg.name}</h4>
                      <div className="package-price">{pkg.price}</div>
                    </div>
                    <div className="package-details">
                      {pkg.speed && <div><strong>Speed:</strong> {pkg.speed}</div>}
                      {pkg.cameras && <div><strong>Cameras:</strong> {pkg.cameras}</div>}
                      {pkg.capacity && <div><strong>Capacity:</strong> {pkg.capacity}</div>}
                      {pkg.users && <div><strong>Users:</strong> {pkg.users}</div>}
                      {pkg.area && <div><strong>Area:</strong> {pkg.area}</div>}
                      {pkg.scope && <div><strong>Scope:</strong> {pkg.scope}</div>}
                    </div>
                    <Link to="/support" className="btn btn-outline">
                      Inquire Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-cta">
              <h2>Ready to Get Started?</h2>
              <p>Contact us for a free consultation and customized quote</p>
              <div className="cta-buttons">
                <Link to="/support" className="btn btn-primary">
                  Contact Sales
                </Link>
                <a href="tel:+254730862862" className="btn btn-outline">
                  Call Now: 0730 862 862
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="services-overview">
            <div className="services-intro">
              <h2>Our Comprehensive Service Portfolio</h2>
              <p>
                WeBA Solutions offers a complete range of engineering and technology services. 
                Each service is delivered by certified professionals with years of industry experience.
              </p>
            </div>

            <div className="services-grid-overview">
              {servicesArray.map((service) => (
                <Link 
                  key={service.id} 
                  to={`/services/${service.id}`}
                  className={`service-card-overview ${service.color}-theme`}
                >
                  <div className="service-card-icon">
                    <span>{service.icon}</span>
                  </div>
                  <div className="service-card-content">
                    <h3>{service.name}</h3>
                    <p>{service.description.substring(0, 100)}...</p>
                  </div>
                  <div className="service-card-footer">
                    <span className="view-details">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="services-summary">
              <h2>Why Choose WeBA Solutions?</h2>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-icon">🏆</div>
                  <h4>Expert Team</h4>
                  <p>Certified engineers with 15+ years experience</p>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">⚡</div>
                  <h4>Quick Response</h4>
                  <p>24/7 support with emergency call-out</p>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">🛡️</div>
                  <h4>Quality Guarantee</h4>
                  <p>All services come with warranty</p>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">💼</div>
                  <h4>Custom Solutions</h4>
                  <p>Tailored to your specific needs</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceOverview;