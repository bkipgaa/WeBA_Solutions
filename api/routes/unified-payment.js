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
  sanitizePhone,
  generateActivationCode 
} = require('../../utils/helpers');
const { getPayPalAccessToken, PAYPAL_API_URL } = require('../../utils/paypal');
const { saveSubscriptionToDatabase, sendConfirmationEmail } = require('../../utils/email');

// Import models for database checks
let Subscription, Transaction;
try {
  const models = require('../../models/Index');
  Subscription = models.Subscription;
  Transaction = models.Transaction;
} catch (error) {
  console.log('ℹ️ Models not loaded yet, will use memory-only mode');
}

// ============================================
// HELPER: Check if transaction already processed
// ============================================
async function isTransactionProcessed(reference) {
  try {
    // Check in-memory first
    const memTransaction = pendingTransactions.get(reference);
    if (memTransaction && memTransaction.status === 'completed') {
      console.log(`ℹ️ Found completed transaction in memory: ${reference}`);
      return { processed: true, source: 'memory', data: memTransaction };
    }
    
    // Check database if available
    if (process.env.MONGODB_URI && Subscription) {
      const dbSubscription = await Subscription.findOne({ reference, status: 'active' });
      if (dbSubscription) {
        console.log(`ℹ️ Found active subscription in database: ${reference}`);
        return { processed: true, source: 'database', data: dbSubscription };
      }
    }
    
    return { processed: false };
  } catch (error) {
    console.error('Error checking transaction status:', error.message);
    return { processed: false };
  }
}

// ============================================
// HELPER: Save payment data with duplicate prevention
// ============================================
// Helper function to map payment method to allowed enum values
function mapPaymentMethod(paymentMethod) {
  const methodMap = {
    'card': 'card',
    'visa': 'visa',
    'mastercard': 'mastercard',
    'paypal': 'paypal',
    'bank_transfer': 'bank_transfer',
    'ussd': 'ussd',
    'mobile_money': 'mobile_money'
  };
  
  const lowerMethod = (paymentMethod || 'card').toLowerCase();
  return methodMap[lowerMethod] || 'card';
}

