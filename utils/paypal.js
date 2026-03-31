const axios = require('axios');

// Determine PayPal API URL based on environment
// NOTE: PayPal uses different URLs for sandbox vs production
const PAYPAL_API_URL = process.env.PAYPAL_MODE === 'sandbox' 
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com';

/**
 * Get PayPal access token with better error handling
 */
async function getPayPalAccessToken() {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
  
  // Check if credentials exist
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    console.error('❌ PayPal credentials missing');
    throw new Error('PayPal credentials not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET');
  }
  
  console.log('🔑 Getting PayPal access token...');
  console.log(`🌐 PayPal API URL: ${PAYPAL_API_URL}`);
  console.log(`📧 PayPal Mode: ${process.env.PAYPAL_MODE || 'sandbox'}`);
  
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  try {
    const response = await axios.post(
      `${PAYPAL_API_URL}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000 // 10 second timeout
      }
    );
    
    console.log('✅ PayPal access token obtained successfully');
    return response.data.access_token;
  } catch (error) {
    console.error('❌ Failed to get PayPal token:', error.response?.data || error.message);
    throw new Error(`PayPal authentication failed: ${error.response?.data?.error_description || error.message}`);
  }
}

module.exports = {
  getPayPalAccessToken,
  PAYPAL_API_URL
};