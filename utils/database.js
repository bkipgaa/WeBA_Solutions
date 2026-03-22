/**
 * DATABASE CONFIGURATION
 * ============================================
 * MongoDB connection setup and management
 * Using MongoDB Atlas for production
 */

import { MongoClient } from 'mongodb';

// MongoDB connection state
let client = null;
let db = null;
let isConnected = false;

/**
 * Connect to MongoDB database
 * @returns {Promise<Object>} Database and client objects
 */
export async function connectToDatabase() {
  // Return existing connection if already connected
  if (isConnected && client && db) {
    console.log('📦 Using existing database connection');
    return { client, db };
  }
  
  try {
    // Validate MongoDB URI
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('🔌 Connecting to MongoDB...');
    
    // Create MongoDB client with options
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,           // Maximum number of connections
      minPoolSize: 2,            // Minimum number of connections
      connectTimeoutMS: 10000,   // Connection timeout (10 seconds)
      socketTimeoutMS: 45000,    // Socket timeout (45 seconds)
      serverSelectionTimeoutMS: 5000  // Server selection timeout
    });
    
    // Connect to database
    await client.connect();
    
    // Get database name from URI or use default
    const dbName = process.env.MONGODB_DB_NAME || 'webainfinity';
    db = client.db(dbName);
    
    // Test connection
    await db.command({ ping: 1 });
    
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: ${dbName}`);
    console.log(`   Host: ${client.options.servers[0].host}`);
    
    return { client, db };
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    isConnected = false;
    client = null;
    db = null;
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

/**
 * Close database connection
 * @returns {Promise<void>}
 */
export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    isConnected = false;
    client = null;
    db = null;
    console.log('🔌 MongoDB connection closed');
  }
}

/**
 * Get database instance (must be called after connectToDatabase)
 * @returns {Object} Database instance
 */
export function getDatabase() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

/**
 * Check if database is connected
 * @returns {boolean} True if connected
 */
export function isDatabaseConnected() {
  return isConnected && client !== null;
}

/**
 * Create indexes for collections
 * @returns {Promise<void>}
 */
export async function createIndexes() {
  try {
    const { db } = await connectToDatabase();
    
    // Subscriptions collection indexes
    const subscriptions = db.collection('subscriptions');
    
    await subscriptions.createIndex({ reference: 1 }, { unique: true });
    await subscriptions.createIndex({ email: 1 });
    await subscriptions.createIndex({ status: 1 });
    await subscriptions.createIndex({ createdAt: -1 });
    await subscriptions.createIndex({ paymentGateway: 1 });
    
    console.log('✅ Database indexes created');
    
  } catch (error) {
    console.error('❌ Failed to create indexes:', error);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('⚠️  Received SIGINT signal');
  await closeDatabaseConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('⚠️  Received SIGTERM signal');
  await closeDatabaseConnection();
  process.exit(0);
});