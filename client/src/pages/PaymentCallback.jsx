import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use environment variable or default to local backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      // Get all parameters from URL
      const params = new URLSearchParams(location.search);
      const reference = params.get('reference');
      const gateway = params.get('gateway');
      const token = params.get('token');
      const trxref = params.get('trxref'); // PayStack sometimes uses this
      
      // Debug logging
      console.log('🔍 Payment Callback Debug:');
      console.log('Full URL:', window.location.href);
      console.log('Reference from URL:', reference);
      console.log('Gateway from URL:', gateway);
      console.log('Token from URL:', token);
      console.log('trxref from URL:', trxref);
      
      // Use trxref if reference is null (PayStack fallback)
      let actualReference = reference || trxref;
      let actualGateway = gateway;
      
      // If still no reference, try localStorage
      if (!actualReference) {
        console.log('No reference in URL, checking localStorage...');
        const pendingPayment = localStorage.getItem('pendingPayment');
        if (pendingPayment) {
          try {
            const payment = JSON.parse(pendingPayment);
            actualReference = payment.reference;
            actualGateway = payment.gateway;
            console.log('Found in localStorage:', { actualReference, actualGateway });
          } catch (e) {
            console.error('Error parsing localStorage:', e);
          }
        }
      }
      
      // Determine gateway if not provided
      if (!actualGateway) {
        if (actualReference && actualReference.startsWith('PAYPAL')) {
          actualGateway = 'paypal';
        } else if (actualReference && actualReference.startsWith('PAYSTACK')) {
          actualGateway = 'paystack';
        } else if (token) {
          actualGateway = 'paypal';
        } else {
          actualGateway = 'paystack';
        }
        console.log('Gateway auto-detected as:', actualGateway);
      }
      
      // Final validation
      if (!actualReference) {
        console.error('Missing payment reference');
        setStatus('error');
        setMessage('Missing payment reference. Please contact support.');
        return;
      }
      
      console.log('📤 Sending verification request:', {
        reference: actualReference,
        gateway: actualGateway,
        orderId: token || null
      });
      
      try {
        const response = await axios.post(
          `${API_BASE_URL}/payment/verify`,
          {
            reference: actualReference,
            gateway: actualGateway,
            orderId: token || null
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'  // ✅ Add this to bypass ngrok warning
            },
            timeout: 30000
          }
        );
        
        console.log('✅ Verification response:', response.data);
        
        if (response.data.success) {
          setStatus('success');
          setMessage('Payment successful! Your subscription is now active.');
          setPaymentDetails(response.data.data);
          
          // Clear stored payment data
          localStorage.removeItem('pendingPayment');
          localStorage.removeItem('paypal_reference');
          
          // Notify parent component if in popup
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ 
              type: 'PAYMENT_SUCCESS', 
              data: response.data.data 
            }, '*');
          }
          
          // Redirect after 5 seconds
          setTimeout(() => {
            navigate('/services');
          }, 5000);
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Payment verification failed. Please contact support.');
        }
      } catch (error) {
        console.error('❌ Payment verification error:', error);
        
        // Detailed error handling
        if (error.code === 'ERR_NETWORK') {
          setMessage(`Network error: Cannot connect to ${API_BASE_URL}. Please check if backend is running.`);
        } else if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          setMessage(error.response.data?.message || `Server error: ${error.response.status}`);
        } else if (error.request) {
          setMessage('No response from server. Please check your connection.');
        } else {
          setMessage(error.message || 'An error occurred while verifying payment.');
        }
        setStatus('error');
      }
    };
    
    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-callback-page">
      <div className="callback-container">
        {status === 'verifying' && (
          <div className="verifying-state">
            <div className="spinner-large"></div>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your transaction.</p>
            <p className="debug-info" style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
              Checking with: {API_BASE_URL}
            </p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p>{message}</p>
            
            {paymentDetails && (
              <div className="payment-details-card">
                <h3>Payment Details</h3>
                <div className="detail-row">
                  <span>Reference:</span>
                  <strong>{paymentDetails.reference}</strong>
                </div>
                <div className="detail-row">
                  <span>Transaction ID:</span>
                  <strong>{paymentDetails.transactionId || 'N/A'}</strong>
                </div>
                <div className="detail-row">
                  <span>Package:</span>
                  <strong>{paymentDetails.packageName}</strong>
                </div>
                <div className="detail-row">
                  <span>Amount:</span>
                  <strong>
                    {paymentDetails.currency === 'KES' ? 'KSh ' : 
                     paymentDetails.currency === 'EUR' ? '€ ' : 
                     paymentDetails.currency === 'GBP' ? '£ ' : '$ '}
                    {paymentDetails.amount}
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Payment Method:</span>
                  <strong className="status-badge">{paymentDetails.paymentMethod || paymentDetails.gateway}</strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <strong className="status-badge success">Completed</strong>
                </div>
              </div>
            )}
            
            <button onClick={() => navigate('/services')} className="continue-btn">
              Continue to Dashboard
            </button>
          </div>
        )}
        
        {status === 'error' && (
          <div className="error-state">
            <div className="error-icon">✗</div>
            <h2>Payment Verification Failed</h2>
            <p>{message}</p>
            
            <div className="error-actions">
              <button onClick={() => navigate('/services')} className="primary-btn">
                Return to Broadband
              </button>
              <button onClick={() => window.location.href = '/contact'} className="secondary-btn">
                Contact Support
              </button>
            </div>
            
            {/* Show debug info in development */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px', textAlign: 'left' }}>
                <p style={{ fontSize: '12px', margin: 0 }}><strong>Debug Info:</strong></p>
                <p style={{ fontSize: '12px', margin: '5px 0' }}>API URL: {API_BASE_URL}</p>
                <p style={{ fontSize: '12px', margin: '5px 0' }}>URL: {window.location.href}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;