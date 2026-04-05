import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Shield, HelpCircle, User, CreditCard, Wifi, Settings } from 'lucide-react';
import config from '../config';

const Support = () => {
  const { contact, whatsapp } = config;

  const supportOptions = [
    {
      title: 'Technical Support',
      contact: contact.supportEmail,
      phone: contact.supportPhone,
      hours: '24/7',
      icon: <Settings size={24} />,
      description: 'For internet connectivity issues and technical problems'
    },
    {
      title: 'Sales Inquiries',
      contact: contact.salesEmail,
      phone: contact.supportPhone,
      hours: 'Mon-Fri, 8AM-6PM',
      icon: <User size={24} />,
      description: 'New connections, upgrades, and service packages'
    },
    {
      title: 'Billing & Accounts',
      contact: contact.supportEmail,
      phone: contact.supportPhone,
      hours: 'Mon-Fri, 9AM-5PM',
      icon: <CreditCard size={24} />,
      description: 'Payments, invoices, and account management'
    },
    {
      title: 'General Inquiries',
      contact: contact.infoEmail,
      phone: contact.supportPhone,
      hours: 'Mon-Fri, 8AM-6PM',
      icon: <HelpCircle size={24} />,
      description: 'General questions and information'
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          {/* Back to Home Link */}
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-red-600 text-sm mb-6 transition-colors">
            ← Back to Home
          </Link>
          
          {/* Header Content */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-900 text-white p-4 rounded-full">
                <Phone size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Support & Contact
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              We're here to help you with any questions or issues
            </p>
          </div>
        </div>

        {/* Contact Options Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Contact Information
            </h2>
            <p className="text-gray-500">Reach out to the right department for faster assistance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportOptions.map((option, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-gray-400 group-hover:text-red-600 transition-colors">
                    {option.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {option.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">{option.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-gray-700 font-medium">{option.contact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-gray-700 font-medium">{whatsapp.formatPhoneDisplay(option.phone)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Hours</p>
                    <p className="text-gray-700">{option.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              24/7 Emergency Support
            </h2>
            <p className="text-gray-500">For urgent technical issues affecting service</p>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield size={28} className="text-red-500" />
              <h3 className="text-xl font-bold text-white">Technical Emergencies</h3>
            </div>
            <p className="text-gray-300 mb-6">Immediate assistance for critical service interruptions</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-xl p-5">
                <h4 className="text-white font-bold mb-2 flex items-center justify-center gap-2">
                  <Phone size={18} /> Call Support
                </h4>
                <p className="text-lg font-bold text-white mb-1">
                  {whatsapp.formatPhoneDisplay(contact.emergencyPhone || contact.supportPhone)}
                </p>
                <p className="text-gray-400 text-xs">Available 24 hours, 7 days a week</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-5">
                <h4 className="text-white font-bold mb-2 flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> WhatsApp
                </h4>
                <a 
                  href={whatsapp.getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 mb-2"
                >
                  Chat Now →
                </a>
                <p className="text-gray-400 text-xs">{whatsapp.formatPhoneDisplay(contact.whatsappNumber)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-red-300 hover:shadow-md group"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <span className="text-xs font-bold text-gray-600 group-hover:text-red-600">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
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

        {/* Other Ways to Reach Us */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-500">Multiple channels for your convenience</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
                <span className="text-xl">📍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">Visit Our Offices</h3>
              <p className="text-gray-500 text-xs">Mombasa, Kenya</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
                <Mail size={20} className="text-gray-600 group-hover:text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">Email Support</h3>
              <p className="text-gray-500 text-xs">{contact.supportEmail}</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
                <Phone size={20} className="text-gray-600 group-hover:text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">Call Us</h3>
              <p className="text-gray-500 text-xs">{whatsapp.formatPhoneDisplay(contact.supportPhone)}</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition-colors">
                <MessageCircle size={20} className="text-gray-600 group-hover:text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">WhatsApp</h3>
              <a href={whatsapp.getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs hover:text-red-600 transition-colors">
                Click to chat
              </a>
            </div>
          </div>
        </div>

        {/* Self-care Portal */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Wifi size={28} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Self-care Portal
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Manage your account, bills, and service requests online with our self-care portal
          </p>
          <Link 
            to="/selfcare" 
            className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Go to Self-care Portal →
          </Link>
        </div>

        {/* Contact Form CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-3">Can't find what you're looking for?</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
          >
            Contact Us Directly →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;