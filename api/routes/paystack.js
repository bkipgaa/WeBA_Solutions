const express = require('express');
const router = express.Router();
const axios = require('axios');
const { body, param, validationResult } = require('express-validator'); // ← Added 'body' here
const { pendingTransactions, generateReference } = require('../../utils/helpers'); // ← Added generateReference
const { saveSubscriptionToDatabase, sendConfirmationEmail, sendAdminNotification } = require('../../utils/email');


// Initialize PayStack payment
router.post(
  '/initialize-paystack-payment',
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

    const { email, amount, packageName, customerName, phone, location, currency = 'KES' } = req.body;

    try {
      const reference = generateReference('PAYSTACK');
      
      // Store transaction
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

      // Initialize PayStack payment
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100, // PayStack uses kobo/cents
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
          callback_url: `${process.env.FRONTEND_URL}/payment-callback?gateway=paystack`
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status) {
        return res.json({
          success: true,
          message: 'Payment initialized successfully',
          data: {
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference
          }
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('❌ PayStack initialization error:', error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to initialize payment',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Payment initialization failed'
      });
    }
  }
);

// Verify PayStack payment
router.get(
  '/verify-paystack-payment/:reference',
  [
    param('reference').notEmpty().withMessage('Reference is required')
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

    try {
      const { reference } = req.params;
      
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
  }
);


module.exports = router;