import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import './PaymentCallback.css';

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
      const payerId = params.get('PayerID');
      
      if (gateway === 'paypal' && token && reference) {
        // Verify PayPal payment
        try {
          const response = await axios.post(
            `${config.api.baseUrl}${config.payments.paypal.captureEndpoint}`,
            {
              orderId: token,
              reference: reference
            }
          );
          
          if (response.data.success) {
            setStatus('success');
            setMessage('Payment successful! Your subscription is now active.');
            setPaymentDetails(response.data.data);
            
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
            setMessage('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('PayPal verification error:', error);
          setStatus('error');
          setMessage('An error occurred while verifying payment.');
        }
      } else if (reference) {
        // Verify PayStack payment
        try {
          const response = await axios.get(
            `${config.api.baseUrl}${config.payments.paystack.verifyEndpoint(reference)}`
          );
          
          if (response.data.success) {
            setStatus('success');
            setMessage('Payment successful! Your subscription is now active.');
            setPaymentDetails(response.data.data);
            
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
            setMessage('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('PayStack verification error:', error);
          setStatus('error');
          setMessage('An error occurred while verifying payment.');
        }
      } else {
        setStatus('error');
        setMessage('Invalid payment reference.');
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
                    {paymentDetails.currency === 'KES' ? 'Ksh' : '$'} {paymentDetails.amount}
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Status:</span>
                  <strong className="status-badge">Completed</strong>
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