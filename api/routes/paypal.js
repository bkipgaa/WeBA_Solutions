const express = require('express');
const router = express.Router();
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const { generateReference, pendingTransactions, sanitizePhone } = require('../../utils/helpers');
const { getPayPalAccessToken, PAYPAL_API_URL } = require('../../utils/paypal');
const { saveSubscriptionToDatabase, sendConfirmationEmail } = require('../../utils/email');

// Initialize PayPal payment
router.post(
  '/initialize-paypal-payment',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
    body('packageName').notEmpty().withMessage('Package name is required'),
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('currency').optional().isString().isLength({ min: 3, max: 3 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { 
      email, 
      amount, 
      packageName, 
      customerName, 
      phone, 
      location, 
      currency = 'USD' 
    } = req.body;

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
          purchase_units: [{
  reference_id: reference,
  description: `${packageName} - WiFi Subscription`,
  custom_id: reference,
  amount: {
    currency_code: currency,
    value: amount.toFixed(2),
    breakdown: {
      item_total: {
        currency_code: currency,
        value: amount.toFixed(2)
      }
    }
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
              national_number: sanitizePhone(phone) // ✅ FIXED format
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

      // ✅ SAFE CHECK
      const approvalLink = response.data.links?.find(link => link.rel === 'approve');

      if (!approvalLink) {
        console.error('❌ No approval link:', response.data);
        return res.status(500).json({
          success: false,
          message: 'Failed to get PayPal approval link'
        });
      }

      return res.json({
        success: true,
        message: 'PayPal payment initialized successfully',
        data: {
          approval_url: approvalLink.href,
          order_id: response.data.id,
          reference: reference
        }
      });

    } catch (error) {
      console.error('❌ PayPal initialization error:', error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to initialize PayPal payment',
        error: process.env.NODE_ENV === 'development' ? error.response?.data?.message : 'Payment initialization failed'
      });
    }
  }
);

// Capture PayPal payment
router.post(
  '/capture-paypal-payment',
  [
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('reference').notEmpty().withMessage('Reference is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { orderId, reference } = req.body;
    
    try {
        const transaction = pendingTransactions.get(reference);

        if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  // 🚨 PREVENT DOUBLE CAPTURE
  if (transaction.status === 'completed') {
    return res.json({
      success: true,
      message: 'Payment already processed',
      data: transaction
    });
  }
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

        // ✅ SAFE EXTRACTION (NO CRASH)
        const capture =
          captureData.purchase_units?.[0]?.payments?.captures?.[0];

        const paymentSource = capture?.payment_source;

        const paymentMethod =
          paymentSource?.card?.brand ||
          paymentSource?.paypal?.email_address ||
          'paypal';

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
            transactionId: capture?.id
          };

          if (process.env.MONGODB_URI) {
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
              transactionId: capture?.id,
              paymentMethod: paymentMethod, // ✅ FIXED
              paymentGateway: 'paypal',
              status: 'active'
            });
          }

          await sendConfirmationEmail(emailPaymentData);

          return res.json({
            success: true,
            message: 'Payment captured successfully',
            data: {
              reference: reference,
              amount: transaction.amount,
              currency: transaction.currency,
              packageName: transaction.packageName,
              transactionId: capture?.id,
              paymentMethod: paymentMethod, // ✅ FIXED
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
  }
);

module.exports = router;