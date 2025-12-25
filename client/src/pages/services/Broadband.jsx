import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Zap, Users, Clock, Shield, CheckCircle, Globe } from 'lucide-react';
import './Broadband.css';

const Broadband = () => {
  const features = [
    { icon: '⚡', title: 'High-Speed Fiber', desc: 'Fiber optic connections for maximum speed' },
    { icon: '📊', title: 'Unlimited Data', desc: 'No throttling or data caps' },
    { icon: '🛡️', title: '24/7 Support', desc: 'Round-the-clock technical assistance' },
    { icon: '🏢', title: 'Business Grade', desc: 'Dedicated lines for enterprises' },
    { icon: '📡', title: 'WiFi Optimization', desc: 'Professional network setup' },
    { icon: '🔧', title: 'Static IP', desc: 'Available for business needs' },
    { icon: '📝', title: 'Service SLAs', desc: 'Guaranteed uptime agreements' },
    { icon: '🔄', title: 'Dual WAN', desc: 'Failover options for reliability' }
  ];

  const plans = [
    { 
      name: 'Home Basic', 
      speed: '10 Mbps', 
      price: '2,999', 
      originalPrice: '3,499',
      devices: 'Up to 5',
      type: 'Residential',
      popular: false,
      features: ['Unlimited data', '24/7 support', 'Free installation']
    },
    { 
      name: 'Home Premium', 
      speed: '25 Mbps', 
      price: '4,999', 
      originalPrice: '5,999',
      devices: 'Up to 15',
      type: 'Residential',
      popular: true,
      features: ['All Basic features', 'Priority support', 'Mesh WiFi option']
    },
    { 
      name: 'Business Starter', 
      speed: '50 Mbps', 
      price: '9,999', 
      originalPrice: '11,999',
      devices: 'Up to 30',
      type: 'Business',
      popular: false,
      features: ['Static IP available', 'SLA agreement', 'Business support']
    },
    { 
      name: 'Business Pro', 
      speed: '100 Mbps', 
      price: '19,999', 
      originalPrice: '22,999',
      devices: 'Unlimited',
      type: 'Business',
      popular: true,
      features: ['All Business features', 'Dual WAN', 'Dedicated line']
    }
  ];

  const broadbandPackages = [
    { 
      name: 'WiFi Swift', 
      speed: '5Mbps',
      details: '5M/5M',
      price: 'Ksh 1,500.00', 
      duration: '1 Month', 
      type: 'PPPoE', 
      devices: '1', 
      enabled: true,
      popular: false,
      tag: 'Budget Friendly'
    },
    { 
      name: 'WiFi Plus', 
      speed: '10 Mbps',
      details: '10M/10M',
      price: 'Ksh 2,000.00', 
      duration: '1 Month', 
      type: 'PPPoE', 
      devices: '1', 
      enabled: true,
      popular: true,
      tag: 'Most Popular'
    },
    { 
      name: 'WiFi Turbo', 
      speed: '15Mbps',
      details: '15M/15M',
      price: 'Ksh 3,000.00', 
      duration: '1 Month', 
      type: 'PPPoE', 
      devices: '1', 
      enabled: true,
      popular: false,
      tag: 'High Speed'
    }
  ];

  const benefits = [
    { title: 'Stable Connection', desc: 'Consistent speeds for uninterrupted usage', icon: '📶' },
    { title: 'Low Latency', desc: 'Perfect for gaming and video calls', icon: '🎮' },
    { title: 'Reliable Uptime', desc: '99.9% uptime guarantee', icon: '⏱️' },
    { title: 'Secure Network', desc: 'Advanced security features included', icon: '🔒' }
  ];

  return (
    <div className="service-page broadbandd-page">
      <div className="container">
        {/* Header Section */}
        <div className="service-header broadbandd-header">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <div className="header-content">
            <div className="header-icon">
              <Globe size={48} />
            </div>
            <h1>Fixed Broadband Internet</h1>
            <p className="service-tagline">High-speed, reliable fiber internet for homes and businesses</p>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Instant</span>
                <span className="stat-label">Activation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="service-content">
          {/* Introduction Section */}
          <div className="intro-section">
            <h2>Ultra-Fast Fiber Internet</h2>
            <p className="intro-text">
              Experience lightning-fast internet with our fiber optic broadband. Perfect for streaming, 
              gaming, remote work, and running your business smoothly. Get reliable connectivity with 
              guaranteed speeds and exceptional support.
            </p>
          </div>

          {/* WiFi Packages Section */}
          <div className="packages-section">
            <div className="section-header">
              <h2>Monthly WiFi Packages</h2>
              <p className="section-subtitle">Affordable monthly plans for reliable internet access</p>
            </div>

            <div className="packages-grid">
              {broadbandPackages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`package-card ${pkg.popular ? 'popular' : ''}`}
                >
                  
                  
                  <div className="package-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <div className="package-speed">
                      <Zap size={20} />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="package-price">
                    <span className="current-price">{pkg.price}</span>
                    <span className="price-period">per month</span>
                  </div>

                  <div className="package-cta">
                    <button className="subscribee-btn">
                      Subscribe Now
                    </button>
                    <button className="detailss-btn">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Service Plans 
          <div className="plans-section">
            <div className="sectionn-header">
              <h2>Fiber Broadband Plans</h2>
              <p className="sectionn-subtitle">Choose from our range of fiber optic internet plans</p>
            </div>

            <div className="plans-grid">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`plan-card ${plan.popular ? 'featured' : ''} ${plan.type.toLowerCase()}`}
                >
                  {plan.popular && <div className="plan-badge">Most Popular</div>}
                  
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    <span className="plan-type">{plan.type}</span>
                  </div>

                  <div className="plan-speed">
                    <Zap size={24} />
                    <span>{plan.speed}</span>
                  </div>

                  <div className="plan-price">
                    <div className="price-wrapper">
                      <span className="current-price">Ksh {plan.price}</span>
                      <span className="price-period">/month</span>
                    </div>
                    <span className="original-price">Ksh {plan.originalPrice}</span>
                  </div>

                  <div className="plan-devices">
                    <Users size={18} />
                    <span>{plan.devices} devices</span>
                  </div>

                  <div className="plan-features">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <CheckCircle size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="plan-cta-btn">
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>  */}

          {/* Features Grid */}
          <div className="features-section">
            <h2>Why Choose Our Broadband?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <h2>Key Benefits</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content">
              <div className="cta-text">
                <h2>Ready to Upgrade Your Internet?</h2>
                <p>Get lightning-fast fiber internet installed in your home or business.</p>
              </div>
              
              <div className="cta-buttons">
                <button className="btn btn-primary">
                  <Zap size={20} />
                  <span>Order Now</span>
                </button>
                <button className="btn btn-secondary">
                  <span>Get Free Consultation</span>
                </button>
                <button className="btn btn-outline">
                  <span>Call: 0730 862 862</span>
                </button>
              </div>
              
              <div className="cta-notes">
                <div className="note-item">
                  <CheckCircle size={18} />
                  <span>Free installation on annual plans</span>
                </div>
                <div className="note-item">
                  <CheckCircle size={18} />
                  <span>No long-term contracts required</span>
                </div>
                <div className="note-item">
                  <CheckCircle size={18} />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadband;