const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 WeBA Solutions Server Starting...');

// Simple test API
app.get('/api/test', (req, res) => {
  res.json({
    message: 'WeBA Solutions API is working!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
  console.log(`🌐 Test API: http://localhost:${PORT}/api/test`);
});