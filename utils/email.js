const nodemailer = require('nodemailer');
const { Subscription, Transaction } = require('../models/Index');

// ✅ CREATE REUSABLE TRANSPORTER
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function saveSubscriptionToDatabase(data) {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('ℹ️ MongoDB not configured, using in-memory storage');
      return null;
    }

    // ✅ FIRST: Check if subscription already exists
    let subscription = await Subscription.findOne({ reference: data.reference });
    
    if (subscription) {
      // Update existing subscription
      subscription.status = data.status;
      subscription.paymentDate = data.paymentDate;
      subscription.transactionId = data.transactionId;
      subscription.paymentMethod = data.paymentMethod;
      subscription.updatedAt = new Date();
      await subscription.save();
      console.log(`✅ Subscription updated: ${data.reference}`);
      
      // Update transaction if exists
      let transaction = await Transaction.findOne({ reference: data.reference });
      if (transaction) {
        transaction.status = data.status === 'active' ? 'success' : 'pending';
        transaction.completedAt = data.status === 'active' ? new Date() : null;
        transaction.gatewayReference = data.transactionId;
        await transaction.save();
        console.log(`✅ Transaction updated: ${data.reference}`);
      }
      return subscription;
    }

    // ✅ ONLY create new if doesn't exist
    subscription = new Subscription({
      reference: data.reference,
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      packageName: data.packageName,
      amount: data.amount,
      currency: data.currency,
      paymentDate: data.paymentDate,
      transactionId: data.transactionId,
      paymentMethod: data.paymentMethod,
      paymentGateway: data.paymentGateway,
      status: data.status
    });
    await subscription.save();
    console.log(`✅ Subscription saved: ${data.reference}`);

    // ✅ Check if transaction already exists before creating
    let existingTransaction = await Transaction.findOne({ reference: data.reference });
    if (!existingTransaction) {
      const transaction = new Transaction({
        reference: data.reference,
        subscriptionId: subscription._id,
        customer: {
          email: data.email,
          name: data.customerName,
          phone: data.phone
        },
        amount: data.amount,
        currency: data.currency,
        gateway: data.paymentGateway,
        gatewayReference: data.transactionId,
        status: data.status === 'active' ? 'success' : 'pending',
        paymentMethod: data.paymentMethod,
        completedAt: data.status === 'active' ? new Date() : null
      });
      await transaction.save();
      console.log(`✅ Transaction saved: ${data.reference}`);
    } else {
      console.log(`ℹ️ Transaction already exists: ${data.reference}`);
    }

    return subscription;
  } catch (error) {
    // ✅ Handle duplicate key error gracefully
    if (error.code === 11000) {
      console.log(`ℹ️ Record already exists for: ${data.reference} (duplicate ignored)`);
      // Try to fetch and return the existing record
      const existingSubscription = await Subscription.findOne({ reference: data.reference });
      if (existingSubscription) {
        // Update it just in case
        existingSubscription.status = data.status;
        await existingSubscription.save();
        return existingSubscription;
      }
      return null;
    }
    console.error('❌ Failed to save subscription:', error.message);
    throw error;
  }
}

async function sendConfirmationEmail(paymentData) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('ℹ️ Email not configured, skipping email');
      return;
    }

    const customerEmail = paymentData.customer?.email || paymentData.email;
    const customerName = paymentData.metadata?.customer_name || paymentData.customerName;
    const packageName = paymentData.metadata?.package_name || paymentData.packageName;

    // ✅ FIXED: Proper amount handling
    let amount = paymentData.amount;
    // If amount is in cents (greater than 1000 for KES), convert to main unit
    if (amount > 1000 && paymentData.currency === 'KES') {
      amount = amount / 100;
    }
    // If amount is already in main unit but has decimal, keep as is
    const formattedAmount = amount.toLocaleString();

    const currencySymbol = paymentData.currency === 'KES' ? 'KSh' : 
                           paymentData.currency === 'EUR' ? '€' : 
                           paymentData.currency === 'GBP' ? '£' : '$';

    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: 'Payment Confirmation - WeBA Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
            <h1 style="color: white;">Payment Confirmed!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear ${customerName},</p>
            <p>Thank you for your payment. Your subscription has been successfully activated.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3>Payment Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Package:</strong> ${packageName}</li>
                <li><strong>Amount:</strong> ${currencySymbol} ${formattedAmount}</li>
                <li><strong>Reference:</strong> ${paymentData.reference}</li>
                <li><strong>Payment Method:</strong> ${paymentData.channel || paymentData.paymentMethod || 'card'}</li>
                <li><strong>Date:</strong> ${new Date(paymentData.paid_at || paymentData.paymentDate).toLocaleString()}</li>
              </ul>
            </div>
            
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px;">
              <h3>Next Steps:</h3>
              <p>Your WiFi service will be activated within 24 hours.</p>
              <p>A technician will contact you to schedule installation.</p>
            </div>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>WeBA Solutions Team</strong>
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to ${customerEmail}`);

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('🔗 Preview Email:', previewUrl);
    }

  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    // Don't throw - email failure shouldn't break payment flow
  }
}

async function sendAdminNotification(paymentData) {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.log('ℹ️ Admin email not configured');
      return;
    }

    let amount = paymentData.amount;
    if (amount > 1000 && paymentData.currency === 'KES') {
      amount = amount / 100;
    }

    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🔔 New Payment Received - WeBA Solutions',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Payment Received</h2>
          
          <ul>
            <li><strong>Customer:</strong> ${paymentData.metadata?.customer_name || paymentData.customerName}</li>
            <li><strong>Email:</strong> ${paymentData.customer?.email || paymentData.email}</li>
            <li><strong>Phone:</strong> ${paymentData.metadata?.phone || paymentData.phone}</li>
            <li><strong>Location:</strong> ${paymentData.metadata?.location || paymentData.location}</li>
            <li><strong>Package:</strong> ${paymentData.metadata?.package_name || paymentData.packageName}</li>
            <li><strong>Amount:</strong> ${paymentData.currency || 'KES'} ${amount}</li>
            <li><strong>Reference:</strong> ${paymentData.reference}</li>
            <li><strong>Transaction ID:</strong> ${paymentData.id || paymentData.transactionId}</li>
            <li><strong>Payment Method:</strong> ${paymentData.channel || paymentData.paymentMethod}</li>
            <li><strong>Date:</strong> ${new Date(paymentData.paid_at || paymentData.paymentDate).toLocaleString()}</li>
          </ul>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Admin notification sent to ${process.env.ADMIN_EMAIL}`);

  } catch (error) {
    console.error('❌ Failed to send admin email:', error.message);
  }
}

module.exports = {
  saveSubscriptionToDatabase,
  sendConfirmationEmail,
  sendAdminNotification
};