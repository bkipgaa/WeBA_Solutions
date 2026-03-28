const nodemailer = require('nodemailer');
const { Subscription, Transaction } = require('../models');

async function saveSubscriptionToDatabase(data) {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('ℹ️ MongoDB not configured, using in-memory storage');
      return null;
    }

    // Check if subscription already exists
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
    } else {
      // Create new subscription
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
    }

    // Save transaction record
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

    return subscription;
  } catch (error) {
    console.error('❌ Failed to save subscription:', error);
    throw error;
  }
}

async function sendConfirmationEmail(paymentData) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('ℹ️ Email not configured, skipping email');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const customerEmail = paymentData.customer?.email || paymentData.email;
    const customerName = paymentData.metadata?.customer_name || paymentData.customerName;
    const packageName = paymentData.metadata?.package_name || paymentData.packageName;
    const amount = paymentData.amount / 100 || paymentData.amount;
    const currency = paymentData.currency || 'USD';

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
              <h3 style="margin-top: 0;">Payment Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Package:</strong> ${packageName}</li>
                <li><strong>Amount:</strong> ${currency} ${amount}</li>
                <li><strong>Reference:</strong> ${paymentData.reference}</li>
                <li><strong>Payment Method:</strong> ${paymentData.channel || paymentData.paymentMethod}</li>
                <li><strong>Date:</strong> ${new Date(paymentData.paid_at || paymentData.paymentDate).toLocaleString()}</li>
              </ul>
            </div>
            
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px;">
              <h3 style="margin-top: 0;">Next Steps:</h3>
              <p>Your WiFi service will be activated within 24 hours. You'll receive a separate email with your login credentials and setup instructions.</p>
            </div>
            
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>WeBA Solutions Team</strong><br>
              <small>support@webasolutions.com | +254 712 345 678</small>
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Confirmation email sent to ${customerEmail}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

async function sendAdminNotification(paymentData) {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.log('ℹ️ Admin email not configured');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🔔 New Payment Received - WeBA Solutions',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Payment Received</h2>
          <p>A new payment has been successfully processed.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <h3>Payment Details:</h3>
            <ul>
              <li><strong>Customer:</strong> ${paymentData.metadata?.customer_name}</li>
              <li><strong>Email:</strong> ${paymentData.customer?.email}</li>
              <li><strong>Phone:</strong> ${paymentData.metadata?.phone}</li>
              <li><strong>Location:</strong> ${paymentData.metadata?.location}</li>
              <li><strong>Package:</strong> ${paymentData.metadata?.package_name}</li>
              <li><strong>Amount:</strong> ${paymentData.currency} ${paymentData.amount / 100}</li>
              <li><strong>Reference:</strong> ${paymentData.reference}</li>
              <li><strong>Transaction ID:</strong> ${paymentData.id}</li>
              <li><strong>Payment Method:</strong> ${paymentData.channel}</li>
              <li><strong>Date:</strong> ${new Date(paymentData.paid_at).toLocaleString()}</li>
            </ul>
          </div>
          
          <p><a href="${process.env.ADMIN_DASHBOARD_URL}/subscriptions">View in Admin Dashboard</a></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Admin notification sent to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error('❌ Failed to send admin email:', error);
  }
}

module.exports = {
  saveSubscriptionToDatabase,
  sendConfirmationEmail,
  sendAdminNotification
};