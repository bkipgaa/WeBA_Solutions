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

// Helper to generate activation code
function generateActivationCode() {
  const crypto = require('crypto');
  const random = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `WBSC-${random.slice(0,4)}-${random.slice(4,8)}-${random.slice(8,12)}`;
}

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

    // ✅ Determine serviceType and activationCode
    const securityPackages = ['Starter Shield', 'Home Shield', 'Smart Shield', 'Business Shield', 'Elite Shield'];
    const isSecurity = securityPackages.includes(data.packageName);
    const serviceType = isSecurity ? 'security' : 'broadband';
    const activationCode = isSecurity ? generateActivationCode() : null;

    // ✅ Create new subscription
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
      status: data.status,
      serviceType: serviceType,
      activationCode: activationCode
    });
    await subscription.save();
    console.log(`✅ Subscription saved: ${data.reference} (${serviceType})`);

    // ✅ Create transaction record
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
    if (error.code === 11000) {
      console.log(`ℹ️ Duplicate key ignored for: ${data.reference}`);
      const existingSubscription = await Subscription.findOne({ reference: data.reference });
      if (existingSubscription) {
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
    const reference = paymentData.reference || paymentData.id;

    // ✅ Fetch subscription details from database
    let activationCode = null;
    let serviceType = 'broadband';
    let subscriptionEnd = null;
    let dbAmount = null;
    let dbCurrency = null;
    
    if (process.env.MONGODB_URI && reference) {
      try {
        const subscription = await Subscription.findOne({ reference });
        if (subscription) {
          activationCode = subscription.activationCode;
          serviceType = subscription.serviceType || 'broadband';
          subscriptionEnd = subscription.subscriptionEnd;
          dbAmount = subscription.amount;      // already in main unit
          dbCurrency = subscription.currency;
        }
      } catch (err) {
        console.error('Error fetching subscription for email:', err.message);
      }
    }

    // ✅ Fallback: derive from packageName if DB fetch failed
    if (serviceType === 'broadband') {
      const securityPackages = ['Starter Shield', 'Home Shield', 'Smart Shield', 'Business Shield', 'Elite Shield'];
      if (securityPackages.includes(packageName)) {
        serviceType = 'security';
      }
    }

    // ✅ AMOUNT HANDLING: prefer database amount (already correct)
    let amount = dbAmount;
    let currency = dbCurrency || paymentData.currency || 'KES';
    
    if (amount === null) {
      // Use paymentData.amount and convert from cents if needed
      amount = paymentData.amount;
      // PayStack returns amount in cents (e.g., 1000 = 10 KES). Convert if amount >= 100.
      if (currency === 'KES' && amount >= 100) {
        amount = amount / 100;
      }
      if (currency === 'USD' && amount >= 100) {
        amount = amount / 100;
      }
    }
    
    const formattedAmount = amount.toLocaleString();
    const currencySymbol = currency === 'KES' ? 'KSh' : 
                           currency === 'EUR' ? '€' : 
                           currency === 'GBP' ? '£' : '$';

    // ✅ Build activation code section for security packages
    let activationHtml = '';
    if (serviceType === 'security') {
      // If no activation code from DB, generate one now (fallback)
      if (!activationCode) {
        activationCode = generateActivationCode();
        // Update subscription with this code
        if (process.env.MONGODB_URI && reference) {
          await Subscription.updateOne({ reference }, { activationCode });
        }
      }
      activationHtml = `
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #1976d2; margin-top: 0;">🔐 Your Activation Code</h3>
          <div style="font-size: 28px; font-weight: bold; font-family: monospace; letter-spacing: 4px; background: white; padding: 15px; border-radius: 8px; border: 2px dashed #1976d2;">
            ${activationCode}
          </div>
          <p style="margin-top: 15px;">
            Use this code in the <strong>WEBASECURE mobile app</strong> to activate your security subscription.<br>
            The code is valid until <strong>${subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : '30 days'}</strong>.
          </p>
        </div>
      `;
    }

    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: serviceType === 'security' 
        ? 'Payment Confirmation - WEBASECURE Security Subscription' 
        : 'Payment Confirmation - WeBA Solutions Broadband',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: ${serviceType === 'security' ? '#1976d2' : '#4CAF50'}; padding: 20px; text-align: center;">
            <h1 style="color: white;">Payment Confirmed!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear ${customerName},</p>
            <p>Thank you for your payment. Your ${serviceType === 'security' ? 'WEBASECURE security' : 'broadband'} subscription has been successfully activated.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3>Payment Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Package:</strong> ${packageName}</li>
                <li><strong>Amount:</strong> ${currencySymbol} ${formattedAmount}</li>
                <li><strong>Reference:</strong> ${reference}</li>
                <li><strong>Payment Method:</strong> ${paymentData.channel || paymentData.paymentMethod || 'card'}</li>
                <li><strong>Date:</strong> ${new Date(paymentData.paid_at || paymentData.paymentDate).toLocaleString()}</li>
              </ul>
            </div>
            
            ${activationHtml}
            
            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px;">
              <h3>Next Steps:</h3>
              ${serviceType === 'security' 
                ? `<p>Download the WEBASECURE app from Google Play or App Store, enter your activation code, and start protecting your devices immediately.</p>`
                : `<p>Your WiFi service will be activated within 24 hours. A technician will contact you to schedule installation.</p>`
              }
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
    // Don't throw – email failure shouldn't break payment flow
  }
}

