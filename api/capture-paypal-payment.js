/**
 * PAYPAL CAPTURE PAYMENT
 * Converted from your original Express route
 * POST /api/capture-paypal-payment
 */

const axios = require('axios');
const { pendingTransactions } = require('../utils/helpers');
const { getPayPalAccessToken, PAYPAL_API_URL } = require('../utils/paypal');
const { saveSubscriptionToDatabase, sendConfirmationEmail } = require('../utils/email');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { orderId, reference } = req.body;
  
  if (!orderId || !reference) {
    return res.status(400).json({ success: false, message: 'orderId and reference are required' });
  }
  
  try {
    const accessToken = await getPayPalAccessToken();
    
    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const captureData = response.data;
    
    if (captureData.status === 'COMPLETED') {
      const transaction = pendingTransactions.get(reference);
      
      if (transaction) {
        transaction.status = 'completed';
        transaction.paymentData = captureData;
        pendingTransactions.set(reference, transaction);
        
        const emailPaymentData = {
          customer: { email: transaction.email },
          metadata: {
            customer_name: transaction.customerName,
            package_name: transaction.packageName,
            phone: transaction.phone,
            location: transaction.location
          },
          amount: transaction.amount,
          currency: transaction.currency,
          reference: reference,
          channel: 'paypal',
          paid_at: new Date().toISOString(),
          transactionId: captureData.purchase_units[0].payments.captures[0].id
        };
        
        await saveSubscriptionToDatabase({
          reference,
          customerName: transaction.customerName,
          email: transaction.email,
          phone: transaction.phone,
          location: transaction.location,
          packageName: transaction.packageName,
          amount: transaction.amount,
          currency: transaction.currency,
          paymentDate: new Date(),
          transactionId: captureData.purchase_units[0].payments.captures[0].id,
          paymentMethod: captureData.purchase_units[0].payments.captures[0].payment_source?.card?.brand || 'paypal',
          paymentGateway: 'paypal',
          status: 'active'
        });
        
        await sendConfirmationEmail(emailPaymentData);
        
        return res.json({
          success: true,
          message: 'Payment captured successfully',
          data: {
            reference: reference,
            amount: transaction.amount,
            currency: transaction.currency,
            packageName: transaction.packageName,
            transactionId: captureData.purchase_units[0].payments.captures[0].id,
            paymentMethod: captureData.purchase_units[0].payments.captures[0].payment_source?.card?.brand || 'PayPal',
            status: 'completed'
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
      }
    } else {
      return res.json({
        success: false,
        message: 'Payment capture failed',
        status: captureData.status
      });
    }
    
  } catch (error) {
    console.error('❌ PayPal capture error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to capture PayPal payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};