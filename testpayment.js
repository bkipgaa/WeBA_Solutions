// test-payment.js - Run with: node test-payment.js
const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // or your Vercel URL

async function testHealth() {
  try {
    const response = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health check:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testPayStackInit() {
  try {
    const response = await axios.post(`${BASE_URL}/api/initialize-paystack-payment`, {
      email: 'test@example.com',
      amount: 1500,
      packageName: 'WiFi Swift',
      customerName: 'Test User',
      phone: '0712345678',
      location: 'Test Location',
      currency: 'KES'
    });
    console.log('✅ PayStack Init:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ PayStack Init failed:', error.response?.data || error.message);
    return null;
  }
}

async function testPayPalInit() {
  try {
    const response = await axios.post(`${BASE_URL}/api/initialize-paypal-payment`, {
      email: 'test@example.com',
      amount: 12,
      packageName: 'WiFi Swift',
      customerName: 'Test User',
      phone: '0712345678',
      location: 'Test Location',
      currency: 'USD'
    });
    console.log('✅ PayPal Init:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ PayPal Init failed:', error.response?.data || error.message);
    return null;
  }
}

async function runTests() {
  console.log('🧪 Starting Payment Gateway Tests...\n');
  
  const healthOk = await testHealth();
  if (!healthOk) {
    console.log('\n⚠️ Server not responding. Make sure it\'s running.');
    return;
  }
  
  console.log('\n📝 Testing PayStack initialization...');
  await testPayStackInit();
  
  console.log('\n📝 Testing PayPal initialization...');
  await testPayPalInit();
  
  console.log('\n✅ Tests completed');
}

runTests();