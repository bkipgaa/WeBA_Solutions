const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // ✅ ADD THIS - was missing
const { body, param, validationResult } = require('express-validator');
const { 
  pendingTransactions, 
  getTransaction, 
  updateTransaction,
  clearExpiredTransactions,
  generateReference
} = require('../../utils/helpers');
const axios = require('axios'); // ✅ ADD THIS for HTTP calls
const { getPayPalAccessToken, PAYPAL_API_URL } = require('../../utils/paypal');

// Import your existing route handlers
const paypalRoutes = require('./paypal');
const paystackRoutes = require('./paystack');
const transactionRoutes = require('./transactions');
const webhookRoutes = require('./webhooks');

// ============================================
// HELPER FUNCTION: Get route handler from router
// ============================================
const getRouteHandler = (router, method, path) => {
  for (const layer of router.stack) {
    if (layer.route && layer.route.path === path && layer.route.methods[method]) {
      return layer.route.stack[0].handle;
    }
  }
  return null;
};

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

    const { gateway } = req.body;
    
    try {
      if (gateway === 'paypal') {
        // Find and call your existing PayPal initialization handler
        const handler = getRouteHandler(paypalRoutes, 'post', '/initialize-paypal-payment');
        if (handler) {
          await handler(req, res);
        } else {
          throw new Error('PayPal initialization handler not found');
        }
      } else if (gateway === 'paystack') {
        // Find and call your existing PayStack initialization handler
        const handler = getRouteHandler(paystackRoutes, 'post', '/initialize-paystack-payment');
        if (handler) {
          await handler(req, res);
        } else {
          throw new Error('PayStack initialization handler not found');
        }
      }
    } catch (error) {
      console.error('❌ Unified payment initialization error:', error);
      return res.status(500).json({
        success: false,
        message: 'Payment initialization failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
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

    const { gateway, reference, orderId } = req.body;

    try {
      if (gateway === 'paypal') {
        // Call your existing PayPal capture endpoint
        const handler = getRouteHandler(paypalRoutes, 'post', '/capture-paypal-payment');
        if (handler) {
          // Modify request to match what your endpoint expects
          req.body = { orderId, reference };
          await handler(req, res);
        } else {
          throw new Error('PayPal capture handler not found');
        }
      } else if (gateway === 'paystack') {
        // Call your existing PayStack verify endpoint
        const handler = getRouteHandler(paystackRoutes, 'get', '/verify-paystack-payment/:reference');
        if (handler) {
          // Modify request to match what your endpoint expects
          req.params = { reference };
          await handler(req, res);
        } else {
          throw new Error('PayStack verify handler not found');
        }
      }
    } catch (error) {
      console.error('❌ Unified verification error:', error);
      return res.status(500).json({
        success: false,
        message: 'Payment verification failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// ============================================
// WEBHOOK ENDPOINTS (Forward to existing webhook handlers)
// ============================================

// PayPal Webhook - Forward to existing handler
router.post('/paypal-webhook', async (req, res) => {
  try {
    const handler = getRouteHandler(webhookRoutes, 'post', '/paypal-webhook');
    if (handler) {
      await handler(req, res);
    } else {
      throw new Error('PayPal webhook handler not found');
    }
  } catch (error) {
    console.error('❌ PayPal webhook forwarding error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Webhook processing failed' 
    });
  }
});

// PayStack Webhook - Forward to existing handler
router.post('/paystack-webhook', async (req, res) => {
  try {
    const handler = getRouteHandler(webhookRoutes, 'post', '/paystack-webhook');
    if (handler) {
      await handler(req, res);
    } else {
      throw new Error('PayStack webhook handler not found');
    }
  } catch (error) {
    console.error('❌ PayStack webhook forwarding error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Webhook processing failed' 
    });
  }
});

// ============================================
// UNIFIED TRANSACTION STATUS
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
          updatedAt: transaction.updatedAt || null,
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
// GET ALL TRANSACTIONS (Admin)
// ============================================
router.get('/transactions/all', async (req, res) => {
  try {
    // Optional: Add API key authentication
    const apiKey = req.headers['x-api-key'];
    if (process.env.ADMIN_API_KEY && apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const clearedCount = clearExpiredTransactions();
    const transactions = [];
    
    for (const [reference, data] of pendingTransactions.entries()) {
      transactions.push({
        reference,
        ...data,
        age: Date.now() - new Date(data.createdAt).getTime(),
        ageMinutes: Math.floor((Date.now() - new Date(data.createdAt).getTime()) / 60000)
      });
    }
    
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return res.json({
      success: true,
      count: transactions.length,
      clearedExpired: clearedCount,
      data: transactions
    });
  } catch (error) {
    console.error('❌ Get all transactions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get transactions'
    });
  }
});

// ============================================
// TRANSACTION STATISTICS (Admin)
// ============================================
router.get('/transactions/stats', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (process.env.ADMIN_API_KEY && apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    let total = 0;
    let pending = 0;
    let completed = 0;
    let failed = 0;
    let totalAmount = 0;
    let byGateway = {
      paypal: { count: 0, amount: 0 },
      paystack: { count: 0, amount: 0 }
    };
    
    for (const [, data] of pendingTransactions.entries()) {
      total++;
      
      switch (data.status) {
        case 'pending':
          pending++;
          break;
        case 'completed':
          completed++;
          totalAmount += data.amount;
          if (data.gateway === 'paypal') {
            byGateway.paypal.count++;
            byGateway.paypal.amount += data.amount;
          } else if (data.gateway === 'paystack') {
            byGateway.paystack.count++;
            byGateway.paystack.amount += data.amount;
          }
          break;
        case 'failed':
          failed++;
          break;
      }
    }
    
    return res.json({
      success: true,
      stats: {
        total,
        pending,
        completed,
        failed,
        totalAmount,
        formattedTotalAmount: totalAmount > 0 ? `KSh ${totalAmount.toLocaleString()}` : 'KSh 0',
        byGateway
      }
    });
  } catch (error) {
    console.error('❌ Transaction stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get transaction stats'
    });
  }
});

// ============================================
// UPDATE TRANSACTION STATUS (Webhook helper)
// ============================================
router.post('/transaction/update', async (req, res) => {
  try {
    const { reference, status, paymentData } = req.body;
    
    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is required'
      });
    }
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const validStatuses = ['pending', 'completed', 'failed', 'processing', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const updated = updateTransaction(reference, status, paymentData);
    
    if (updated) {
      const transaction = getTransaction(reference);
      return res.json({
        success: true,
        message: 'Transaction updated successfully',
        data: transaction
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('❌ Update transaction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update transaction'
    });
  }
});

// ============================================
// DELETE TRANSACTION (Cleanup)
// ============================================
router.delete('/transaction/:reference', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (process.env.ADMIN_API_KEY && apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const { reference } = req.params;
    
    if (!reference) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction reference is required' 
      });
    }
    
    const transaction = getTransaction(reference);
    
    if (transaction) {
      pendingTransactions.delete(reference);
      return res.json({
        success: true,
        message: 'Transaction removed successfully',
        data: transaction
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('❌ Delete transaction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete transaction'
    });
  }
});

