import React, { useState } from 'react';
import axios from 'axios';
import { 
  Loader, 
  CreditCard, 
  Wallet,
  CheckCircle
} from 'lucide-react';
import './PaymentGateway.css';

// Use environment variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

  // ✅ UNIFIED PAYMENT INITIALIZATION with currency fixing
  const handleUnifiedPayment = async () => {
  setLoading(true);
  setError('');

  // ✅ Ensure amount is a number
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    setError('Invalid amount format');
    setLoading(false);
    return;
  }

  let finalAmount = numericAmount;
  let finalCurrency;
  
  if (selectedGateway === 'paystack') {
    finalCurrency = 'KES';
    console.log(`💰 PayStack payment: ${finalCurrency} ${finalAmount}`);
  } else if (selectedGateway === 'paypal') {
    finalCurrency = 'USD';
    // Convert KES to USD if needed
    if (currency === 'KES') {
      finalAmount = (numericAmount / 130).toFixed(2);
    }
    console.log(`💰 PayPal payment: ${finalCurrency} ${finalAmount}`);
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/payment/initialize`,
      {
        email,
        amount: parseFloat(finalAmount), // ✅ Ensure it's a number
        packageName,
        customerName,
        phone,
        location,
        currency: finalCurrency,
        gateway: selectedGateway
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );

      console.log('✅ Payment initialization response:', response.data);

      if (response.data.success) {
        // Store transaction reference for callback
        const reference = response.data.data?.reference;
        if (reference) {
          localStorage.setItem('pendingPayment', JSON.stringify({
            reference,
            gateway: selectedGateway,
            amount: finalAmount,
            packageName,
            timestamp: Date.now()
          }));
        }

        // Redirect to payment gateway
        if (selectedGateway === 'paystack') {
          const authUrl = response.data.data.authorization_url;
          if (authUrl) {
            window.location.href = authUrl;
          } else {
            throw new Error('No authorization URL received');
          }
        } else if (selectedGateway === 'paypal') {
          const approvalUrl = response.data.data.approval_url;
          if (approvalUrl) {
            window.location.href = approvalUrl;
          } else {
            throw new Error('No approval URL received');
          }
        }
      } else {
        setError(response.data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      
      // Better error handling based on error type
      if (error.code === 'ERR_NETWORK') {
        setError(`Cannot connect to payment server. Please ensure backend is running at ${API_BASE_URL}`);
      } else if (error.code === 'ECONNABORTED') {
        setError('Request timeout. Please try again.');
      } else if (error.response?.data?.code === 'unsupported_currency') {
        setError('Currency not supported. Please use KES for card payments or USD for PayPal.');
      } else if (error.response) {
        setError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from payment server. Please check your connection.');
      } else {
        setError(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    handleUnifiedPayment();
  };

  // Get display amount based on selected gateway
  const getDisplayAmount = () => {
    if (selectedGateway === 'paystack') {
      return `KSh ${amount.toLocaleString()}`;
    } else if (selectedGateway === 'paypal') {
      const usdAmount = (amount / 130).toFixed(2);
      return `$${usdAmount}`;
    }
    return `${currency === 'KES' ? 'KSh' : '$'} ${amount.toLocaleString()}`;
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
              <strong>{getDisplayAmount()}</strong>
            </div>
            {selectedGateway === 'paypal' && currency === 'KES' && (
              <div className="summary-row note">
                <small>* Converted from KES to USD at approximate rate</small>
              </div>
            )}
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
                <h4>Pay with Card (KES)</h4>
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
                <h4>Pay with PayPal (USD)</h4>
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
                  <>Pay {getDisplayAmount()} with Card</>
                ) : (
                  <>Pay {getDisplayAmount()} with PayPal</>
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
            💰 All payments are securely processed through <strong>PayStack</strong> (KES) and <strong>PayPal</strong> (USD), 
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