/**
 * EMAIL NOTIFICATION FUNCTIONS
 * Converted from your original Express code
 */

const nodemailer = require('nodemailer');

// Email transporter configuration (same as your original)
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Save subscription to database (placeholder - same as your original)
 * In production, replace with actual database connection
 */
async function saveSubscriptionToDatabase(subscriptionData) {
  console.log('✅ Subscription saved:', subscriptionData);
  return { success: true, id: Date.now() };
}

/**
 * Send confirmation email to customer (exact copy from your original)
 */
async function sendConfirmationEmail(paymentData) {
  try {
    // Format amount correctly
    let amount = 0;
    let currency = paymentData.currency || 'KES';
    
    if (paymentData.amount) {
      amount = paymentData.amount / 100;
    } else if (paymentData.purchase_units?.[0]?.amount?.value) {
      amount = parseFloat(paymentData.purchase_units[0].amount.value);
    }

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - WeBA Solutions</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .receipt-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
          .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .receipt-row:last-child { border-bottom: none; }
          .receipt-label { font-weight: 600; color: #4b5563; }
          .receipt-value { color: #1f2937; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
          .success-icon { font-size: 48px; text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmed! 🎉</h1>
            <p>Thank you for choosing WeBA Solutions</p>
          </div>
          <div class="content">
            <div class="success-icon">✅</div>
            <p>Dear ${paymentData.metadata?.customer_name || paymentData.customer_name},</p>
            <p>Thank you for subscribing to our broadband service! Your payment has been successfully processed and your subscription is now active.</p>
            
            <div class="receipt-box">
              <h3 style="margin-top: 0;">Payment Receipt</h3>
              <div class="receipt-row">
                <span class="receipt-label">Transaction ID:</span>
                <span class="receipt-value">${paymentData.reference || paymentData.transactionId || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Package:</span>
                <span class="receipt-value">${paymentData.metadata?.package_name || paymentData.packageName || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Amount Paid:</span>
                <span class="receipt-value">${currency} ${amount.toLocaleString()}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Payment Method:</span>
                <span class="receipt-value">${paymentData.channel || paymentData.paymentMethod || 'PayPal'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Payment Date:</span>
                <span class="receipt-value">${new Date(paymentData.paid_at || Date.now()).toLocaleString()}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Customer Name:</span>
                <span class="receipt-value">${paymentData.metadata?.customer_name || paymentData.customer_name || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Phone:</span>
                <span class="receipt-value">${paymentData.metadata?.phone || paymentData.phone || 'N/A'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Installation Address:</span>
                <span class="receipt-value">${paymentData.metadata?.location || paymentData.location || 'N/A'}</span>
              </div>
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Your internet service will be activated within 24 hours</li>
              <li>A technician will contact you within 48 hours to schedule installation</li>
              <li>You will receive your login credentials via SMS/Email</li>
            </ol>
            
            <p>If you have any questions, please contact our support team:</p>
            <p>📞 Phone: +254 730 862 862<br>
            📧 Email: support@webasolutions.com</p>
            
            <div style="text-align: center;">
              <a href="https://www.webainfinitysolutions.com" class="button">Visit Our Website</a>
            </div>
          </div>
          <div class="footer">
            <p>WeBA Solutions - Fast, Reliable Internet for Everyone</p>
            <p>This is an automated receipt. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} WeBA Solutions. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: `"WeBA Solutions" <${process.env.EMAIL_USER}>`,
      to: paymentData.customer?.email || paymentData.email,
      subject: `✅ Payment Confirmation - ${paymentData.metadata?.package_name || paymentData.packageName} Subscription`,
      html: emailContent
    };
    
    await emailTransporter.sendMail(mailOptions);
    console.log('📧 Confirmation email sent to:', paymentData.customer?.email || paymentData.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send admin notification (exact copy from your original)
 */
async function sendAdminNotification(paymentData) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@webasolutions.com';
    
    let amount = 0;
    let currency = paymentData.currency || 'KES';
    
    if (paymentData.amount) {
      amount = paymentData.amount / 100;
    } else if (paymentData.purchase_units?.[0]?.amount?.value) {
      amount = parseFloat(paymentData.purchase_units[0].amount.value);
    }
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #0ea5e9;">🔔 New Subscription Alert!</h2>
        <p>A new customer has subscribed to your broadband service.</p>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${paymentData.metadata?.customer_name || paymentData.customer_name || 'N/A'}</p>
          <p><strong>Email:</strong> ${paymentData.customer?.email || paymentData.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${paymentData.metadata?.phone || paymentData.phone || 'N/A'}</p>
          <p><strong>Location:</strong> ${paymentData.metadata?.location || paymentData.location || 'N/A'}</p>
          <p><strong>Package:</strong> ${paymentData.metadata?.package_name || paymentData.packageName || 'N/A'}</p>
          <p><strong>Amount:</strong> ${currency} ${amount.toLocaleString()}</p>
          <p><strong>Payment Gateway:</strong> ${paymentData.channel ? 'PayStack' : 'PayPal'}</p>
          <p><strong>Transaction ID:</strong> ${paymentData.reference || paymentData.id || 'N/A'}</p>
          <p><strong>Time:</strong> ${new Date(paymentData.paid_at || Date.now()).toLocaleString()}</p>
        </div>
        
        <p>Please ensure:</p>
        <ul>
          <li>✓ Activate their service within 24 hours</li>
          <li>✓ Schedule installation with a technician</li>
          <li>✓ Send login credentials</li>
        </ul>
        
        <p>Log in to your dashboard to manage this subscription.</p>
      </div>
    `;
    
    const mailOptions = {
      from: `"WeBA Solutions System" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🔔 New Subscription: ${paymentData.metadata?.package_name || paymentData.packageName} - ${paymentData.metadata?.customer_name || paymentData.customer_name}`,
      html: emailContent
    };
    
    await emailTransporter.sendMail(mailOptions);
    console.log('📧 Admin notification sent');
    return { success: true };
  } catch (error) {
    console.error('❌ Admin notification failed:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  saveSubscriptionToDatabase,
  sendConfirmationEmail,
  sendAdminNotification
};