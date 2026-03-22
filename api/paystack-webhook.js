/**
 * PAYSTACK WEBHOOK HANDLER
 * Converted from your original Express route
 * POST /api/paystack-webhook
 */

const crypto = require('crypto');
const { saveSubscriptionToDatabase, sendConfirmationEmail, sendAdminNotification } = require('../utils/email');

module.exports = async function handler(req, res) {
  // Webhook endpoints must allow POST from Paystack
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Verify signature (same as your original)
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
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
};