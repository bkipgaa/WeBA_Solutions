import React from 'react';
import './support.css'
import config from '../config';

const Support = () => {

  // Use environment variables with fallbacks
  const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL || 'webasolution@gmail.com';
  const salesEmail = process.env.REACT_APP_SALES_EMAIL || 'webasolution@gmail.com';
  const infoEmail = process.env.REACT_APP_INFO_EMAIL || 'info@webasolutions.net';
  const supportPhone = process.env.REACT_APP_SUPPORT_PHONE || '0712200198';
  const emergencyPhone = process.env.REACT_APP_EMERGENCY_PHONE || '0712200198';
  const companyName = process.env.REACT_APP_COMPANY_NAME || 'Weba Solutions';
   const supportOptions = [
    {
      title: 'Technical Support',
      contact: supportEmail,
      phone: supportPhone,
      hours: '24/7'
    },
    {
      title: 'Sales Inquiries',
      contact: salesEmail,
      phone: supportPhone,
      hours: 'Mon-Fri, 8AM-6PM'
    },
    {
      title: 'Billing & Accounts',
      contact: supportEmail,
      phone: supportPhone,
      hours: 'Mon-Fri, 9AM-5PM'
    },
    {
      title: 'General Inquiries',
      contact: infoEmail,
      phone: supportPhone,
      hours: 'Mon-Fri, 8AM-6PM'
    }
  ];

  const faqs = [
    {
      question: 'How do I report an internet outage?',
      answer: 'Contact our 24/7 technical support line or use the self-care portal.'
    },
    {
      question: 'What are your business hours?',
      answer: 'Sales and general inquiries: Mon-Fri 8AM-6PM. Technical support: 24/7.'
    },
    {
      question: 'How can I pay my bill?',
      answer: 'Use the self-care portal, mobile banking, or visit our offices.'
    },
    {
      question: 'Do you offer installation services?',
      answer: 'Yes, we provide professional installation for all our services.'
    }
  ];

  return (
    <div className="page-content">
      <div className="container">
        <h1>Support & Contact</h1>

        <div className="support-intro">
          <p>
            We're here to help you with any questions or issues you may have. 
            Choose the most convenient way to contact us.
          </p>
        </div>

        <div className="contact-options">
          <h2>Contact Information</h2>
          <div className="contact-grid">
            {supportOptions.map((option, index) => (
              <div key={index} className="contact-card">
                <h3>{option.title}</h3>
                <p><strong>Email:</strong> {option.contact}</p>
                <p><strong>Phone:</strong> {option.phone}</p>
                <p><strong>Hours:</strong> {option.hours}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="emergency-support">
          <h2>24/7 Emergency Support</h2>
          <div className="emergency-card">
            <h3>⚠️ Technical Emergencies</h3>
            <p>For urgent technical issues affecting service:</p>
            <div className="emergency-contact">
              <p><strong>Phone:</strong> 0712200198 (24/7)</p>
              <p><strong>WhatsApp:</strong> 0712200198</p>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="self-care-redirect">
          <h2>Self-care Portal</h2>
          <p>
            For account management, bill payments, and service requests, 
            please use our self-care portal.
          </p>
          <a href="/selfcare" className="btn btn-primary">
            Go to Self-care Portal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;