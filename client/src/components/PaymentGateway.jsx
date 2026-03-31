import React, { useState } from 'react';
import axios from 'axios';
import { 
  Loader, 
  CreditCard, 
  Wallet,
  Globe,
  Shield,
  Lock,
  CheckCircle
} from 'lucide-react';
import './PaymentGateway.css';

// Hardcoded API URL
const API_BASE_URL = 'https://weba-payment.vercel.app/api';

const PaymentGateway = ({ 
  email,           
  amount,          
  packageName,     
  customerName,    
  phone,           
  location,        
  currency = 'USD',
  onSuccess,       
  onClose          
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGateway, setSelectedGateway] = useState('paystack');

  const handlePayStackPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/initialize-paystack-payment`,
        {
          email,
          amount,
          packageName,
          customerName,
          phone,
          location,
          currency: currency
        }
      );

      if (response.data.success) {
        window.location.href = response.data.data.authorization_url;
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
    const response = await axios.post(
      `${API_BASE_URL}/initialize-paypal-payment`,
      {
        email,
        amount,
        packageName,
        customerName,
        phone,
        location,
        currency: 'USD'
      }
    );

    if (response.data.success) {
      const { approval_url, reference } = response.data.data;

      // ✅ Save reference for callback use
      localStorage.setItem('paypal_reference', reference);

      // ✅ Redirect to PayPal
      window.location.href = approval_url;
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
        <div className="gateway-header">
          <div className="header-left">
            <h2 className="gateway-title">Secure Payment</h2>
            <p className="gateway-subtitle">Choose your preferred payment method</p>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

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
            <div className="summary-row total">
              <span>Amount to Pay:</span>
              <strong>
                {currency === 'KES' ? 'Ksh' : 
                 currency === 'EUR' ? '€' : 
                 currency === 'GBP' ? '£' : '$'} 
                {amount.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>

        <div className="gateway-selection">
          <h3>Select Payment Method</h3>
          <div className="gateways-grid">
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
                </div>
              </div>
              {selectedGateway === 'paystack' && (
                <div className="selected-indicator">
                  <CheckCircle size={20} />
                </div>
              )}
            </div>

            <div
              className={`gateway-card ${selectedGateway === 'paypal' ? 'selected' : ''}`}
              onClick={() => setSelectedGateway('paypal')}
            >
              <div className="gateway-icon paypal-icon">
                <Wallet size={28} />
              </div>
              <div className="gateway-info">
                <h4>Pay with PayPal</h4>
                <p>PayPal balance, Credit/Debit Cards</p>
                <div className="payment-icons">
                  <span className="card-icon paypal">PayPal</span>
                  <span className="card-icon visa">Visa</span>
                  <span className="card-icon mastercard">MC</span>
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
          <p className="settlement-note">
            💰 All payments are securely processed through <strong>PayStack</strong> and <strong>PayPal</strong>, 
            and settled to <strong>Equity Bank Kenya</strong>.
          </p>
          <p className="help-note">
            Need help? Contact us at support@webasolutions.net or call 0718831298
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;