/**
 * PAYSTACK PAYMENT VERIFICATION
 * Converted from your original Express route
 * GET /api/verify-paystack-payment/:reference
 */

const axios = require('axios');
const { pendingTransactions } = require('../utils/helpers');
const { saveSubscriptionToDatabase, sendConfirmationEmail, sendAdminNotification } = require('../utils/email');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get reference from URL path
    const reference = req.query.reference || req.url.split('/').pop();
    
    if (!reference) {
      return res.status(400).json({ success: false, message: 'Reference is required' });
    }
    
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );
    
    const paymentData = response.data.data;
    
    if (paymentData.status === 'success') {
      const transaction = pendingTransactions.get(reference);
      if (transaction) {
        transaction.status = 'completed';
        transaction.paymentData = paymentData;
        pendingTransactions.set(reference, transaction);
      }
      
      await saveSubscriptionToDatabase({
        reference,
        customerName: paymentData.metadata.customer_name,
        email: paymentData.customer.email,
        phone: paymentData.metadata.phone,
        location: paymentData.metadata.location,
        packageName: paymentData.metadata.package_name,
        amount: paymentData.amount / 100,
        currency: paymentData.currency,
        paymentDate: new Date(paymentData.paid_at),
        transactionId: paymentData.id,
        paymentMethod: paymentData.channel,
        paymentGateway: 'paystack',
        status: 'active'
      });
      
      await sendConfirmationEmail(paymentData);
      await sendAdminNotification(paymentData);
      
      return res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          reference: paymentData.reference,
          amount: paymentData.amount / 100,
          currency: paymentData.currency,
          packageName: paymentData.metadata.package_name,
          paymentMethod: paymentData.channel,
          transactionId: paymentData.id,
          status: 'completed'
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Payment verification failed',
        status: paymentData.status
      });
    }
  } catch (error) {
    console.error('❌ Payment verification error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};