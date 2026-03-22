/**
 * PAYPAL PAYMENT INITIALIZATION
 * Converted from your original Express route
 * POST /api/initialize-paypal-payment
 */

const axios = require('axios');
const { generateReference, pendingTransactions } = require('../utils/helpers');
const { getPayPalAccessToken, PAYPAL_API_URL } = require('../utils/paypal');

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

  // Simple validation
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
    const reference = generateReference('PAYPAL');
    
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
      gateway: 'paypal'
    });
    
    const accessToken = await getPayPalAccessToken();
    
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: reference,
        description: `${packageName} - WiFi Subscription`,
        custom_id: reference,
        amount: {
          currency_code: currency,
          value: amount.toFixed(2)
        },
        items: [{
          name: `${packageName} Broadband Package`,
          description: `Monthly ${packageName} internet subscription`,
          quantity: '1',
          unit_amount: {
            currency_code: currency,
            value: amount.toFixed(2)
          },
          sku: packageName.replace(/\s/g, '-').toLowerCase(),
          category: 'DIGITAL_GOODS'
        }],
        payee: {
          email: process.env.PAYPAL_MERCHANT_EMAIL
        }
      }],
      application_context: {
        brand_name: 'WeBA Solutions',
        locale: 'en-US',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.FRONTEND_URL}/payment-callback?gateway=paypal`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
        shipping_preference: 'NO_SHIPPING'
      },
      payer: {
        name: {
          given_name: customerName.split(' ')[0],
          surname: customerName.split(' ').slice(1).join(' ') || 'Customer'
        },
        email_address: email,
        phone: {
          phone_type: 'MOBILE',
          phone_number: {
            national_number: phone.replace(/\D/g, '')
          }
        }
      }
    };
    
    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    
    const approvalLink = response.data.links.find(link => link.rel === 'approve');
    
    return res.json({
      success: true,
      message: 'PayPal payment initialized successfully',
      approval_url: approvalLink.href,
      order_id: response.data.id,
      reference: reference
    });
    
  } catch (error) {
    console.error('❌ PayPal initialization error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to initialize PayPal payment',
      error: process.env.NODE_ENV === 'development' ? error.response?.data?.message : 'Payment initialization failed'
    });
  }
};