/**
 * PAYSTACK PAYMENT INITIALIZATION
 * Converted from your original Express route
 * POST /api/initialize-paystack-payment
 */

const axios = require('axios');
const { generateReference, convertToSmallestUnit, pendingTransactions } = require('../utils/helpers');

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

  // Simple validation (replacing express-validator)
  const { email, amount, packageName, customerName, phone, location, currency = 'USD' } = req.body;
  
  const errors = [];
  if (!email) errors.push('Email is required');
  if (!amount || amount < 1) errors.push('Amount must be at least 1');
  if (!packageName) errors.push('Package name is required');
  if (!customerName) errors.push('Customer name is required');
  if (!phone) errors.push('Phone is required');
  if (!location) errors.push('Location is required');
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  try {
    const reference = generateReference('PAYSTACK');
    
    // Store in pending transactions (same as your original)
    pendingTransactions.set(reference, {
      email,
      amount,
      packageName,
      customerName,
      phone,
      location,
      currency,
      createdAt: new Date(),
      status: 'pending',
      gateway: 'paystack'
    });
    
    const amountInSmallestUnit = convertToSmallestUnit(amount, currency);
    
    const paymentData = {
      email,
      amount: amountInSmallestUnit,
      currency,
      reference,
      metadata: {
        package_name: packageName,
        customer_name: customerName,
        phone: phone,
        location: location,
        currency: currency
      },
      channels: ['card'],
      callback_url: `${process.env.FRONTEND_URL}/payment-callback?gateway=paystack`,
      subaccount: process.env.EQUITY_SUBACCOUNT_CODE
    };
    
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return res.json({
      success: true,
      message: 'Payment initialized successfully',
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference,
      access_code: response.data.data.access_code
    });
    
  } catch (error) {
    console.error('❌ PayStack initialization error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to initialize payment',
      error: process.env.NODE_ENV === 'development' ? error.response?.data?.message : 'Payment initialization failed'
    });
  }
};