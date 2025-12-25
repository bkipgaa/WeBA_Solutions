import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Clock, Users, Zap, CheckCircle } from 'lucide-react';
import './Hotspot.css';

const Hotspot = () => {
  const solutions = [
    { type: 'Hotel WiFi', desc: 'Guest internet with room-based access', icon: '🏨' },
    { type: 'Restaurant WiFi', desc: 'Customer WiFi with marketing integration', icon: '🍽️' },
    { type: 'Shopping Mall', desc: 'Public WiFi with sponsor branding', icon: '🛍️' },
    { type: 'Office Building', desc: 'Secure guest network for visitors', icon: '🏢' },
    { type: 'Student Hostels', desc: 'Affordable packages for campus students', icon: '🎓' },
    { type: 'Campus WiFi', desc: 'High-speed internet for educational institutions', icon: '🏫' }
  ];

  const hotspotPackages = [
    { 
      name: 'Diamond Day', 
      speed: '8Mbps',
      price: 'Ksh 50.00', 
      duration: '1 Day', 
      popular: false,
      tag: 'Full Day'
    },
    { 
      name: 'Bronze Pass', 
      speed: '4Mbps',
      price: 'Ksh 10.00', 
      duration: '1 Hour', 
      popular: false,
      tag: 'Quick Access'
    },
    { 
      name: 'Silver Boost', 
      speed: '4Mbps',
      price: 'Ksh 20.00', 
      duration: '3 Hours', 
      popular: false,
      tag: 'Best Seller'
    },
    { 
      name: 'Gold Access', 
      speed: '5Mbps',
      price: 'Ksh 30.00', 
      duration: '6 Hours', 
      popular: true,
      tag: 'Most Popular'
    },
    { 
      name: 'Platinum Surf', 
      speed: '5Mbps',
      price: 'Ksh 40.00', 
      duration: '12 Hours', 
      popular: false,
      tag: 'Extended Use'
    },
    { 
      name: 'Triple Ruby', 
      speed: '8Mbps',
      price: 'Ksh 100.00', 
      duration: '3 Days', 
      popular: true,
      tag: 'Value Pack'
    },
    { 
      name: 'Seven Days', 
      speed: '10Mbps',
      price: 'Ksh 150.00', 
      duration: '7 Days', 
      popular: false,
      tag: 'Weekly Plan'
    },
    { 
      name: '14 Days - 2 Devices', 
      speed: '10Mbps',
      price: 'Ksh 300.00', 
      duration: '14 Days', 
      popular: true,
      tag: 'Multi-Device'
    },
    { 
      name: '21 Days Package', 
      speed: '10Mbps',
      price: 'Ksh 250.00', 
      duration: '21 Days', 
      popular: false,
      tag: 'Long Term'
    },
    { 
      name: 'One Month - 2 Users', 
      speed: '10Mbps',
      price: 'Ksh 500.00', 
      duration: '1 Month', 
      popular: true,
      tag: 'Premium'
    }
  ];

  const features = [
    'Instant activation after payment',
    '24/7 customer support',
    'No long-term contracts',
    'Unlimited data usage',
    'Secure connection',
    'Easy voucher system',
    'Auto-login option',
    'Usage statistics'
  ];

  return (
    <div className="service-page hotspot-page">
      <div className="container">
        {/* Header Section */}
        <div className="service-header hotspot-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="header-content">
            <div className="header-icon">
              <Wifi size={48} />
            </div>
            <h1>Hotspot Services</h1>
            <p className="service-tagline">Affordable WiFi packages for students & professional solutions for businesses</p>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Package Options</span>
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
            <h2>Perfect for Campus Students</h2>
            <p className="intro-text">
              We understand student needs - that's why we offer flexible, affordable WiFi packages 
              specifically designed for hostel living. Choose from hourly, daily, weekly, or monthly 
              plans that fit your schedule and budget.
            </p>
          </div>

          {/* Hotspot Packages in Card Layout */}
          <div className="packages-section">
            <div className="section-header">
              <h2>Student Hotspot Packages</h2>
              <p className="section-subtitle">Select the perfect plan for your internet needs</p>
            </div>

            <div className="packages-grid">
              {hotspotPackages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`package-card ${pkg.popular ? 'popular' : ''}`}
                >
                  {pkg.popular && <div className="popular-badge">🔥 Popular</div>}
                  
                  <div className="package-content">
                    <h3 className="package-name">{pkg.name}</h3>
                    
                    <div className="package-details">
                      <div className="package-speed">
                        <Zap size={14} />
                        <span>{pkg.speed}</span>
                      </div>
                      
                      <div className="package-duration">
                        <Clock size={14} />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                    
                    <div className="package-price">
                      <span className="current-price">{pkg.price}</span>
                    </div>
                    
                    {/* REMOVED Get Started button */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h2>Why Choose Our Hotspot Service?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <CheckCircle size={20} className="feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section */}
          <div className="solutions-section">
            <h2>Professional Solutions</h2>
            <p className="section-subtitle">Enterprise-grade WiFi solutions for various businesses</p>
            
            <div className="solutions-grid">
              {solutions.map((solution, index) => (
                <div key={index} className="solution-card">
                  <div className="solution-icon">{solution.icon}</div>
                  <h3>{solution.type}</h3>
                  <p>{solution.desc}</p>
                  <button className="solution-btn">Learn More</button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content">
              <h2>Need Help Choosing a Package?</h2>
              <p>Our student support team is here to help you select the perfect WiFi plan for your needs.</p>
              
              <div className="cta-buttons">
                <button className="btn btn-primary">
                  <Wifi size={18} />
                  <span>Browse All Packages</span>
                </button>
                <button className="btn btn-secondary">
                  <span>Contact Support</span>
                </button>
                <button className="btn btn-outline">
                  <span>Download Brochure</span>
                </button>
              </div>
              
              <div className="cta-features">
                <div className="cta-feature">
                  <div className="feature-dot"></div>
                  <span>No hidden fees</span>
                </div>
                <div className="cta-feature">
                  <div className="feature-dot"></div>
                  <span>Instant activation</span>
                </div>
                <div className="cta-feature">
                  <div className="feature-dot"></div>
                  <span>24/7 student support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspot;