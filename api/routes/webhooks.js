const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { pendingTransactions } = require('../../utils/helpers');
const { saveSubscriptionToDatabase, sendConfirmationEmail, sendAdminNotification } = require('../../utils/email');

// PayPal webhook handler
router.post('/paypal-webhook', async (req, res) => {
  console.log('📢 PayPal webhook received');
  
  const event = req.body;
  
  try {
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('💰 PayPal payment completed:', event.resource.id);
        
        const captureDetails = event.resource;
        const reference = captureDetails.custom_id;
        
        const transaction = pendingTransactions.get(reference);
        if (transaction && process.env.MONGODB_URI) {
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

router.post('/paystack-webhook', async (req, res) => {
  try {
    // ✅ Verify signature using RAW body
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(req.body)
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      console.log('❌ Invalid PayStack webhook signature');
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    // ✅ Convert raw buffer → JSON
    const event = JSON.parse(req.body.toString());

    console.log('📢 PayStack webhook received:', event.event);

    switch (event.event) {
      case 'charge.success':
        console.log('💰 PayStack charge.success event received');

        const paymentData = event.data;

       

        await sendConfirmationEmail(paymentData);
        await sendAdminNotification(paymentData);
        break;

      case 'charge.failed':
        console.log('❌ PayStack charge.failed:', event.data.reference);
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

module.exports = router;