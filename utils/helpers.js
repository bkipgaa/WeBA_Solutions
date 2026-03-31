/**
 * UTILITY HELPER FUNCTIONS
 * ============================================
 * This file contains reusable helper functions for:
 * - Generating unique transaction references
 * - Currency conversion (to/from smallest units)
 * - Data validation and formatting
 */

// In-memory storage for pending transactions
const pendingTransactions = new Map();

/**
 * Generate a unique transaction reference ID
 * @param {string} gateway - Payment gateway name (PAYSTACK, PAYPAL, etc.)
 * @returns {string} Unique reference ID
 * 
 * Example output: "PAYSTACK_1701234567890_ABC12345"
 */
const generateReference = (gateway = 'PAY') => {
  // Get current timestamp in milliseconds
  const timestamp = Date.now();
  
  // Generate random alphanumeric string (8 characters)
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Combine gateway, timestamp, and random string
  return `${gateway}_${timestamp}_${random}`;
};

/**
 * Convert amount to smallest currency unit (e.g., KES 100.50 → 10050 cents)
 * Different currencies have different decimal places
 * 
 * @param {number} amount - Amount in main currency unit
 * @param {string} currency - Currency code (KES, USD, EUR, etc.)
 * @returns {number} Amount in smallest currency unit
 */
const convertToSmallestUnit = (amount, currency = 'KES') => {
  // Define decimal places for different currencies
  const decimalPlaces = {
    'KES': 2,    // Kenyan Shilling - 2 decimal places
    'USD': 2,    // US Dollar - 2 decimal places
    'EUR': 2,    // Euro - 2 decimal places
    'GBP': 2,    // British Pound - 2 decimal places
    'JPY': 0     // Japanese Yen - 0 decimal places
  };
  
  // Get decimal places for currency, default to 2
  const places = decimalPlaces[currency] || 2;
  
  // Convert to smallest unit (e.g., 100.50 * 100 = 10050)
  return Math.round(amount * Math.pow(10, places));
};

/**
 * Convert from smallest currency unit back to main unit
 * @param {number} amount - Amount in smallest currency unit
 * @param {string} currency - Currency code
 * @returns {number} Amount in main currency unit
 */
const convertFromSmallestUnit = (amount, currency = 'KES') => {
  const decimalPlaces = {
    'KES': 2,
    'USD': 2,
    'EUR': 2,
    'GBP': 2,
    'JPY': 0
  };
  
  const places = decimalPlaces[currency] || 2;
  
  // Convert back to main unit (e.g., 10050 / 100 = 100.50)
  return amount / Math.pow(10, places);
};

/**
 * Format currency amount for display
 * @param {number} amount - Amount in main currency unit
 * @param {string} currency - Currency code
 * @returns {string} Formatted amount with currency symbol
 */
const formatCurrency = (amount, currency = 'KES') => {
  const symbols = {
    'KES': 'KSh',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥'
  };
  
  const symbol = symbols[currency] || currency;
  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return `${symbol} ${formatted}`;
};

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Kenyan format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidPhone = (phone) => {
  // Kenyan phone number formats: 0712345678, +254712345678, 254712345678
  const phoneRegex = /^(?:\+254|0|254)?[17]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Sanitize phone number to international format
 * @param {string} phone - Phone number to sanitize
 * @returns {string} Phone number in international format (+254...)
 */
const sanitizePhone = (phone) => {
  // Remove everything except numbers
  phone = phone.replace(/\D/g, '');

  // Remove Kenyan country code if present
  if (phone.startsWith('254')) {
    phone = phone.substring(3);
  }

  // Remove leading 0 if present
  if (phone.startsWith('0')) {
    phone = phone.substring(1);
  }

  return phone;
};
/**
 * Generate random order ID
 * @returns {string} Random order ID
 */
const generateOrderId = () => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Calculate package price based on speed and duration
 * @param {string} speed - Internet speed (e.g., '10Mbps', '20Mbps')
 * @param {number} months - Subscription duration in months
 * @returns {number} Total price
 */
const calculatePackagePrice = (speed, months = 1) => {
  const prices = {
    '10Mbps': 1500,
    '20Mbps': 2500,
    '50Mbps': 4000,
    '100Mbps': 7000
  };
  
  const monthlyPrice = prices[speed] || 1500;
  return monthlyPrice * months;
};

/**
 * Get package name from speed
 * @param {string} speed - Internet speed
 * @returns {string} Package name
 */
const getPackageName = (speed) => {
  const packages = {
    '10Mbps': 'Basic Broadband',
    '20Mbps': 'Standard Broadband',
    '50Mbps': 'Pro Broadband',
    '100Mbps': 'Ultra Broadband'
  };
  
  return packages[speed] || 'Custom Package';
};

/**
 * Clear expired pending transactions (older than 1 hour)
 * @returns {number} Number of transactions cleared
 */
const clearExpiredTransactions = () => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  let cleared = 0;
  
  for (const [reference, transaction] of pendingTransactions.entries()) {
    if (new Date(transaction.createdAt).getTime() < oneHourAgo) {
      pendingTransactions.delete(reference);
      cleared++;
    }
  }
  
  return cleared;
};

/**
 * Get transaction by reference
 * @param {string} reference - Transaction reference
 * @returns {object|null} Transaction object or null
 */
const getTransaction = (reference) => {
  return pendingTransactions.get(reference) || null;
};

/**
 * Update transaction status
 * @param {string} reference - Transaction reference
 * @param {string} status - New status (pending, completed, failed)
 * @param {object} paymentData - Payment response data
 * @returns {boolean} Success status
 */
const updateTransaction = (reference, status, paymentData = null) => {
  const transaction = pendingTransactions.get(reference);
  
  if (transaction) {
    transaction.status = status;
    if (paymentData) {
      transaction.paymentData = paymentData;
      transaction.completedAt = new Date();
    }
    transaction.updatedAt = new Date();
    pendingTransactions.set(reference, transaction);
    return true;
  }
  
  return false;
};

// Export all functions
module.exports = {
  // Storage
  pendingTransactions,
  
  // Generation functions
  generateReference,
  generateOrderId,
  
  // Currency functions
  convertToSmallestUnit,
  convertFromSmallestUnit,
  formatCurrency,
  
  // Validation functions
  isValidEmail,
  isValidPhone,
  sanitizePhone,
  
  // Package functions
  calculatePackagePrice,
  getPackageName,
  
  // Transaction management
  clearExpiredTransactions,
  getTransaction,
  updateTransaction
};