import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  CheckCircle, 
  Globe, 
  X, 
  ArrowLeft, 
  CreditCard, 
  Wallet,
  Shield
} from 'lucide-react';
import './Broadband.css';
import PaymentGateway from '../../components/PaymentGateway';

const Broadband = () => {
  // State management for modals and forms
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    package: '',
    description: '',
    agreeTerms: false
  });

  // Features data
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

  // ✅ Broadband packages with correct KES prices (for PayStack)
  const broadbandPackages = [
    { 
      id: 'basic',
      name: 'Basic',
      displayName: 'Basic Broadband',
      speed: '5 Mbps',
      priceKES: 1500,
      priceUSD: 12,
      priceFormatted: 'KSh 1,500',
      duration: '1 Month',
      popular: false,
      tag: 'Budget Friendly',
      description: 'Perfect for light browsing and email',
      devices: '1-2'
    },
    { 
      id: 'standard',
      name: 'Standard',
      displayName: 'Standard Broadband',
      speed: '10 Mbps',
      priceKES: 2500,
      priceUSD: 19,
      priceFormatted: 'KSh 2,500',
      duration: '1 Month',
      popular: true,
      tag: 'Most Popular',
      description: 'Ideal for streaming and home office',
      devices: '3-5'
    },
    { 
      id: 'premium',
      name: 'Premium',
      displayName: 'Premium Broadband',
      speed: '20 Mbps',
      priceKES: 4000,
      priceUSD: 31,
      priceFormatted: 'KSh 4,000',
      duration: '1 Month',
      popular: false,
      tag: 'High Speed',
      description: 'Great for gaming and 4K streaming',
      devices: '5-10'
    },
    { 
      id: 'business',
      name: 'Business',
      displayName: 'Business Broadband',
      speed: '50 Mbps',
      priceKES: 7000,
      priceUSD: 54,
      priceFormatted: 'KSh 7,000',
      duration: '1 Month',
      popular: false,
      tag: 'Business Grade',
      description: 'For small to medium businesses',
      devices: '10-20'
    },
    { 
      id: 'home-package',
      name: 'Home Package',
      displayName: 'Home Package',
      speed: '15 Mbps',
      priceKES: 3000,
      priceUSD: 23,
      priceFormatted: 'KSh 3,000',
      duration: '1 Month',
      popular: false,
      tag: 'Family Friendly',
      description: 'Perfect for family use',
      devices: '3-6'
    }
  ];

  const benefits = [
    { title: 'Stable Connection', desc: 'Consistent speeds for uninterrupted usage', icon: '📶' },
    { title: 'Low Latency', desc: 'Perfect for gaming and video calls', icon: '🎮' },
    { title: 'Reliable Uptime', desc: '99.9% uptime guarantee', icon: '⏱️' },
    { title: 'Secure Network', desc: 'Advanced security features included', icon: '🔒' }
  ];

  const getFormattedPrice = (pkg) => {
    return pkg.priceFormatted;
  };

  const getNumericPrice = (pkg) => {
    return pkg.priceKES;
  };

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

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert('Please enter your first name');
      return false;
    }
    if (!formData.lastName.trim()) {
      alert('Please enter your last name');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return false;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!formData.location.trim()) {
      alert('Please enter your location/address');
      return false;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      setShowPaymentGateway(true);
      setShowPackageForm(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleCloseAll = () => {
    setShowPackageForm(false);
    setShowPackageSelection(false);
    setShowPaymentGateway(false);
    setSelectedPackage(null);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      location: '',
      package: '',
      description: '',
      agreeTerms: false
    });
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    handleCloseAll();
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
            <p className="service-tagline">High-speed, reliable fiber internet for homes and businesses worldwide</p>
            <div className="international-badge">
              <Globe size={16} />
              <span>🌍 International Payments Accepted - Visa, Mastercard, PayPal</span>
            </div>
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
          {/* Packages Grid */}
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
                  {pkg.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="packages-header">
                    <h3 className="packages-name">{pkg.displayName}</h3>
                    <div className="packages-speed">
                      <Zap size={20} />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="packages-price">
                    <span className="current-price">{getFormattedPrice(pkg)}</span>
                    <span className="price-period">per month</span>
                  </div>

                  <div className="packages-description">
                    <p>{pkg.description}</p>
                  </div>

                  <div className="packages-features">
                    <small>📱 Up to {pkg.devices} devices</small>
                  </div>

                  <div className="packages-cta">
                    <button className="subscribee-btn">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods Showcase */}
          <div className="payment-methods-showcase">
            <h3>Secure Payments Accepted</h3>
            <div className="payment-icons-container">
              <div className="payment-icon-card">
                <CreditCard size={32} />
                <span>Visa (KES)</span>
              </div>
              <div className="payment-icon-card">
                <CreditCard size={32} />
                <span>Mastercard (KES)</span>
              </div>
              <div className="payment-icon-card">
                <Wallet size={32} />
                <span>PayPal (USD)</span>
              </div>
              <div className="payment-icon-card">
                <Shield size={32} />
                <span>Secure</span>
              </div>
            </div>
            <p className="settlement-note">
              💰 Card payments in KES via PayStack | PayPal payments in USD
            </p>
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
                  <span>Call: 0718831298</span>
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
              <button className="modal-close-btn" onClick={handleCloseAll}>
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
                    <h3 className="package-selection-name">{pkg.displayName}</h3>
                    <div className="package-selection-speed">
                      <Zap size={18} />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="package-selection-price">
                    <span className="current-price">{getFormattedPrice(pkg)}</span>
                    <span className="price-period">per month</span>
                  </div>

                  <div className="package-selection-description">
                    <p>{pkg.description}</p>
                  </div>

                  <div className="package-selection-tag">
                    <span>{pkg.tag}</span>
                  </div>

                  <div className="package-selection-cta">
                    <button className="select-package-btn">
                      {selectedPackage?.id === pkg.id ? '✓ Selected' : 'Select Package'}
                    </button>
                  </div>
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
                Continue with {selectedPackage?.displayName || 'Package'}
              </button>
              
              <button className="back-to-packages-btn" onClick={handleCloseAll}>
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
                <p className="modal-subtitle">Fill out your details for {selectedPackage.displayName} package</p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseAll}>
                <X size={24} />
              </button>
            </div>

            <div className="back-to-selection">
              <button className="back-btn" onClick={handleBackToSelection}>
                <ArrowLeft size={18} />
                <span>Change Package</span>
              </button>
            </div>

            <div className="selected-package-summary">
              <h3>Selected Package</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Package:</span>
                  <strong>{selectedPackage.displayName}</strong>
                </div>
                <div className="summary-row">
                  <span>Speed:</span>
                  <strong>{selectedPackage.speed}</strong>
                </div>
                <div className="summary-row">
                  <span>Price:</span>
                  <strong>{getFormattedPrice(selectedPackage)}/month</strong>
                </div>
              </div>
            </div>

            <form className="package-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required

                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location/Address *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                  placeholder="Enter your full address"
                />
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Any special requirements..."
                />
              </div>

              <div className="form-footer">
                <div className="terms-agreement">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    required
                  />
                  <label htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentGateway && selectedPackage && (
        <PaymentGateway
          email={formData.email}
          amount={getNumericPrice(selectedPackage)}
          packageName={selectedPackage.name}
          customerName={`${formData.firstName} ${formData.lastName}`}
          phone={formData.phone}
          location={formData.location}
          currency="KES"
          onSuccess={handlePaymentSuccess}
          onClose={handleCloseAll}
        />
      )}
    </div>
  );
};

export default Broadband;