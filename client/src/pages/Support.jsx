import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const Support = () => {
  const { contact, whatsapp } = config;

  const supportOptions = [
    {
      title: 'Technical Support',
      contact: contact.supportEmail,
      phone: contact.supportPhone,
      hours: '24/7',
      icon: '🛠️',
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'Sales Inquiries',
      contact: contact.salesEmail,
      phone: contact.supportPhone,
      hours: 'Mon-Fri, 8AM-6PM',
      icon: '💰',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Billing & Accounts',
      contact: contact.supportEmail,
      phone: contact.supportPhone,
      hours: 'Mon-Fri, 9AM-5PM',
      icon: '📋',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'General Inquiries',
      contact: contact.infoEmail,
      phone: contact.supportPhone,
      hours: 'Mon-Fri, 8AM-6PM',
      icon: '📞',
      color: 'bg-red-50 border-red-200'
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
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa, bank transfers, credit cards, and cash payments.'
    },
    {
      question: 'How long does installation take?',
      answer: 'Most installations are completed within 24-48 hours after site assessment.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section - Moved down and made black */}
      <div className="mt-8">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black hover:text-red-600 transition-colors duration-300">
              Support & Contact
            </h1>
            <p className="text-lg md:text-xl text-black-400">
              We're here to help you with any questions or issues. 
              Choose the most convenient way to reach our team.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Contact Options Grid */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12 mt-8 md:mt-12">
  <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 hover:text-red-600 transition-colors duration-300">
    Contact Information
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto">
    Reach out to the right department for faster assistance
  </p>
</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <div 
                key={index} 
                className={`${option.color} rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-xl mr-2">{option.icon}</span>
                  <h3 className="text-lg font-bold text-black hover:text-red-600 transition-colors duration-300 cursor-default">
                    {option.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                    <p className="text-sm text-gray-700 font-medium truncate">{option.contact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-gray-700 font-medium">
                      {whatsapp.formatPhoneDisplay(option.phone)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Hours</p>
                    <p className="text-sm text-gray-700 font-medium">{option.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 hover:text-red-600 transition-colors duration-300">
              24/7 Emergency Support
            </h2>
            <p className="text-gray-600">
              For urgent technical issues affecting service
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <span className="text-2xl mr-3">⚠️</span>
                <h3 className="text-xl md:text-2xl font-bold">Technical Emergencies</h3>
              </div>
              
              <p className="text-center text-base mb-8 text-red-100">
                Immediate assistance for critical service interruptions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-700/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-4">📞 Call Support</h4>
                  <p className="text-xl font-bold mb-2">
                    {whatsapp.formatPhoneDisplay(contact.emergencyPhone || contact.supportPhone)}
                  </p>
                  <p className="text-red-200 text-sm">Available 24 hours, 7 days a week</p>
                </div>
                
                <div className="bg-red-700/50 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-4">💬 WhatsApp</h4>
                  <a 
                    href={whatsapp.getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 w-full"
                  >
                    <span className="mr-2 text-sm">Chat Now</span>
                    <span>→</span>
                  </a>
                  <p className="text-red-200 mt-3 text-sm">
                    {whatsapp.formatPhoneDisplay(contact.whatsappNumber)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 hover:text-red-600 transition-colors duration-300">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-red-300 transition-all duration-300"
              >
                <div className="flex items-start">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${index % 2 === 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} mr-3`}>
                    <span className="text-sm">{index + 1}</span>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Contact Methods */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 hover:text-red-600 transition-colors duration-300">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-600">
              Multiple channels for your convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📍</span>
              </div>
              <h3 className="text-lg font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                Visit Our Offices
              </h3>
              <p className="text-gray-600 text-sm">
                <strong>Head Office:</strong><br />
                Nairobi, Kenya
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📧</span>
              </div>
              <h3 className="text-lg font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 text-xs">
                <strong>Technical:</strong> {contact.supportEmail}<br />
                <strong>Sales:</strong> {contact.salesEmail}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📞</span>
              </div>
              <h3 className="text-lg font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 text-sm">
                <strong>Main Line:</strong> {whatsapp.formatPhoneDisplay(contact.supportPhone)}<br />
                <strong>Emergency:</strong> {whatsapp.formatPhoneDisplay(contact.emergencyPhone || contact.supportPhone)}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-5 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                WhatsApp
              </h3>
              <a 
                href={whatsapp.getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-lg transition-all duration-300 mb-2 text-sm"
              >
                Start Chat
              </a>
              <p className="text-gray-600 text-xs">
                Quick response for general inquiries
              </p>
            </div>
          </div>
        </div>

        {/* Self-care Portal */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">Self-care Portal</h2>
            <p className="text-base text-green-100 mb-6">
              Manage your account, bills, and service requests online with our self-care portal
            </p>
            <Link 
              to="/selfcare" 
              className="inline-flex items-center bg-white text-green-600 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Go to Self-care Portal
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>

        {/* Contact Form CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-3 text-sm">
            Can't find what you're looking for?
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Contact Us Directly
            <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;