/**
 * PAYPAL WEBHOOK HANDLER
 * Converted from your original Express route
 * POST /api/paypal-webhook
 */

const { pendingTransactions } = require('../utils/helpers');
const { saveSubscriptionToDatabase } = require('../utils/email');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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
};