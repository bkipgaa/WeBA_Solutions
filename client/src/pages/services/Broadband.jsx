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
  Shield, 
  Lock 
} from 'lucide-react';
import './Broadband.css';

// Hardcoded API URL
const API_BASE_URL = 'https://weba-payment.vercel.app/api';

const Broadband = () => {
  // State management for modals and forms
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  
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

  // Broadband packages
  const broadbandPackages = [
    { 
      id: 'wifi-swift',
      name: 'WiFi Swift', 
      speed: '5 Mbps',
      details: '5M/5M',
      priceKES: 1500,
      priceUSD: 12,
      priceEUR: 11,
      priceGBP: 9,
      priceFormatted: 'Ksh 1,500.00',
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
      priceKES: 2000,
      priceUSD: 16,
      priceEUR: 15,
      priceGBP: 13,
      priceFormatted: 'Ksh 2,000.00',
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
      speed: '15 Mbps',
      details: '15M/15M',
      priceKES: 3000,
      priceUSD: 24,
      priceEUR: 22,
      priceGBP: 19,
      priceFormatted: 'Ksh 3,000.00',
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

  const getUserCurrency = () => {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency) return savedCurrency;
    
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.includes('en-US')) return 'USD';
    if (browserLang.includes('en-GB')) return 'GBP';
    if (browserLang.includes('de') || browserLang.includes('fr') || browserLang.includes('es')) return 'EUR';
    return 'KES';
  };

  const getFormattedPrice = (pkg) => {
    const currency = getUserCurrency();
    
    switch(currency) {
      case 'USD':
        return `$${pkg.priceUSD}`;
      case 'EUR':
        return `€${pkg.priceEUR}`;
      case 'GBP':
        return `£${pkg.priceGBP}`;
      default:
        return pkg.priceFormatted;
    }
  };

  const getNumericPrice = (pkg) => {
    const currency = getUserCurrency();
    
    switch(currency) {
      case 'USD':
        return pkg.priceUSD;
      case 'EUR':
        return pkg.priceEUR;
      case 'GBP':
        return pkg.priceGBP;
      default:
        return pkg.priceKES;
    }
  };

  const getCurrencyCode = () => {
    return getUserCurrency();
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

  const handlePayStackPayment = async (paymentData) => {
    setIsProcessingPayment(true);
    setPaymentError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/initialize-paystack-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: paymentData.email,
          amount: paymentData.amount,
          packageName: paymentData.packageName,
          customerName: paymentData.customerName,
          phone: paymentData.phone,
          location: paymentData.location,
          currency: paymentData.currency
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        window.location.href = data.data.authorization_url;
      } else {
        setPaymentError(data.message || 'Failed to initialize payment');
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error('PayStack payment error:', error);
      setPaymentError('An error occurred. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handlePayPalPayment = async (paymentData) => {
  setIsProcessingPayment(true);
  setPaymentError('');
  
  try {
    const response = await fetch(`${API_BASE_URL}/initialize-paypal-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: paymentData.email,
        amount: paymentData.amount,
        packageName: paymentData.packageName,
        customerName: paymentData.customerName,
        phone: paymentData.phone,
        location: paymentData.location,
        currency: 'USD'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const { approval_url, reference } = data.data;

      // ✅ Save reference before redirect
      localStorage.setItem('paypal_reference', reference);

      window.location.href = approval_url;
    } else {
      setPaymentError(data.message || 'Failed to initialize PayPal payment');
      setIsProcessingPayment(false);
    }
  } catch (error) {
    console.error('PayPal payment error:', error);
    setPaymentError('An error occurred. Please try again.');
    setIsProcessingPayment(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setShowPaymentGateway(true);
    setShowPackageForm(false);
  };

  const processPayment = () => {
    const paymentData = {
      email: formData.email,
      amount: getNumericPrice(selectedPackage),
      packageName: selectedPackage.name,
      customerName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      location: formData.location,
      currency: getCurrencyCode()
    };
    
    if (selectedPaymentMethod === 'card') {
      handlePayStackPayment(paymentData);
    } else {
      handlePayPalPayment(paymentData);
    }
  };

  const handleCloseAll = () => {
    setShowPackageForm(false);
    setShowPackageSelection(false);
    setShowPaymentGateway(false);
    setSelectedPackage(null);
    setPaymentError('');
    setSelectedPaymentMethod('card');
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
                  {pkg.popular && <div className="popular-badge">Most Popular</div>}
                  <div className="packages-header">
                    <h3 className="packages-name">{pkg.name}</h3>
                    <div className="packages-speed">
                      <Zap size={20} />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="packages-price">
                    <span className="current-price">{getFormattedPrice(pkg)}</span>
                    <span className="price-period">per month</span>
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
            <h3>Secure Payments Accepted Worldwide</h3>
            <div className="payment-icons-container">
              <div className="payment-icon-card">
                <CreditCard size={32} />
                <span>Visa</span>
              </div>
              <div className="payment-icon-card">
                <CreditCard size={32} />
                <span>Mastercard</span>
              </div>
              <div className="payment-icon-card">
                <Wallet size={32} />
                <span>PayPal</span>
              </div>
              <div className="payment-icon-card">
                <Shield size={32} />
                <span>Secure</span>
              </div>
            </div>
            <p className="settlement-note">
              💰 All payments securely processed and settled to <strong>Equity Bank Kenya</strong>
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
                  <span>Call: 0730862862</span>
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
              <button className="modal-close-btn" onClick={handleCloseAll} aria-label="Close modal">
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
                    <span className="current-price">{getFormattedPrice(pkg)}</span>
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
                onClick={handleCloseAll}
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
              <button className="modal-close-btn" onClick={handleCloseAll} aria-label="Close modal">
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
                  <span className="summary-value">{getFormattedPrice(selectedPackage)} per month</span>
                </div>
              </div>
            </div>

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
                    placeholder="e.g., +254730862862"
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
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
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
                  Proceed to Payment
                </button>
                
                <p className="form-note">
                  You will be redirected to our secure payment page. We accept Visa, Mastercard, and PayPal.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentGateway && selectedPackage && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-container">
            <div className="payment-modal-header">
              <h2 className="payment-modal-title">Secure Payment</h2>
              <button className="close-btn" onClick={handleCloseAll}>×</button>
            </div>

            <div className="payment-order-summary">
              <h3>Order Summary</h3>
              <div className="summary-card">
                <div className="summary-row">
                  <span>Package:</span>
                  <strong>{selectedPackage.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Customer:</span>
                  <span>{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="summary-row">
                  <span>Email:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="summary-row total">
                  <span>Amount:</span>
                  <strong>{getFormattedPrice(selectedPackage)}</strong>
                </div>
              </div>
            </div>

            <div className="payment-method-selection">
              <h3>Select Payment Method</h3>
              <div className="payment-methods-grid">
                <div 
                  className={`payment-method-card ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setSelectedPaymentMethod('card')}
                >
                  <CreditCard size={28} />
                  <div className="method-info">
                    <h4>Credit/Debit Card</h4>
                    <p>Visa, Mastercard, American Express</p>
                    <div className="card-icons">
                      <span>Visa</span>
                      <span>Mastercard</span>
                      <span>Amex</span>
                    </div>
                  </div>
                  {selectedPaymentMethod === 'card' && <div className="selected-check">✓</div>}
                </div>

                <div 
                  className={`payment-method-card ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`}
                  onClick={() => setSelectedPaymentMethod('paypal')}
                >
                  <Wallet size={28} />
                  <div className="method-info">
                    <h4>PayPal</h4>
                    <p>PayPal balance, Credit/Debit Cards</p>
                    <div className="card-icons">
                      <span>PayPal</span>
                      <span>Visa</span>
                      <span>MC</span>
                    </div>
                  </div>
                  {selectedPaymentMethod === 'paypal' && <div className="selected-check">✓</div>}
                </div>
              </div>
            </div>

            {paymentError && (
              <div className="payment-error">
                <span>⚠️</span>
                <p>{paymentError}</p>
              </div>
            )}

            <div className="payment-security-info">
              <Lock size={16} />
              <span>256-bit SSL Encrypted Payment</span>
              <Shield size={16} />
              <span>PCI DSS Compliant</span>
            </div>

            <div className="payment-actions">
              <button 
                onClick={processPayment} 
                disabled={isProcessingPayment}
                className="pay-now-btn"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  `Pay ${getFormattedPrice(selectedPackage)}`
                )}
              </button>
              
              <button onClick={handleCloseAll} className="cancel-payment-btn">
                Cancel
              </button>
            </div>

            <p className="payment-footer-note">
              By proceeding, you agree to our terms and conditions. All payments are securely processed 
              and settled to Equity Bank Kenya.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Broadband;