import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Zap, Users, Clock, Shield, CheckCircle, Globe, X, ArrowLeft } from 'lucide-react';
import './Broadband.css';

const Broadband = () => {
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    package: '',
    description: ''
  });

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

  const broadbandPackages = [
    { 
      id: 'wifi-swift',
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
      id: 'wifi-plus',
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
      id: 'wifi-turbo',
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

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      ...formData,
      package: pkg.name
    });
    setShowPackageForm(true);
  };

  const handleOrderNowClick = () => {
    setShowPackageSelection(true);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({
      ...formData,
      package: pkg.name
    });
    setShowPackageSelection(false);
    setShowPackageForm(true);
  };

  const handleBackToSelection = () => {
    setShowPackageForm(false);
    setShowPackageSelection(true);
    setSelectedPackage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xlgergee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          fullName: `${formData.firstName} ${formData.lastName}`,
          _subject: `WiFi Package Subscription: ${formData.package}`,
          _replyto: formData.email,
          selectedPackage: selectedPackage
        })
      });
      
      if (response.ok) {
        setShowPackageForm(false);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          location: '',
          package: '',
          description: ''
        });
        setSelectedPackage(null);
        alert('Thank you! Your subscription request has been submitted. We will contact you within 24 hours.');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowPackageForm(false);
    setShowPackageSelection(false);
    setSelectedPackage(null);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      location: '',
      package: '',
      description: ''
    });
  };

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
                  className={`packages-card ${pkg.popular ? 'popular' : ''}`}
                  onClick={() => handlePackageClick(pkg)}
                >
                  <div className="packages-header">
                    <h3 className="packages-name">{pkg.name}</h3>
                    <div className="packages-speed">
                      <Zap size={20} />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="packages-price">
                    <span className="current-price">{pkg.price}</span>
                    <span className="price-period">per month</span>
                  </div>

                  <div className="packages-cta">
                    <button className="subscribee-btn">
                      Subscribe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                <button className="btn btn-primary" onClick={handleOrderNowClick}>
                  <Zap size={20} />
                  <span>Order Now</span>
                </button>
                
                <button className="btn btn-outline">
                  <span>Call:0730862862</span>
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

      {/* Package Selection Modal */}
      {showPackageSelection && (
        <div className="package-modal-overlay">
          <div className="package-modal-container">
            <div className="package-modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">Choose Your WiFi Package</h2>
                <p className="modal-subtitle">Select one of our affordable monthly plans</p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseForm} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            <div className="packages-selection-grid">
              {broadbandPackages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`package-selection-card ${pkg.popular ? 'popular' : ''} ${selectedPackage?.id === pkg.id ? 'selected' : ''}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  {pkg.popular && <div className="package-badge">Most Popular</div>}
                  
                  <div className="package-selection-header">
                    <h3 className="package-selection-name">{pkg.name}</h3>
                    <div className="package-selection-speed">
                      <Zap size={18} />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="package-selection-price">
                    <span className="current-price">{pkg.price}</span>
                    <span className="price-period">per month</span>
                  </div>

                  <div className="package-selection-tag">
                    <span>{pkg.tag}</span>
                  </div>

                  <div className="package-selection-cta">
                    <button 
                      className="select-package-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePackageSelect(pkg);
                      }}
                    >
                      {selectedPackage?.id === pkg.id ? '✓ Selected' : 'Select Package'}
                    </button>
                  </div>

                  {selectedPackage?.id === pkg.id && (
                    <div className="selection-indicator">
                      ✓ Package Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="package-selection-footer">
              <button 
                className="continue-btn"
                onClick={() => {
                  if (selectedPackage) {
                    setShowPackageSelection(false);
                    setShowPackageForm(true);
                  } else {
                    alert('Please select a package to continue');
                  }
                }}
                disabled={!selectedPackage}
              >
                Continue with {selectedPackage?.name || 'Package'}
              </button>
              
              <button 
                className="back-to-packages-btn"
                onClick={handleCloseForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Subscription Form Modal */}
      {showPackageForm && selectedPackage && (
        <div className="package-modal-overlay">
          <div className="package-modal-container">
            <div className="package-modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">Complete Your Subscription</h2>
                <p className="modal-subtitle">Fill out your details for {selectedPackage.name} package</p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseForm} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            {/* Back to Package Selection */}
            <div className="back-to-selection">
              <button className="back-btn" onClick={handleBackToSelection}>
                <ArrowLeft size={18} />
                <span>Change Package</span>
              </button>
            </div>

            {/* Selected Package Summary */}
            <div className="selected-package-summary">
              <div className="summary-header">
                <h3>Selected Package</h3>
              </div>
              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Package:</span>
                  <span className="summary-value">{selectedPackage.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Speed:</span>
                  <span className="summary-value">{selectedPackage.speed}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Price:</span>
                  <span className="summary-value">{selectedPackage.price} per month</span>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <form className="package-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-input"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-input"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    placeholder="e.g., 0730 862 862"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location/Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                  placeholder="Enter your full address for installation"
                />
              </div>

              <div className="form-group">
                <label htmlFor="package" className="form-label">
                  Selected Package <span className="required">*</span>
                </label>
                <select
                  id="package"
                  className="form-select"
                  value={formData.package}
                  onChange={(e) => setFormData({...formData, package: e.target.value})}
                  required
                  disabled
                >
                  <option value="">Select a package</option>
                  {broadbandPackages.map((pkg) => (
                    <option 
                      key={pkg.id} 
                      value={pkg.name}
                      selected={pkg.name === selectedPackage.name}
                    >
                      {pkg.name} - {pkg.speed} - {pkg.price}
                    </option>
                  ))}
                </select>
                <p className="form-hint">
                  Package automatically selected: <strong>{selectedPackage.name}</strong>
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="description"
                  className="form-textarea"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Any special requirements or notes for installation..."
                ></textarea>
              </div>

              <div className="form-footer">
                <div className="terms-agreement">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="terms-checkbox"
                  />
                  <label htmlFor="terms" className="terms-label">
                    I agree to the terms and conditions and understand that a technician will contact me to schedule installation.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Complete Subscription'
                  )}
                </button>
                
                <p className="form-note">
                  By submitting this form, you agree to our privacy policy and consent to be contacted by WeBA Solutions.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broadband;