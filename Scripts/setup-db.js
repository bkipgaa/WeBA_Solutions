const mongoose = require('mongoose');
require('dotenv').config();

async function setupDatabase() {
  // Your MongoDB connection string
  const MONGODB_URI = 'mongodb+srv://bkipgaa_db_user:32431472Tum@cluster0.bp7o8gj.mongodb.net/weba-payment?retryWrites=true&w=majority&appName=Cluster0';
  
  console.log('🔧 Connecting to MongoDB...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    
    // Create collections (only subscriptions and transactions)
    const collections = ['subscriptions', 'transactions'];
    
    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName);
        console.log(`✅ Created collection: ${collectionName}`);
      } catch (err) {
        if (err.code === 48) {
          console.log(`ℹ️ Collection already exists: ${collectionName}`);
        } else {
          console.error(`❌ Error creating ${collectionName}:`, err.message);
        }
      }
    }
    
    // Create indexes for subscriptions
    const subscriptions = db.collection('subscriptions');
    await subscriptions.createIndex({ reference: 1 }, { unique: true });
    await subscriptions.createIndex({ email: 1 });
    await subscriptions.createIndex({ status: 1 });
    await subscriptions.createIndex({ createdAt: -1 });
    console.log('✅ Created indexes for subscriptions');
    
    // Create indexes for transactions
    const transactions = db.collection('transactions');
    await transactions.createIndex({ reference: 1 }, { unique: true });
    await transactions.createIndex({ createdAt: -1 });
    await transactions.createIndex({ gateway: 1, status: 1 });
    console.log('✅ Created indexes for transactions');
    
    console.log('\n🎉 Database setup complete!');
    console.log('Database Name: webasolutions');
    console.log('Collections: subscriptions, transactions');
    console.log('\n📊 Indexes created:');
    console.log('  Subscriptions:');
    console.log('    - reference (unique)');
    console.log('    - email');
    console.log('    - status');
    console.log('    - createdAt');
    console.log('  Transactions:');
    console.log('    - reference (unique)');
    console.log('    - createdAt');
    console.log('    - gateway & status');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

setupDatabase();