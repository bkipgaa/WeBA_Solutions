const express = require('express');
const router = express.Router();

// GET /api/health - Basic health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      paystack: process.env.PAYSTACK_SECRET_KEY ? 'configured' : 'missing',
      paypal: process.env.PAYPAL_CLIENT_ID ? 'configured' : 'missing',
      email: process.env.EMAIL_USER ? 'configured' : 'missing',
      database: process.env.MONGODB_URI ? 'connected' : 'in-memory'
    },
    payment_methods: {
      visa_mastercard: 'PayStack & PayPal',
      paypal: 'PayPal',
      settlement_bank: 'Equity Bank Kenya'
    }
  });
});

// GET /api/health/details - Detailed health check
router.get('/health/details', async (req, res) => {
  const checks = {
    database: false,
    paypal: false,
    paystack: false,
    email: false,
    timestamp: new Date().toISOString()
  };

  // Check database connection if MongoDB is configured
  if (process.env.MONGODB_URI) {
    try {
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState === 1) {
        checks.database = true;
      } else {
        checks.database = 'disconnected';
      }
    } catch (error) {
      checks.database = 'error';
    }
  } else {
    checks.database = 'in-memory-mode';
  }

  // Check PayPal configuration
  checks.paypal = !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET_KEY);
  
  // Check PayStack configuration
  checks.paystack = !!process.env.PAYSTACK_SECRET_KEY;
  
  // Check email configuration
  checks.email = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

  const isHealthy = Object.values(checks).every(value => value === true || value === 'in-memory-mode');

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks,
    message: isHealthy ? 'All systems operational' : 'Some services are degraded'
  });
});

module.exports = router;