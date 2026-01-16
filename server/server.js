const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// Security headers - simplified for production
app.use(helmet());

// CORS - allow your frontend and Render URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://webasolutions-client.onrender.com', // Your future frontend
  'https://webasolutions.net', // Your domain
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json());

// Rate limiting - more generous for production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Increase for production
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ==================== ROUTES ====================

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: '🚀 WeBA Solutions API is LIVE on Render!',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '1.0.0',
    docs: 'https://github.com/bkipgaa/WeBA_Solutions'
  });
});

// Health check (important for Render monitoring)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'WeBA Solutions API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      test: '/api/test',
      health: '/api/health',
      docs: 'Coming soon...'
    },
    repository: 'https://github.com/bkipgaa/WeBA_Solutions'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    available_endpoints: ['/', '/api/test', '/api/health']
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS Error: Your origin is not allowed to access this API',
      allowed_origins: allowedOrigins
    });
  }
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`✅ WeBA Solutions Backend deployed on Render`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`📊 Rate limiting: 200 requests/15min`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`🔒 Production mode enabled`);
  }
});