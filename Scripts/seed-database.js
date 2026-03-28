const mongoose = require('mongoose');
require('dotenv').config();
const { Subscription, Transaction, User } = require('../models');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Subscription.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});

    // Create sample subscriptions
    const subscriptions = [
      {
        reference: 'TEST-001',
        customerName: 'John Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        location: 'Nairobi',
        packageName: 'Premium',
        amount: 50,
        currency: 'USD',
        paymentDate: new Date(),
        transactionId: 'TXN001',
        paymentMethod: 'card',
        paymentGateway: 'paystack',
        status: 'active'
      },
      {
        reference: 'TEST-002',
        customerName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+254723456789',
        location: 'Mombasa',
        packageName: 'Standard',
        amount: 30,
        currency: 'USD',
        paymentDate: new Date(),
        transactionId: 'TXN002',
        paymentMethod: 'paypal',
        paymentGateway: 'paypal',
        status: 'active'
      }
    ];

    await Subscription.insertMany(subscriptions);
    console.log('✅ Seed data inserted');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();