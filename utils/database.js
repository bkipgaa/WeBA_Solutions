const mongoose = require('mongoose');

let isConnected = false;

async function connect() {
  if (isConnected) {
    console.log('✅ Using existing database connection');
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.log('⚠️ No MongoDB URI provided, using in-memory mode');
    return;
  }

  try {
    // Fix: Proper connection options for MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = conn.connections[0].readyState === 1;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

function getStatus() {
  return {
    connected: isConnected && mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState
  };
}

module.exports = { connect, getStatus };