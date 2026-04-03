/**
 * TRANSACTION ROUTES
 * ============================================
 * Handles transaction status checking and management
 */

const express = require('express');
const router = express.Router();
const { 
  pendingTransactions, 
  getTransaction, 
  updateTransaction,
  clearExpiredTransactions 
} = require('../../utils/helpers');

// GET /api/transaction-status/:reference
// Check status of a specific transaction
router.get('/transaction-status/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    if (!reference) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction reference is required' 
      });
    }
    
    // Clean up expired transactions first (optional)
    clearExpiredTransactions();
    
    const transaction = getTransaction(reference);
    
    if (transaction) {
      return res.json({
        success: true,
        message: 'Transaction found',
        data: {
          reference: reference,
          amount: transaction.amount,
          currency: transaction.currency || 'KES',
          packageName: transaction.packageName,
          customerName: transaction.customerName,
          email: transaction.email,
          phone: transaction.phone,
          location: transaction.location,
          status: transaction.status,
          gateway: transaction.gateway,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt || null,
          completedAt: transaction.completedAt || null,
          paymentData: transaction.paymentData || null
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
        reference: reference,
        suggestion: 'Please verify the reference number is correct or try again'
      });
    }
  } catch (error) {
    console.error('❌ Transaction status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get transaction status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/transactions/list
// List all pending transactions (for debugging/admin)
router.get('/transactions/list', async (req, res) => {
  try {
    // Optional: Add API key authentication here
    // const apiKey = req.headers['x-api-key'];
    // if (apiKey !== process.env.ADMIN_API_KEY) {
    //   return res.status(401).json({ success: false, message: 'Unauthorized' });
    // }
    
    // Clean up expired transactions
    const clearedCount = clearExpiredTransactions();
    
    const transactions = [];
    
    for (const [reference, data] of pendingTransactions.entries()) {
      transactions.push({
        reference,
        ...data,
        age: Date.now() - new Date(data.createdAt).getTime(),
        ageMinutes: Math.floor((Date.now() - new Date(data.createdAt).getTime()) / 60000)
      });
    }
    
    // Sort by creation date (newest first)
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return res.json({
      success: true,
      count: transactions.length,
      clearedExpired: clearedCount,
      data: transactions
    });
  } catch (error) {
    console.error('❌ List transactions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to list transactions'
    });
  }
});

// GET /api/transactions/stats
// Get transaction statistics
router.get('/transactions/stats', async (req, res) => {
  try {
    let total = 0;
    let pending = 0;
    let completed = 0;
    let failed = 0;
    let totalAmount = 0;
    
    for (const [, data] of pendingTransactions.entries()) {
      total++;
      
      switch (data.status) {
        case 'pending':
          pending++;
          break;
        case 'completed':
          completed++;
          totalAmount += data.amount;
          break;
        case 'failed':
          failed++;
          break;
      }
    }
    
    return res.json({
      success: true,
      stats: {
        total,
        pending,
        completed,
        failed,
        totalAmount: totalAmount,
        formattedTotalAmount: totalAmount > 0 ? `KSh ${totalAmount.toLocaleString()}` : 'KSh 0'
      }
    });
  } catch (error) {
    console.error('❌ Transaction stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get transaction stats'
    });
  }
});

// POST /api/transaction/update
// Update transaction status (webhook helper)
router.post('/transaction/update', async (req, res) => {
  try {
    const { reference, status, paymentData } = req.body;
    
    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is required'
      });
    }
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    // Validate status
    const validStatuses = ['pending', 'completed', 'failed', 'processing', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const updated = updateTransaction(reference, status, paymentData);
    
    if (updated) {
      const transaction = getTransaction(reference);
      return res.json({
        success: true,
        message: 'Transaction updated successfully',
        data: transaction
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('❌ Update transaction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update transaction'
    });
  }
});

// DELETE /api/transaction/:reference
// Remove a pending transaction (cleanup)
router.delete('/transaction/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    
    if (!reference) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction reference is required' 
      });
    }
    
    const transaction = getTransaction(reference);
    
    if (transaction) {
      pendingTransactions.delete(reference);
      return res.json({
        success: true,
        message: 'Transaction removed successfully',
        data: transaction
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
  } catch (error) {
    console.error('❌ Delete transaction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete transaction'
    });
  }
});

// POST /api/transaction/cleanup
// Manually clean up expired transactions
router.post('/transaction/cleanup', async (req, res) => {
  try {
    const clearedCount = clearExpiredTransactions();
    
    return res.json({
      success: true,
      message: `Cleaned up ${clearedCount} expired transactions`,
      clearedCount: clearedCount
    });
  } catch (error) {
    console.error('❌ Cleanup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to clean up transactions'
    });
  }
});

module.exports = router;