async function savePaymentDataSafely(reference, transaction, paymentData, gateway) {
  if (!process.env.MONGODB_URI) {
    console.log('ℹ️ MongoDB not configured, skipping database save');
    return null;
  }
  
  try {
    // Get the payment method from paymentData
    let paymentMethod = paymentData.channel || paymentData.paymentMethod || 'card';
    paymentMethod = mapPaymentMethod(paymentMethod);
    
    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({ reference });
    
    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        console.log(`ℹ️ Subscription already active for: ${reference}`);
        return existingSubscription;
      }
      
      // Update existing subscription
      existingSubscription.status = 'active';
      existingSubscription.paymentDate = new Date(paymentData.paid_at || new Date());
      existingSubscription.transactionId = paymentData.id;
      existingSubscription.paymentMethod = paymentMethod;
      existingSubscription.updatedAt = new Date();
      await existingSubscription.save();
      console.log(`✅ Subscription updated: ${reference}`);
      
      // Update transaction if exists
      const existingTransaction = await Transaction.findOne({ reference });
      if (existingTransaction) {
        existingTransaction.status = 'success';
        existingTransaction.completedAt = new Date();
        existingTransaction.gatewayReference = paymentData.id;
        existingTransaction.paymentMethod = paymentMethod;
        await existingTransaction.save();
        console.log(`✅ Transaction updated: ${reference}`);
      }
      return existingSubscription;
    }
    
    // Create new subscription with correct payment method
    const isSecurityPackage = ['Starter Shield', 'Home Shield', 'Smart Shield', 'Business Shield', 'Elite Shield']
      .includes(transaction.packageName);

    const subscription = new Subscription({
      reference,
      customerName: transaction.customerName,
      email: transaction.email,
      phone: transaction.phone,
      location: transaction.location,
      packageName: transaction.packageName,
      amount: transaction.amount,
      currency: transaction.currency,
      paymentDate: new Date(paymentData.paid_at || new Date()),
      transactionId: paymentData.id,
      paymentMethod: paymentMethod,
      paymentGateway: gateway,
      status: 'active',
      serviceType: isSecurityPackage ? 'security' : 'broadband',
      activationCode: isSecurityPackage ? generateActivationCode() : null
    });

    await subscription.save();
    console.log(`✅ Subscription saved: ${reference}`);
    
    // Create transaction (check if exists first)
    const existingTransaction = await Transaction.findOne({ reference });
    if (!existingTransaction) {
      const newTransaction = new Transaction({
        reference,
        subscriptionId: subscription._id,
        customer: {
          email: transaction.email,
          name: transaction.customerName,
          phone: transaction.phone
        },
        amount: transaction.amount,
        currency: transaction.currency,
        gateway: gateway,
        gatewayReference: paymentData.id,
        status: 'success',
        paymentMethod: paymentMethod,
        completedAt: new Date()
      });
      await newTransaction.save();
      console.log(`✅ Transaction saved: ${reference}`);
    }
    
    return subscription;
  } catch (error) {
    if (error.code === 11000) {
      console.log(`ℹ️ Duplicate key ignored for: ${reference}`);
      const existing = await Subscription.findOne({ reference });
      if (existing) {
        existing.status = 'active';
        await existing.save();
        return existing;
      }
    } else {
      console.error('❌ Database error:', error.message);
    }
    return null;
  }
}

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
    body('orderId').optional({ nullable: true, checkFalsy: true })
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
    
    // ✅ CRITICAL: Check if already processed at the very beginning
    const alreadyProcessed = await isTransactionProcessed(reference);
    if (alreadyProcessed.processed) {
      console.log(`ℹ️ Payment already processed for: ${reference} (from ${alreadyProcessed.source})`);
      return res.json({
        success: true,
        message: 'Payment already processed',
        data: alreadyProcessed.data
      });
    }

    try {
      let transaction = pendingTransactions.get(reference);
      
      // If not found in memory and it's PayStack, verify directly with PayStack API
      if (!transaction && gateway === 'paystack') {
        console.log('⚠️ Transaction not in memory, verifying directly with PayStack...');
        
        try {
          const paystackResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
              }
            }
          );
          
          const paymentData = paystackResponse.data.data;
          
          if (paymentData.status === 'success') {
            console.log('✅ PayStack payment verified successfully:', paymentData.reference);
            
            transaction = {
              email: paymentData.customer.email,
              amount: paymentData.amount / 100,
              packageName: paymentData.metadata?.package_name || 'Standard',
              customerName: paymentData.metadata?.customer_name || 'Customer',
              phone: paymentData.metadata?.phone || '',
              location: paymentData.metadata?.location || '',
              currency: paymentData.currency,
              createdAt: new Date(paymentData.created_at),
              status: 'completed',
              gateway: 'paystack',
              paymentData: paymentData,
              completedAt: new Date(paymentData.paid_at)
            };
            
            pendingTransactions.set(reference, transaction);
            
            // Save to database using safe method
            await savePaymentDataSafely(reference, transaction, paymentData, 'paystack');
            
            // Retrieve activation code (if any)
            let activationCode = null;
            if (process.env.MONGODB_URI && Subscription) {
              const sub = await Subscription.findOne({ reference });
              if (sub) activationCode = sub.activationCode;
            }
            
            // Send confirmation email (non-blocking)
            const emailData = {
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
              channel: paymentData.channel,
              paid_at: paymentData.paid_at,
              id: paymentData.id
            };
            
            sendConfirmationEmail(emailData).catch(err => 
              console.error('Email error (non-critical):', err.message)
            );
            
            return res.json({
              success: true,
              message: 'Payment verified successfully',
              data: {
                reference: reference,
                amount: transaction.amount,
                currency: transaction.currency,
                packageName: transaction.packageName,
                transactionId: paymentData.id,
                paymentMethod: paymentData.channel,
                gateway: 'paystack',
                status: 'completed',
                activationCode: activationCode
              }
            });
          } else {
            return res.status(404).json({
              success: false,
              message: 'Payment verification failed',
              status: paymentData.status
            });
          }
        } catch (paystackError) {
          console.error('PayStack verification error:', paystackError.response?.data || paystackError.message);
          return res.status(404).json({
            success: false,
            message: 'Transaction not found or verification failed'
          });
        }
      }
      
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

        await savePaymentDataSafely(reference, transaction, captureData, gateway);
        
        // Retrieve activation code (if any)
        let activationCode = null;
        if (process.env.MONGODB_URI && Subscription) {
          const sub = await Subscription.findOne({ reference });
          if (sub) activationCode = sub.activationCode;
        }
        
        // Email in background
        sendConfirmationEmail(emailPaymentData).catch(err => 
          console.error('Email error (non-critical):', err.message)
        );

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
            status: 'completed',
            activationCode: activationCode
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

// ============================================
// VERIFY ACTIVATION CODE (for mobile app)
// ============================================
router.post(
  '/verify-activation',
  [
    body('code').notEmpty().withMessage('Activation code is required')
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

    const { code } = req.body;

    try {
      if (!process.env.MONGODB_URI || !Subscription) {
        return res.status(503).json({
          success: false,
          message: 'Database not configured. Please contact support.'
        });
      }

      const subscription = await Subscription.findOne({
        activationCode: code,
        serviceType: 'security',
        status: 'active'
      });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'Invalid or expired activation code'
        });
      }

      // Check if subscription is still active (not expired)
      if (subscription.subscriptionEnd < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Subscription has expired. Please renew.'
        });
      }

      // Return subscription details for the mobile app
      return res.json({
        success: true,
        data: {
          package: subscription.packageName,
          expiresAt: subscription.subscriptionEnd,
          customer: subscription.customerName,
          email: subscription.email,
          phone: subscription.phone
        }
      });

    } catch (error) {
      console.error('❌ Activation verification error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to verify activation code'
      });
    }
  }
);

module.exports = router;