async function sendAdminNotification(paymentData) {
  try {
    if (!process.env.ADMIN_EMAIL) {
      console.log('ℹ️ Admin email not configured');
      return;
    }

    // Fetch subscription details for accurate info
    let activationCode = null;
    let serviceType = null;
    let dbAmount = null;
    let dbCurrency = null;
    
    if (process.env.MONGODB_URI && paymentData.reference) {
      try {
        const subscription = await Subscription.findOne({ reference: paymentData.reference });
        if (subscription) {
          activationCode = subscription.activationCode;
          serviceType = subscription.serviceType;
          dbAmount = subscription.amount;
          dbCurrency = subscription.currency;
        }
      } catch (err) {
        console.error('Error fetching subscription for admin:', err.message);
      }
    }

    let amount = dbAmount || paymentData.amount;
    let currency = dbCurrency || paymentData.currency || 'KES';
    
    // Convert from cents if necessary (fallback)
    if (!dbAmount && currency === 'KES' && amount >= 100) {
      amount = amount / 100;
    }
    if (!dbAmount && currency === 'USD' && amount >= 100) {
      amount = amount / 100;
    }

    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New ${serviceType === 'security' ? 'SECURITY' : 'BROADBAND'} Payment - WeBA Solutions`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Payment Received</h2>
          
          <ul>
            <li><strong>Service:</strong> ${serviceType === 'security' ? 'WEBASECURE Security' : 'Broadband Internet'}</li>
            <li><strong>Customer:</strong> ${paymentData.metadata?.customer_name || paymentData.customerName}</li>
            <li><strong>Email:</strong> ${paymentData.customer?.email || paymentData.email}</li>
            <li><strong>Phone:</strong> ${paymentData.metadata?.phone || paymentData.phone}</li>
            <li><strong>Location:</strong> ${paymentData.metadata?.location || paymentData.location}</li>
            <li><strong>Package:</strong> ${paymentData.metadata?.package_name || paymentData.packageName}</li>
            <li><strong>Amount:</strong> ${currency} ${amount.toLocaleString()}</li>
            <li><strong>Reference:</strong> ${paymentData.reference}</li>
            <li><strong>Transaction ID:</strong> ${paymentData.id || paymentData.transactionId}</li>
            <li><strong>Payment Method:</strong> ${paymentData.channel || paymentData.paymentMethod}</li>
            <li><strong>Date:</strong> ${new Date(paymentData.paid_at || paymentData.paymentDate).toLocaleString()}</li>
            ${activationCode ? `<li><strong>Activation Code:</strong> ${activationCode}</li>` : ''}
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