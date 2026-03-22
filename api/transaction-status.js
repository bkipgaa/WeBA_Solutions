/**
 * TRANSACTION STATUS
 * Converted from your original Express route
 * GET /api/transaction-status/:reference
 */

const { pendingTransactions } = require('../utils/helpers');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const reference = req.query.reference || req.url.split('/').pop();
    
    if (!reference) {
      return res.status(400).json({ success: false, message: 'Reference is required' });
    }
    
    const transaction = pendingTransactions.get(reference);
    
    if (transaction) {
      return res.json({
        success: true,
        message: 'Transaction found',
        status: transaction.status,
        data: transaction
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('❌ Transaction status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get transaction status'
    });
  }
};