import React, { useState } from 'react';
import axios from 'axios';
import { 
  Loader, 
  CreditCard, 
  Wallet,  // Changed from Paypal to Wallet
  Globe,
  Shield,
  Lock,
  CheckCircle
} from 'lucide-react';
import './PaymentGateway.css';

/**
 * Payment Gateway Component
 * Handles payments via PayStack (Visa/Mastercard) and PayPal
 */
const PaymentGateway = ({ 
  email,           // Customer email address
  amount,          // Payment amount in selected currency
  packageName,     // Selected package name
  customerName,    // Full name of customer
  phone,           // Contact phone number
  location,        // Installation address
  currency = 'USD', // Currency for international payments
  onSuccess,       // Callback on successful payment
  onClose          // Callback to close modal
}) => {
  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGateway, setSelectedGateway] = useState('paystack');

  const handlePayStackPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/initialize-paystack-payment', {
        email,
        amount,
        packageName,
        customerName,
        phone,
        location,
        currency: currency
      });

      if (response.data.success) {
        window.location.href = response.data.authorization_url;
      } else {
        setError(response.data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('PayStack payment error:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/initialize-paypal-payment', {
        email,
        amount,
        packageName,
        customerName,
        phone,
        location,
        currency: 'USD'
      });

      if (response.data.success) {
        window.location.href = response.data.approval_url;
      } else {
        setError(response.data.message || 'Failed to initialize PayPal payment');
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (selectedGateway === 'paystack') {
      handlePayStackPayment();
    } else if (selectedGateway === 'paypal') {
      handlePayPalPayment();
    }
  };

  return (
    <div className="payment-gateway-overlay">
      <div className="payment-gateway-container">
        {/* Modal Header */}
        <div className="gateway-header">
          <div className="header-left">
            <h2 className="gateway-title">Secure Payment</h2>
            <p className="gateway-subtitle">Choose your preferred payment method</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span>Package:</span>
              <strong>{packageName}</strong>
            </div>
            <div className="summary-row">
              <span>Customer:</span>
              <span>{customerName}</span>
            </div>
            <div className="summary-row">
              <span>Email:</span>
              <span>{email}</span>
            </div>
            <div className="summary-row">
              <span>Phone:</span>
              <span>{phone}</span>
            </div>
            <div className="summary-row total">
              <span>Amount to Pay:</span>
              <strong>
                {currency === 'KES' ? 'Ksh' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '$'} 
                {amount.toLocaleString()} {currency !== 'KES' && currency !== 'USD' ? currency : ''}
              </strong>
            </div>
          </div>
        </div>

        {/* Payment Gateway Selection */}
        <div className="gateway-selection">
          <h3>Select Payment Method</h3>
          <div className="gateways-grid">
            
            {/* PayStack Gateway - Visa and Mastercard */}
            <div
              className={`gateway-card ${selectedGateway === 'paystack' ? 'selected' : ''}`}
              onClick={() => setSelectedGateway('paystack')}
            >
              <div className="gateway-icon paystack-icon">
                <CreditCard size={28} />
              </div>
              <div className="gateway-info">
                <h4>Pay with Card</h4>
                <p>Visa, Mastercard, American Express</p>
                <div className="payment-icons">
                  <span className="card-icon visa">Visa</span>
                  <span className="card-icon mastercard">Mastercard</span>
                  <span className="card-icon amex">Amex</span>
                </div>
                <div className="gateway-features">
                  <span className="feature-badge">
                    <Globe size={12} />
                    International Cards
                  </span>
                  <span className="feature-badge">
                    <Shield size={12} />
                    256-bit SSL
                  </span>
                </div>
              </div>
              {selectedGateway === 'paystack' && (
                <div className="selected-indicator">
                  <CheckCircle size={20} />
                </div>
              )}
            </div>

            {/* PayPal Gateway - PayPal, Visa, Mastercard */}
            <div
              className={`gateway-card ${selectedGateway === 'paypal' ? 'selected' : ''}`}
              onClick={() => setSelectedGateway('paypal')}
            >
              <div className="gateway-icon paypal-icon">
                <Wallet size={28} /> {/* Changed from PaypalIcon to Wallet */}
              </div>
              <div className="gateway-info">
                <h4>Pay with PayPal</h4>
                <p>PayPal balance, Credit/Debit Cards</p>
                <div className="payment-icons">
                  <span className="card-icon paypal">PayPal</span>
                  <span className="card-icon visa">Visa</span>
                  <span className="card-icon mastercard">MC</span>
                </div>
                <div className="gateway-features">
                  <span className="feature-badge">
                    <Globe size={12} />
                    200+ Countries
                  </span>
                  <span className="feature-badge">
                    <Shield size={12} />
                    Buyer Protection
                  </span>
                </div>
              </div>
              {selectedGateway === 'paypal' && (
                <div className="selected-indicator">
                  <CheckCircle size={20} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* International Payment Information */}
        <div className="international-info">
          <div className="info-card">
            <Globe size={20} />
            <div className="info-content">
              <strong>International Payments Accepted</strong>
              <p>We accept payments from USA, Europe, UK, Canada, Australia, and worldwide. 
                 Your payment will be securely processed in your local currency.</p>
            </div>
          </div>
          <div className="info-card">
            <Lock size={20} />
            <div className="info-content">
              <strong>Secure & Encrypted</strong>
              <p>All transactions are secured with 256-bit SSL encryption and PCI DSS compliance. 
                 Your payment information is never stored on our servers.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <div className="payment-actions">
          <button 
            onClick={handlePayment} 
            disabled={loading}
            className={`pay-btn ${selectedGateway}`}
          >
            {loading ? (
              <>
                <Loader className="spinner" size={20} />
                Processing...
              </>
            ) : (
              <>
                {selectedGateway === 'paystack' ? (
                  <>Pay with Visa / Mastercard</>
                ) : (
                  <>Pay with PayPal</>
                )}
              </>
            )}
          </button>
          
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>

        <div className="settlement-info">
          <div className="security-badge">
            <Shield size={16} />
            <span>PCI DSS Compliant</span>
          </div>
          <p className="settlement-note">
            💰 All payments are securely processed through <strong>PayStack</strong> and <strong>PayPal</strong>, 
            and settled to <strong>Equity Bank Kenya</strong>. International payments are automatically converted 
            to KES at current exchange rates.
          </p>
          <p className="help-note">
            Need help? Contact us at support@webasolutions.com or call +254 730 862 862
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;