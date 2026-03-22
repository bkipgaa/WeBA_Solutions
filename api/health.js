/**
 * HEALTH CHECK
 * Converted from your original Express route
 * GET /api/health
 */

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      paystack: process.env.PAYSTACK_SECRET_KEY ? 'configured' : 'missing',
      paypal: process.env.PAYPAL_CLIENT_ID ? 'configured' : 'missing',
      email: process.env.EMAIL_USER ? 'configured' : 'missing',
      database: 'connected (in-memory)'
    },
    payment_methods: {
      visa_mastercard: 'PayStack & PayPal',
      paypal: 'PayPal',
      settlement_bank: 'Equity Bank Kenya'
    }
  });
};