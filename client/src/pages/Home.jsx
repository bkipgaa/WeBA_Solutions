import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModel/contactmodel';
import config from '../config';

const Home = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  // Get contact info from config
  const { company, contact, whatsapp } = config;

  // Generate WhatsApp link using config utility
  const whatsappLink = whatsapp.getWhatsAppLink();

  const service = [
    {
      id: 'broadband',
      name: 'Fixed Broadband Internet',
      icon: '🌐',
      description: 'High-speed fiber connections for homes and businesses'
    },
    {
      id: 'hotspot',
      name: 'Hotspot service',
      icon: '📶',
      description: 'Public WiFi solutions for commercial spaces'
    },
    {
      id: 'electrical',
      name: 'Electrical Installation',
      icon: '⚡',
      description: 'Professional wiring and electrical service'
    },
    {
      id: 'cctv',
      name: 'CCTV Installation',
      icon: '📹',
      description: 'Advanced security and surveillance systems'
    },
    {
      id: 'solar',
      name: 'Solar Installation',
      icon: '☀️',
      description: 'Complete solar power solutions'
    },
    {
      id: 'plc',
      name: 'PLC Design & Installation',
      icon: '🎛️',
      description: 'Industrial automation and control systems'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-white/10 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">⚡ Trusted Since 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Powering Homes & Businesses with Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {company.name} delivers cutting-edge engineering and internet service 
              with unmatched reliability. From high-speed connectivity to professional 
              installations, we're your trusted partner in technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/service" className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
                Explore Our Service →
              </Link>
              <Link to="/coverage" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                Check Coverage Areas
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">1,000+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">2+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-300">Support</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">6</div>
                <div className="text-sm text-gray-300">Core Services</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Core Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive engineering and technology solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {service.map((service) => (
            <Link 
              key={service.id} 
              to={`/services/${service.id}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="p-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="px-6 py-4 border-t border-gray-100">
                <span className="text-gray-900 font-semibold inline-flex items-center gap-2 group-hover:text-red-600 group-hover:gap-3 transition-all">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Our team of experts can design a solution specifically for your 
            business or home requirements.
          </p>
          <button 
            onClick={() => setShowContactModal(true)} 
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            For a Quote Contact Our Experts
          </button>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Why Choose {company.name}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md">
              <div className="text-5xl mb-3">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2">Expertise & Experience</h3>
              <p className="text-gray-600 text-sm">4+ years of proven excellence in engineering and internet service</p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">24/7 support with average response time under 30 minutes</p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md">
              <div className="text-5xl mb-3">🛡️</div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">All installations come with a comprehensive warranty</p>
            </div>
            <div className="text-center p-6 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md">
              <div className="text-5xl mb-3">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">Professional Team</h3>
              <p className="text-gray-600 text-sm">Certified engineers and technicians for all services</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Quick Access
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/selfcare" className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="text-3xl">🔐</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Self-care Portal</h3>
                <p className="text-gray-500 text-sm">Manage your account, bills, and service online</p>
              </div>
              <div className="text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">→</div>
            </Link>
            
            <Link to="/support" className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="text-3xl">🛟</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Technical Support</h3>
                <p className="text-gray-500 text-sm">24/7 assistance for all your service needs</p>
              </div>
              <div className="text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">→</div>
            </Link>
            
            <Link to="/coverage" className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="text-3xl">🗺️</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Coverage Areas</h3>
                <p className="text-gray-500 text-sm">Check if we serve your location</p>
              </div>
              <div className="text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">→</div>
            </Link>
            
            <Link to="/careers" className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:border-red-300 hover:shadow-md group">
              <div className="text-3xl">👥</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Join Our Team</h3>
                <p className="text-gray-500 text-sm">Explore career opportunities with us</p>
              </div>
              <div className="text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">→</div>
            </Link>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Ready To Transform Your Space
          </h1>
          
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Get in touch with us today for a consultation or request a quote for our service.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {/* Call Us */}
            <div 
              onClick={() => setShowContactModal(true)}
              className="flex items-center gap-3 cursor-pointer group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              <span className="text-2xl">📞</span>
              <div>
                <div className="text-xs text-gray-400">Call Us</div>
                <div className="text-white font-semibold group-hover:text-red-500 transition-colors">
                  {whatsapp.formatPhoneDisplay(contact.supportPhone)}
                </div>
              </div>
            </div>
            
            {/* Email Us */}
            <div 
              onClick={() => setShowContactModal(true)}
              className="flex items-center gap-3 cursor-pointer group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-xs text-gray-400">Email Us</div>
                <div className="text-white font-semibold group-hover:text-red-500 transition-colors">
                  {contact.supportEmail}
                </div>
              </div>
            </div>
            
            {/* WhatsApp */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
            >
              <span className="text-2xl">💬</span>
              <div>
                <div className="text-xs text-gray-400">WhatsApp</div>
                <div className="text-white font-semibold group-hover:text-red-500 transition-colors">
                  {whatsapp.formatPhoneDisplay(contact.whatsappNumber)}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        contactInfo={contact}
        companyInfo={company}
      />
    </div>
  );
};

export default Home;