// ============================================
// CLEANUP EXPIRED TRANSACTIONS
// ============================================
router.post('/transactions/cleanup', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (process.env.ADMIN_API_KEY && apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const clearedCount = clearExpiredTransactions();
    
    return res.json({
      success: true,
      message: `Cleaned up ${clearedCount} expired transactions`,
      clearedCount: clearedCount
    });
  } catch (error) {
    console.error('❌ Cleanup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to clean up transactions'
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
        id: 'paypal',
        name: 'PayPal',
        displayName: 'PayPal',
        icon: 'fab fa-paypal',
        currencies: ['USD', 'EUR', 'GBP'],
        defaultCurrency: 'USD',
        description: 'Pay securely with PayPal or credit card',
        enabled: true,
        webhookEndpoint: '/api/paypal-webhook',
        endpoints: {
          initialize: '/api/payment/initialize',
          verify: '/api/payment/verify'
        }
      },
      {
        id: 'paystack',
        name: 'PayStack',
        displayName: 'PayStack',
        icon: 'fas fa-credit-card',
        currencies: ['KES', 'USD', 'GHS', 'NGN'],
        defaultCurrency: 'KES',
        description: 'Pay with M-Pesa, credit card, or bank transfer',
        enabled: true,
        webhookEndpoint: '/api/paystack-webhook',
        endpoints: {
          initialize: '/api/payment/initialize',
          verify: '/api/payment/verify'
        }
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
// WEBHOOK STATUS (For debugging)
// ============================================
router.get('/webhooks/status', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (process.env.ADMIN_API_KEY && apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    return res.json({
      success: true,
      data: {
        paypal: {
          endpoint: '/api/paypal-webhook',
          events: ['PAYMENT.CAPTURE.COMPLETED'],
          status: 'active',
          description: 'Handles PayPal payment confirmations'
        },
        paystack: {
          endpoint: '/api/paystack-webhook',
          events: ['charge.success', 'charge.failed'],
          status: 'active',
          description: 'Handles PayStack payment confirmations'
        }
      }
    });
  } catch (error) {
    console.error('❌ Webhook status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get webhook status'
    });
  }
});

// ============================================
// WEBHOOK TEST ENDPOINT (For testing)
// ============================================
router.post('/webhooks/test/:gateway', async (req, res) => {
  try {
    const { gateway } = req.params;
    const testData = req.body;
    
    console.log(`🧪 Test webhook for ${gateway}:`, testData);
    
    if (gateway === 'paypal') {
      // Create a test PayPal webhook event
      const testEvent = {
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          id: 'TEST_' + Date.now(),
          custom_id: testData.reference || 'TEST_REFERENCE',
          amount: {
            value: testData.amount || '10.00',
            currency_code: testData.currency || 'USD'
          },
          create_time: new Date().toISOString(),
          payment_source: {
            card: { brand: 'visa' }
          }
        }
      };
      
      req.body = testEvent;
      const handler = getRouteHandler(webhookRoutes, 'post', '/paypal-webhook');
      if (handler) {
        await handler(req, res);
      } else {
        throw new Error('PayPal webhook handler not found');
      }
    } else if (gateway === 'paystack') {
      // Create a test PayStack webhook event
      const testEvent = {
        event: 'charge.success',
        data: {
          reference: testData.reference || 'TEST_REFERENCE',
          amount: (testData.amount || 2500) * 100,
          currency: testData.currency || 'KES',
          customer: {
            email: testData.email || 'test@example.com'
          },
          metadata: {
            customer_name: testData.customerName || 'Test Customer',
            package_name: testData.packageName || 'Standard',
            phone: testData.phone || '0712345678',
            location: testData.location || 'Nairobi'
          },
          paid_at: new Date().toISOString(),
          id: 'TEST_' + Date.now(),
          channel: 'card'
        }
      };
      
      // Create a raw body for signature verification
      const rawBody = JSON.stringify(testEvent);
      req.body = Buffer.from(rawBody);
      req.headers = {
        'x-paystack-signature': crypto
          .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
          .update(rawBody)
          .digest('hex')
      };
      
      const handler = getRouteHandler(webhookRoutes, 'post', '/paystack-webhook');
      if (handler) {
        await handler(req, res);
      } else {
        throw new Error('PayStack webhook handler not found');
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid gateway. Use paypal or paystack'
      });
    }
  } catch (error) {
    console.error('❌ Test webhook error:', error);
    return res.status(500).json({
      success: false,
      message: 'Test webhook failed',
      error: error.message
    });
  }
});

module.exports = router;