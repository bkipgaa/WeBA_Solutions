// ============================================
// DEPENDENCIES IMPORT
// ============================================
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// SECURITY MIDDLEWARE CONFIGURATION
// ============================================

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// ============================================
// RATE LIMITING
// ============================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// ============================================
// PAYMENT GATEWAY CONFIGURATION
// ============================================
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MERCHANT_EMAIL = process.env.PAYPAL_MERCHANT_EMAIL;

const PAYPAL_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// ============================================
// TRANSACTION STORAGE
// ============================================
const pendingTransactions = new Map();

// ============================================
// EMAIL CONFIGURATION
// ============================================
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

const generateReference = (gateway = 'PAY') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${gateway}-${timestamp}-${random}`;
};

const convertToSmallestUnit = (amount, currency = 'KES') => {
  const decimalPlaces = {
    'KES': 2,
    'USD': 2,
    'EUR': 2,
    'GBP': 2,
    'JPY': 0
  };
  const places = decimalPlaces[currency] || 2;
  return Math.round(amount * Math.pow(10, places));
};

async function saveSubscriptionToDatabase(subscriptionData) {
  console.log('✅ Subscription saved:', subscriptionData);
  return { success: true, id: Date.now() };
}

/**
 * Send confirmation email to customer
 */
async function sendConfirmationEmail(paymentData) {
  try {
    // Format amount correctly
    let amount = 0;
    let currency = paymentData.currency || 'KES';
    
    if (paymentData.amount) {
      amount = paymentData.amount / 100;
    } else if (paymentData.purchase_units?.[0]?.amount?.value) {
      amount = parseFloat(paymentData.purchase_units[0].amount.value);
    }

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - WeBA Solutions</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .receipt-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
          .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .receipt-row:last-child { border-bottom: none; }
          .receipt-label { font-weight: 600; color: #4b5563; }
          .receipt-value { color: #1f2937; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
          .success-icon { font-size: 48px; text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmed! 🎉</h1>
            <p>Thank you for choosing WeBA Solutions</p>
          </div>
          <div class="content">
            <div class="success-icon">✅</div>
            <p>Dear ${paymentData.metadata?.customer_name || paymentData.customer_name},</p>
            <p>Thank you for subscribing to our broadband service! Your payment has been successfully processed and your subscription is now active.</p>
            
            <div class="receipt-box">
              <h3 style="margin-top: 0;">Payment Receipt</h3>
              <div class="receipt-row">
                <span class="receipt-label">Transaction ID:</span>
                <span class="receipt-value">${paymentData.reference || paymentData.transactionId || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Package:</span>
                <span class="receipt-value">${paymentData.metadata?.package_name || paymentData.packageName || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Amount Paid:</span>
                <span class="receipt-value">${currency} ${amount.toLocaleString()}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Payment Method:</span>
                <span class="receipt-value">${paymentData.channel || paymentData.paymentMethod || 'PayPal'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Payment Date:</span>
                <span class="receipt-value">${new Date(paymentData.paid_at || Date.now()).toLocaleString()}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Customer Name:</span>
                <span class="receipt-value">${paymentData.metadata?.customer_name || paymentData.customer_name || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Phone:</span>
                <span class="receipt-value">${paymentData.metadata?.phone || paymentData.phone || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Installation Address:</span>
                <span class="receipt-value">${paymentData.metadata?.location || paymentData.location || 'N/A'}</span>
              </div>
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Your internet service will be activated within 24 hours</li>
              <li>A technician will contact you within 48 hours to schedule installation</li>
              <li>You will receive your login credentials via SMS/Email</li>
            </ol>
            
            <p>If you have any questions, please contact our support team:</p>
            <p>📞 Phone: +254 730 862 862<br>
            📧 Email: support@webasolutions.com</p>
            
            <div style="text-align: center;">
              <a href="https://www.webainfinitysolutions.com" class="button">Visit Our Website</a>
            </div>
          </div>
          <div class="footer">
            <p>WeBA Solutions - Fast, Reliable Internet for Everyone</p>
            <p>This is an automated receipt. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} WeBA Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: paymentData.customer?.email || paymentData.email,
      subject: `✅ Payment Confirmation - ${paymentData.metadata?.package_name || paymentData.packageName} Subscription`,
      html: emailContent
    };
    
    await emailTransporter.sendMail(mailOptions);
    console.log('📧 Confirmation email sent to:', paymentData.customer?.email || paymentData.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

async function sendAdminNotification(paymentData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webasolutions.com';
    
    let amount = 0;
    let currency = paymentData.currency || 'KES';
    
    if (paymentData.amount) {
      amount = paymentData.amount / 100;
    } else if (paymentData.purchase_units?.[0]?.amount?.value) {
      amount = parseFloat(paymentData.purchase_units[0].amount.value);
    }
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #0ea5e9;">🔔 New Subscription Alert!</h2>
        <p>A new customer has subscribed to your broadband service.</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${paymentData.metadata?.customer_name || paymentData.customer_name || 'N/A'}</p>
          <p><strong>Email:</strong> ${paymentData.customer?.email || paymentData.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${paymentData.metadata?.phone || paymentData.phone || 'N/A'}</p>
          <p><strong>Location:</strong> ${paymentData.metadata?.location || paymentData.location || 'N/A'}</p>
          <p><strong>Package:</strong> ${paymentData.metadata?.package_name || paymentData.packageName || 'N/A'}</p>
          <p><strong>Amount:</strong> ${currency} ${amount.toLocaleString()}</p>
          <p><strong>Payment Gateway:</strong> ${paymentData.channel ? 'PayStack' : 'PayPal'}</p>
          <p><strong>Transaction ID:</strong> ${paymentData.reference || paymentData.id || 'N/A'}</p>
          <p><strong>Time:</strong> ${new Date(paymentData.paid_at || Date.now()).toLocaleString()}</p>
        </div>
        
        <p>Please ensure:</p>
        <ul>
          <li>✓ Activate their service within 24 hours</li>
          <li>✓ Schedule installation with a technician</li>
          <li>✓ Send login credentials</li>
        </ul>
        
        <p>Log in to your dashboard to manage this subscription.</p>
      </div>
    `;
    
    const mailOptions = {
      from: `"WeBA Solutions System" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🔔 New Subscription: ${paymentData.metadata?.package_name || paymentData.packageName} - ${paymentData.metadata?.customer_name || paymentData.customer_name}`,
      html: emailContent
    };
    
    await emailTransporter.sendMail(mailOptions);
    console.log('📧 Admin notification sent');
    return { success: true };
  } catch (error) {
    console.error('❌ Admin notification failed:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// PAYSTACK PAYMENT ROUTES
// ============================================

app.post('/api/initialize-paystack-payment', [
  body('email').isEmail().normalizeEmail(),
  body('amount').isFloat({ min: 1 }),
  body('packageName').notEmpty().trim(),
  body('customerName').notEmpty().trim(),
  body('phone').notEmpty().trim(),
  body('location').notEmpty().trim(),
  body('currency').optional().isString().isLength({ min: 3, max: 3 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }

  try {
    const { 
      email, 
      amount, 
      packageName, 
      customerName, 
      phone, 
      location,
      currency = 'USD'
    } = req.body;
    
    const reference = generateReference('PAYSTACK');
    
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
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
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
});

app.get('/api/verify-paystack-payment/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
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
});

// ============================================
// PAYPAL PAYMENT ROUTES
// ============================================

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await axios.post(
    `${PAYPAL_API_URL}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  
  return response.data.access_token;
}

app.post('/api/initialize-paypal-payment', [
  body('email').isEmail().normalizeEmail(),
  body('amount').isFloat({ min: 1 }),
  body('packageName').notEmpty().trim(),
  body('customerName').notEmpty().trim(),
  body('phone').notEmpty().trim(),
  body('location').notEmpty().trim(),
  body('currency').optional().isString().isLength({ min: 3, max: 3 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }

  try {
    const { 
      email, 
      amount, 
      packageName, 
      customerName, 
      phone, 
      location,
      currency = 'USD'
    } = req.body;
    
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
          email: PAYPAL_MERCHANT_EMAIL
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
});

app.post('/api/capture-paypal-payment', [
  body('orderId').notEmpty(),
  body('reference').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }
  
  try {
    const { orderId, reference } = req.body;
    
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
});

// ============================================
// WEBHOOK HANDLERS
// ============================================

app.post('/api/paystack-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
    
  if (hash !== req.headers['x-paystack-signature']) {
    console.log('❌ Invalid PayStack webhook signature');
    return res.status(401).json({ success: false, message: 'Invalid signature' });
  }
  
  const event = req.body;
  console.log('📢 PayStack webhook received:', event.event);
  
  try {
    switch (event.event) {
      case 'charge.success':
        console.log('💰 PayStack charge.success event received');
        const paymentData = event.data;
        
        await saveSubscriptionToDatabase({
          reference: paymentData.reference,
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
        break;
        
      case 'charge.failed':
        console.log('❌ PayStack charge.failed event:', event.data.reference);
        break;
        
      default:
        console.log('📢 Unhandled PayStack webhook event:', event.event);
    }
    
    return res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

app.post('/api/paypal-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  console.log('📢 PayPal webhook received');
  
  const event = req.body;
  
  try {
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('💰 PayPal payment completed:', event.resource.id);
        
        const captureDetails = event.resource;
        const reference = captureDetails.custom_id;
        
        const transaction = pendingTransactions.get(reference);
        if (transaction) {
          await saveSubscriptionToDatabase({
            reference,
            customerName: transaction.customerName,
            email: transaction.email,
            phone: transaction.phone,
            location: transaction.location,
            packageName: transaction.packageName,
            amount: parseFloat(captureDetails.amount.value),
            currency: captureDetails.amount.currency_code,
            paymentDate: new Date(captureDetails.create_time),
            transactionId: captureDetails.id,
            paymentMethod: captureDetails.payment_source?.card?.brand || 'paypal',
            paymentGateway: 'paypal',
            status: 'active'
          });
        }
        break;
        
      default:
        console.log('📢 Unhandled PayPal webhook event:', event.event_type);
    }
    
    return res.status(200).json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('❌ PayPal webhook error:', error);
    return res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
});

// ============================================
// UTILITY ENDPOINTS
// ============================================

app.get('/api/transaction-status/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    const transaction = pendingTransactions.get(reference);
    
    if (transaction) {
      return res.json({
        success: true,
        message: 'Transaction found',
        status: transaction.status,
        data: transaction
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('❌ Transaction status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get transaction status'
    });
  }
});

app.get('/api/health', (req, res) => {
  return res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      paystack: PAYSTACK_SECRET_KEY ? 'configured' : 'missing',
      paypal: PAYPAL_CLIENT_ID ? 'configured' : 'missing',
      email: process.env.EMAIL_USER ? 'configured' : 'missing',
      database: 'connected (in-memory)'
    },
    payment_methods: {
      visa_mastercard: 'PayStack & PayPal',
      paypal: 'PayPal',
      settlement_bank: 'Equity Bank Kenya'
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('\n=================================');
  console.log('🚀 Server Started Successfully');
  console.log('=================================');
  console.log(`📡 Port: ${PORT}`);
  console.log(`💳 Payment Gateways:`);
  console.log(`   - PayStack (Visa/Mastercard): ${PAYSTACK_SECRET_KEY ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   - PayPal (PayPal/Visa/Mastercard): ${PAYPAL_CLIENT_ID ? '✅ Configured' : '❌ Missing'}`);
  console.log(`🏦 Settlement Bank: Equity Bank Kenya`);
  console.log(`🌍 International Payments: Enabled`);
  console.log(`📧 Email Notifications: ${process.env.EMAIL_USER ? '✅ Enabled' : '❌ Disabled'}`);
  console.log('=================================\n');
});

module.exports = app;