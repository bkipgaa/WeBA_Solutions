import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

const NetworkSupport = () => {
  const { contact, whatsapp } = config;

  // Combine all services into one array for 4-column grid
  const allServices = [
    {
      title: 'Load Balancing & WAN Failover',
      description: 'Advanced mangle rules and PCC for optimal traffic distribution',
      features: [
        'Mangle rules',
        'PCC balancing',
        'WAN failover',
        'Traffic optimization',
        'Monitoring'
      ],
      icon: '⚖️',
      color: 'red',
      category: 'Network Support'
    },
    {
      title: 'BGP, ISIS & OSPF Configurations',
      description: 'Dynamic routing protocols setup',
      features: [
        'BGP peering',
        'OSPF setup',
        'ISIS setup',
        'Route redistribution',
        'Routing policy',
        'Troubleshooting'
      ],
      icon: '🔄',
      color: 'green',
      category: 'Network Support'
    },
    {
      title: 'VPN & Remote Access',
      description: 'Secure remote access solutions',
      features: [
        'Site-to-site VPN',
        'Remote user VPN',
        'SSL/TLS VPN',
        'IPSec',
        'Authentication'
      ],
      icon: '🔒',
      color: 'red',
      category: 'Network Support'
    },
    {
      title: 'Multi-site Connectivity',
      description: 'MPLS and VPLS technologies',
      features: [
        'MPLS design',
        'VPLS implementation',
        'Layer 2/3 VPN',
        'QoS config',
        'Monitoring'
      ],
      icon: '🌐',
      color: 'green',
      category: 'Network Support'
    },
    {
      title: 'PBX & Telephony',
      description: 'Complete PBX setup',
      features: [
        'VoIP PBX',
        'SIP trunk',
        'Call routing',
        'IVR systems',
        'Unified comms'
      ],
      icon: '📞',
      color: 'red',
      category: 'Network Support'
    },
    {
      title: 'Enterprise Network Design',
      description: 'Network designs for enterprises',
      features: [
        'Site surveys',
        'Network architecture',
        'Wi-Fi planning',
        'Cable design',
        'Security'
      ],
      icon: '🏨',
      color: 'green',
      category: 'Network Design'
    },
    {
      title: 'Network Troubleshooting',
      description: 'Diagnosis and resolution',
      features: [
        'Performance analysis',
        'Fault isolation',
        'Latency optimization',
        'Packet loss',
        'Capacity planning'
      ],
      icon: '🔧',
      color: 'red',
      category: 'Network Design'
    },
    {
      title: 'Hotspot Deployment',
      description: 'Hotspot with captive portal',
      features: [
        'Captive portal',
        'User auth',
        'Bandwidth management',
        'Billing',
        'Analytics'
      ],
      icon: '📶',
      color: 'green',
      category: 'Network Design'
    },
    {
      title: 'Routing Migration',
      description: 'Static to dynamic routing',
      features: [
        'Protocol migration',
        'BGP/OSPF',
        'Route automation',
        'Failover',
        'Monitoring'
      ],
      icon: '🚀',
      color: 'red',
      category: 'Network Design'
    },
    {
      title: 'ISP Automation',
      description: 'Automate ISP operations',
      features: [
        'Billing automation',
        'Self-service portal',
        'Monitoring automation',
        'Ticket system',
        'API integrations'
      ],
      icon: '🤖',
      color: 'green',
      category: 'Network Design'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Expert Engineers',
      description: '10+ years experience',
      icon: '🎓'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock',
      icon: '🛡️'
    },
    {
      title: 'Proven Solutions',
      description: 'African conditions',
      icon: '✅'
    },
    {
      title: 'Cost Effective',
      description: 'Max performance',
      icon: '💰'
    }
  ];

  const technologies = [
    { name: 'MikroTik', icon: '🟢' },
    { name: 'Ubiquiti', icon: '🔵' },
    { name: 'Cisco', icon: '🔷' },
    { name: 'Juniper', icon: '🟦' },
    { name: 'OpenVPN', icon: '🟪' },
    { name: 'FreeRADIUS', icon: '🟣' },
    { name: 'pfSense', icon: '🟠' },
    { name: 'Linux', icon: '🐧' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="mt-8">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black hover:text-red-600 transition-colors duration-300">
              Network Support & Design
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              Professional network solutions for ISPs, enterprises, and institutions
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-green-500 to-red-500 text-white hover:bg-green-600 font-bold py-2 px-6 rounded-lg transition-all duration-300"
              >
                Get Quote
              </a>
              <Link 
                to="/services" 
                className="bg-gradient-to-r from-red-500 to-green-500 text-white hover:bg-red-600 font-bold py-2 px-6 rounded-lg transition-all duration-300"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-4 hover:text-red-600 transition-colors duration-300">
            Professional Network Solutions
          </h2>
          <p className="text-sm text-gray-600">
            We design, implement, and support robust network infrastructure for ISPs, hotels, schools, and enterprises.
          </p>
        </div>

        {/* All Services in 4-column grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-black mb-2 hover:text-red-600 transition-colors duration-300">
              Our Services
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-red-500 mx-auto"></div>
          </div>
          
          {/* 4-column grid for services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col ${
                  service.color === 'red' ? 'hover:border-red-300' : 'hover:border-green-300'
                }`}
              >
                <div className={`p-3 ${service.color === 'red' ? 'bg-red-50' : 'bg-green-50'} flex-grow`}>
                  <div className="flex items-start mb-2">
                    <span className="text-xl mr-2">{service.icon}</span>
                    <div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">
                        {service.category}
                      </span>
                      <h3 className="text-sm font-bold text-black hover:text-red-600 transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    {service.description}
                  </p>
                </div>
                
                <div className="p-3 pt-2">
                  <ul className="mb-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-600 mb-1 flex items-start">
                        <span className={`mr-1 ${service.color === 'red' ? 'text-red-500' : 'text-green-500'}`}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-1.5 px-2 rounded text-xs font-bold transition-all duration-300 ${
                    service.color === 'red' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us - Now 4 per row */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-black mb-2 hover:text-red-600 transition-colors duration-300">
              Why Choose Us
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-green-500 mx-auto"></div>
          </div>
          
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-sm h-full flex flex-col"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-red-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-base">{item.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 flex-grow">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies - 4 per row */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-black mb-2 hover:text-red-600 transition-colors duration-300">
              Technologies
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-red-500 mx-auto"></div>
          </div>
          
          {/* 4-column grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded p-3 text-center transition-all duration-300 hover:border-red-300"
              >
                <span className="text-xl mb-1 block">{tech.icon}</span>
                <span className="text-xs font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process - Compact */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-black mb-2 hover:text-red-600 transition-colors duration-300">
              Our Process
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-green-500 mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-green-500 to-red-500"></div>
            
            <div className="space-y-8 md:space-y-0">
              {[
                { step: '1', title: 'Assessment', desc: 'Analyze requirements' },
                { step: '2', title: 'Design', desc: 'Create architecture' },
                { step: '3', title: 'Implementation', desc: 'Deploy components' },
                { step: '4', title: 'Testing', desc: 'Test & optimize' },
                { step: '5', title: 'Support', desc: 'Maintenance & support' }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 md:px-6 mb-4 md:mb-0">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">{item.step}</span>
                        </div>
                        <h3 className="text-sm font-bold text-black hover:text-red-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-6 md:h-6 rounded-full bg-gradient-to-r from-green-500 to-red-500 border-2 border-white"></div>
                  
                  <div className="md:w-1/2 md:px-6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id="contact" className="bg-gradient-to-r from-green-600 to-red-600 rounded-xl p-6 md:p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-lg md:text-xl font-bold mb-3">
                Ready to Transform Your Network?
              </h2>
              <p className="text-sm text-green-100">
                Contact us for a free assessment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-base font-bold mb-3">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">📧</span>
                    <div>
                      <p className="text-xs text-green-200">Email</p>
                      <p className="text-sm font-medium">{contact.supportEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">📞</span>
                    <div>
                      <p className="text-xs text-green-200">Phone</p>
                      <p className="text-sm font-medium">{whatsapp.formatPhoneDisplay(contact.supportPhone)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">💬</span>
                    <div>
                      <p className="text-xs text-green-200">WhatsApp</p>
                      <a 
                        href={whatsapp.getWhatsAppLink()} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                      >
                        {whatsapp.formatPhoneDisplay(contact.whatsappNumber)}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-base font-bold mb-3">Quick Form</h3>
                <form className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full px-3 py-1.5 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white text-sm"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-3 py-1.5 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white text-sm"
                  />
                  <select className="w-full px-3 py-1.5 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:border-white text-sm">
                    <option value="">Service Interest</option>
                    <option value="support">Network Support</option>
                    <option value="design">Network Design</option>
                    <option value="both">Both Services</option>
                  </select>
                  <button 
                    type="submit" 
                    className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-2 rounded text-sm transition-all duration-300"
                  >
                    Request Consultation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-black mb-2 hover:text-red-600 transition-colors duration-300">
              FAQs
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-red-500 mx-auto"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                q: 'How long does implementation take?',
                a: 'Small: 1-2 weeks, Enterprise: 2-4 weeks, ISP: 4-8 weeks.'
              },
              {
                q: 'Ongoing support?',
                a: 'Yes, 24/7 monitoring, on-call support, maintenance.'
              },
              {
                q: 'Work with existing infrastructure?',
                a: 'Yes, we assess and integrate existing setups.'
              },
              {
                q: 'Regions served?',
                a: 'East Africa: Kenya, Uganda, Tanzania, Rwanda, Ethiopia.'
              }
            ].map((faq, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-all duration-300">
                  <h3 className="text-sm font-bold text-black hover:text-red-600 transition-colors duration-300 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs text-gray-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSupport;