// server/server.js - UPDATED VERSION
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================
app.use(helmet({
  contentSecurityPolicy: false // Disable for now
}));

// CORS - only needed if you have separate domains
// app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ==================== API ROUTES ====================
app.get('/api/test', (req, res) => {
  res.json({
    message: '🚀 WeBA Solutions Full Stack App',
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// ==================== SERVE REACT APP ====================
// Serve static files from React build (IN PRODUCTION ONLY)
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing
  app.get('*', (req, res) => {
    // Don't intercept API calls
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // Serve React app for all other routes
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
  
  console.log('✅ Production mode: Serving React build');
} else {
  // In development, just provide API routes
  app.get('/', (req, res) => {
    res.json({
      message: 'WeBA Solutions API (Development Mode)',
      frontend: 'Run separately at http://localhost:3000',
      api: {
        test: '/api/test',
        health: '/api/health'
      }
    });
  });
  
  console.log('🔧 Development mode: API only');
}

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { details: err.message })
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 WeBA Solutions Server Started`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`🎯 API: http://localhost:${PORT}/api/test`);
});