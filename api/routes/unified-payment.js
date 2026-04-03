const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const crypto = require('crypto');
const { 
  pendingTransactions, 
  getTransaction, 
  updateTransaction,
  clearExpiredTransactions,
  generateReference,
  sanitizePhone
} = require('../../utils/helpers');
const { getPayPalAccessToken, PAYPAL_API_URL } = require('../../utils/paypal');
const { saveSubscriptionToDatabase, sendConfirmationEmail } = require('../../utils/email');

// ============================================
// UNIFIED PAYMENT INITIALIZATION
// ============================================
router.post(
  '/payment/initialize',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
    body('packageName').notEmpty().withMessage('Package name is required'),
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('gateway').isIn(['paypal', 'paystack']).withMessage('Gateway must be paypal or paystack'),
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
      gateway,
      currency = gateway === 'paystack' ? 'KES' : 'USD'
    } = req.body;

    // ✅ FIX: Ensure amount is a number and properly formatted
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount format'
      });
    }

    try {
      if (gateway === 'paypal') {
        // ========== PAYPAL INITIALIZATION ==========
        const reference = generateReference('PAYPAL');
        
        pendingTransactions.set(reference, {
          email,
          amount: numericAmount,
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

        // ✅ FIX: Format amount properly for PayPal
        const formattedAmount = numericAmount.toFixed(2);
        
        console.log(`💰 PayPal payment: ${currency} ${formattedAmount}`);

        const orderData = {
          intent: 'CAPTURE',
          purchase_units: [{
            reference_id: reference,
            description: `${packageName} - WiFi Subscription`,
            custom_id: reference,
            amount: {
              currency_code: currency,
              value: formattedAmount,
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: formattedAmount
                }
              }
            },
            items: [{
              name: `${packageName} Broadband Package`,
              description: `Monthly ${packageName} internet subscription`,
              quantity: '1',
              unit_amount: {
                currency_code: currency,
                value: formattedAmount
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
            return_url: `${process.env.FRONTEND_URL}/payment-callback?gateway=paypal&reference=${reference}`,
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
                national_number: sanitizePhone(phone)
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

        const approvalLink = response.data.links?.find(link => link.rel === 'approve');

        if (!approvalLink) {
          throw new Error('Failed to get PayPal approval link');
        }

        return res.json({
          success: true,
          gateway: 'paypal',
          data: {
            approval_url: approvalLink.href,
            order_id: response.data.id,
            reference: reference,
            requiresRedirect: true
          }
        });

      } else if (gateway === 'paystack') {
        // ========== PAYSTACK INITIALIZATION ==========
        const reference = generateReference('PAYSTACK');
        
        pendingTransactions.set(reference, {
          email,
          amount: numericAmount,
          packageName,
          customerName,
          phone,
          location,
          currency,
          createdAt: new Date(),
          status: 'pending',
          gateway: 'paystack'
        });

        // ✅ PayStack amount must be in cents/kobo
        const paystackAmount = Math.round(numericAmount * 100);
        
        console.log(`💰 PayStack payment: ${currency} ${numericAmount} (${paystackAmount} cents)`);

        const response = await axios.post(
          'https://api.paystack.co/transaction/initialize',
          {
            email,
            amount: paystackAmount,
            reference,
            currency: currency === 'KES' ? 'KES' : 'USD',
            metadata: {
              customer_name: customerName,
              package_name: packageName,
              phone,
              location,
              custom_fields: [
                { display_name: "Package", variable_name: "package", value: packageName },
                { display_name: "Location", variable_name: "location", value: location }
              ]
            },
            callback_url: `${process.env.FRONTEND_URL}/payment-callback?gateway=paystack&reference=${reference}`
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.data.status) {
          throw new Error(response.data.message);
        }

        return res.json({
          success: true,
          gateway: 'paystack',
          data: {
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference,
            requiresRedirect: true
          }
        });
      }

    } catch (error) {
      console.error(`❌ ${gateway} initialization error:`, error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: `Failed to initialize ${gateway} payment`,
        error: process.env.NODE_ENV === 'development' ? error.message : 'Payment initialization failed'
      });
    }
  }
);

// ============================================
// UNIFIED PAYMENT VERIFICATION/CAPTURE
// ============================================
router.post(
  '/payment/verify',
  [
    body('reference').notEmpty().withMessage('Transaction reference is required'),
    body('gateway').isIn(['paypal', 'paystack']).withMessage('Gateway must be paypal or paystack'),
    body('orderId').optional().isString()
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

    const { reference, gateway, orderId } = req.body;

    try {
      const transaction = pendingTransactions.get(reference);
      
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: 'Transaction not found'
        });
      }

      if (transaction.status === 'completed') {
        return res.json({
          success: true,
          message: 'Payment already processed',
          data: transaction
        });
      }

      let paymentData;
      let captureData = null;

      if (gateway === 'paystack') {
        // Verify PayStack payment
        const response = await axios.get(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
          }
        );
        
        paymentData = response.data.data;
        
        if (paymentData.status === 'success') {
          captureData = {
            id: paymentData.id,
            amount: paymentData.amount / 100,
            currency: paymentData.currency,
            paymentMethod: paymentData.channel,
            status: 'COMPLETED'
          };
        } else {
          return res.json({
            success: false,
            message: 'Payment verification failed',
            status: paymentData.status
          });
        }

      } else if (gateway === 'paypal') {
        // Capture PayPal payment
        if (!orderId) {
          return res.status(400).json({
            success: false,
            message: 'Order ID is required for PayPal verification'
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

        paymentData = response.data;
        
        if (paymentData.status === 'COMPLETED') {
          const capture = paymentData.purchase_units?.[0]?.payments?.captures?.[0];
          const paymentSource = capture?.payment_source;
          
          captureData = {
            id: capture?.id,
            amount: parseFloat(capture?.amount?.value),
            currency: capture?.amount?.currency_code,
            paymentMethod: paymentSource?.card?.brand || paymentSource?.paypal?.email_address || 'paypal',
            status: 'COMPLETED'
          };
        } else {
          return res.json({
            success: false,
            message: 'Payment capture failed',
            status: paymentData.status
          });
        }
      }

      // Process successful payment
      if (captureData && captureData.status === 'COMPLETED') {
        transaction.status = 'completed';
        transaction.paymentData = paymentData;
        transaction.completedAt = new Date();
        pendingTransactions.set(reference, transaction);

        const emailPaymentData = {
          customer: { email: transaction.email },
          metadata: {
            customer_name: transaction.customerName,
            package_name: transaction.packageName,
            phone: transaction.phone,
            location: transaction.location
          },
          amount: captureData.amount,
          currency: captureData.currency,
          reference: reference,
          channel: captureData.paymentMethod,
          paid_at: new Date().toISOString(),
          id: captureData.id
        };

        if (process.env.MONGODB_URI) {
          await saveSubscriptionToDatabase({
            reference,
            customerName: transaction.customerName,
            email: transaction.email,
            phone: transaction.phone,
            location: transaction.location,
            packageName: transaction.packageName,
            amount: captureData.amount,
            currency: captureData.currency,
            paymentDate: new Date(),
            transactionId: captureData.id,
            paymentMethod: captureData.paymentMethod,
            paymentGateway: gateway,
            status: 'active'
          });
        }

        await sendConfirmationEmail(emailPaymentData);

        return res.json({
          success: true,
          message: 'Payment verified successfully',
          data: {
            reference: reference,
            amount: captureData.amount,
            currency: captureData.currency,
            packageName: transaction.packageName,
            transactionId: captureData.id,
            paymentMethod: captureData.paymentMethod,
            gateway: gateway,
            status: 'completed'
          }
        });
      }

    } catch (error) {
      console.error(`❌ ${gateway} verification error:`, error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: `Failed to verify ${gateway} payment`,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// ============================================
// GET PAYMENT STATUS
// ============================================
router.get('/payment/status/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is required'
      });
    }
    
    clearExpiredTransactions();
    const transaction = getTransaction(reference);
    
    if (transaction) {
      return res.json({
        success: true,
        data: {
          reference: reference,
          amount: transaction.amount,
          currency: transaction.currency,
          packageName: transaction.packageName,
          customerName: transaction.customerName,
          email: transaction.email,
          phone: transaction.phone,
          location: transaction.location,
          status: transaction.status,
          gateway: transaction.gateway,
          createdAt: transaction.createdAt,
          completedAt: transaction.completedAt || null
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
        reference: reference
      });
    }
  } catch (error) {
    console.error('❌ Payment status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get payment status'
    });
  }
});

// ============================================
// GET AVAILABLE PAYMENT METHODS
// ============================================
router.get('/payment/methods', async (req, res) => {
  try {
    const methods = [
      {
        id: 'paystack',
        name: 'PayStack',
        displayName: 'Pay with Card',
        icon: 'fas fa-credit-card',
        currencies: ['KES'],
        defaultCurrency: 'KES',
        description: 'Pay with M-Pesa, credit card, or bank transfer',
        enabled: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        displayName: 'PayPal',
        icon: 'fab fa-paypal',
        currencies: ['USD'],
        defaultCurrency: 'USD',
        description: 'Pay securely with PayPal or credit card',
        enabled: true
      }
    ];
    
    return res.json({
      success: true,
      data: methods
    });
  } catch (error) {
    console.error('❌ Payment methods error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get payment methods'
    });
  }
});

module.exports = router;