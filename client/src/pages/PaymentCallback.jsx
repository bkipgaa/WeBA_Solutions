import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Hardcoded API URL
const API_BASE_URL = 'https://weba-payment.vercel.app/payment-callback';

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const reference = params.get('reference');
      const gateway = params.get('gateway');
      const token = params.get('token');
      // ✅ Remove unused payerId
      // const payerId = params.get('PayerID');
      
      // Try to get reference from localStorage if not in URL
      let actualReference = reference;
      let actualGateway = gateway;
      
      if (!actualReference) {
        const pendingPayment = localStorage.getItem('pendingPayment');
        if (pendingPayment) {
          const payment = JSON.parse(pendingPayment);
          actualReference = payment.reference;
          actualGateway = payment.gateway;
        }
      }
      
      if (!actualReference) {
        setStatus('error');
        setMessage('Missing payment reference.');
        return;
      }
      
      try {
        // ✅ USE UNIFIED VERIFICATION ENDPOINT
        const response = await axios.post(
          `${API_BASE_URL}/payment/verify`,
          {
            reference: actualReference,
            gateway: actualGateway || (token ? 'paypal' : 'paystack'),
            orderId: token || null
          }
        );
        
        if (response.data.success) {
          setStatus('success');
          setMessage('Payment successful! Your subscription is now active.');
          setPaymentDetails(response.data.data);
          
          // Clear stored payment data
          localStorage.removeItem('pendingPayment');
          localStorage.removeItem('paypal_reference');
          
          // Notify parent component
          if (window.opener) {
            window.opener.postMessage({ type: 'PAYMENT_SUCCESS', data: response.data.data }, '*');
          }
          
          // Redirect after 5 seconds
          setTimeout(() => {
            navigate('/broadband');
          }, 5000);
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Payment verification failed. Please contact support.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
        setMessage(error.response?.data?.message || 'An error occurred while verifying payment.');
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
                  <span>Transaction ID:</span>
                  <strong>{paymentDetails.transactionId || paymentDetails.reference}</strong>
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
            
            <button onClick={() => navigate('/broadband')} className="continue-btn">
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
              <button onClick={() => navigate('/broadband')} className="primary-btn">
                Return to Broadband
              </button>
              <button onClick={() => window.location.href = '/contact'} className="secondary-btn">
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;