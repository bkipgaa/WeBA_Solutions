import React from 'react';
import { Link } from 'react-router-dom';
import { Network,  CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import config from '../../config';

const NetworkSupport = () => {
  const { contact, whatsapp } = config;

  const allServices = [
    {
      title: 'Load Balancing & WAN Failover',
      description: 'Advanced mangle rules and PCC for optimal traffic distribution',
      features: ['Mangle rules', 'PCC balancing', 'WAN failover', 'Traffic optimization', 'Monitoring'],
      icon: '⚖️'
    },
    {
      title: 'BGP, ISIS & OSPF Configurations',
      description: 'Dynamic routing protocols setup',
      features: ['BGP peering', 'OSPF setup', 'ISIS setup', 'Route redistribution', 'Routing policy', 'Troubleshooting'],
      icon: '🔄'
    },
    {
      title: 'VPN & Remote Access',
      description: 'Secure remote access solutions',
      features: ['Site-to-site VPN', 'Remote user VPN', 'SSL/TLS VPN', 'IPSec', 'Authentication'],
      icon: '🔒'
    },
    {
      title: 'Multi-site Connectivity',
      description: 'MPLS and VPLS technologies',
      features: ['MPLS design', 'VPLS implementation', 'Layer 2/3 VPN', 'QoS config', 'Monitoring'],
      icon: '🌐'
    },
    {
      title: 'PBX & Telephony',
      description: 'Complete PBX setup',
      features: ['VoIP PBX', 'SIP trunk', 'Call routing', 'IVR systems', 'Unified comms'],
      icon: '📞'
    },
    {
      title: 'Enterprise Network Design',
      description: 'Network designs for enterprises',
      features: ['Site surveys', 'Network architecture', 'Wi-Fi planning', 'Cable design', 'Security'],
      icon: '🏨'
    },
    {
      title: 'Network Troubleshooting',
      description: 'Diagnosis and resolution',
      features: ['Performance analysis', 'Fault isolation', 'Latency optimization', 'Packet loss', 'Capacity planning'],
      icon: '🔧'
    },
    {
      title: 'Hotspot Deployment',
      description: 'Hotspot with captive portal',
      features: ['Captive portal', 'User auth', 'Bandwidth management', 'Billing', 'Analytics'],
      icon: '📶'
    },
    {
      title: 'Routing Migration',
      description: 'Static to dynamic routing',
      features: ['Protocol migration', 'BGP/OSPF', 'Route automation', 'Failover', 'Monitoring'],
      icon: '🚀'
    },
    {
      title: 'ISP Automation',
      description: 'Automate ISP operations',
      features: ['Billing automation', 'Self-service portal', 'Monitoring automation', 'Ticket system', 'API integrations'],
      icon: '🤖'
    }
  ];

  const whyChooseUs = [
    { title: 'Expert Engineers', description: '10+ years experience', icon: '🎓' },
    { title: '24/7 Support', description: 'Round-the-clock', icon: '🛡️' },
    { title: 'Proven Solutions', description: 'African conditions', icon: '✅' },
    { title: 'Cost Effective', description: 'Max performance', icon: '💰' }
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

  const faqs = [
    { q: 'How long does implementation take?', a: 'Small: 1-2 weeks, Enterprise: 2-4 weeks, ISP: 4-8 weeks.' },
    { q: 'Ongoing support?', a: 'Yes, 24/7 monitoring, on-call support, maintenance.' },
    { q: 'Work with existing infrastructure?', a: 'Yes, we assess and integrate existing setups.' },
    { q: 'Regions served?', a: 'East Africa: Kenya, Uganda, Tanzania, Rwanda, Ethiopia.' }
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
                <Network size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Network Support & Design
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              Professional network solutions for ISPs, enterprises, and institutions
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <a href="#contact" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300">
                Get Quote
              </a>
              <Link to="/services" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                All Services
              </Link>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 transition-all duration-300 hover:border-red-300 hover:shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Professional Network Solutions</h2>
          <p className="text-gray-600 leading-relaxed">
            We design, implement, and support robust network infrastructure for ISPs, hotels, schools, and enterprises.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Services
            </h2>
            <p className="text-gray-500">Comprehensive network solutions for every need</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allServices.map((service, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{service.icon}</span>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {service.description}
                  </p>
                  <ul className="space-y-1 mb-3">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                        <CheckCircle size={10} className="text-gray-400 group-hover:text-red-600 transition-colors mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-xs text-gray-400">+{service.features.length - 4} more</li>
                    )}
                  </ul>
                  <button className="w-full bg-gray-900 text-white py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Why Choose Us
            </h2>
            <p className="text-gray-500">The trusted choice for network solutions</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Technologies
            </h2>
            <p className="text-gray-500">Industry-leading technologies we work with</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg p-3 text-center transition-all duration-300 hover:border-red-300 hover:shadow-md group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Process
            </h2>
            <p className="text-gray-500">How we deliver excellence</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Assessment', desc: 'Analyze requirements' },
              { step: '02', title: 'Design', desc: 'Create architecture' },
              { step: '03', title: 'Implementation', desc: 'Deploy components' },
              { step: '04', title: 'Testing', desc: 'Test & optimize' },
              { step: '05', title: 'Support', desc: 'Maintenance & support' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-2xl font-bold text-gray-300 group-hover:text-red-500 mb-2">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">Common questions about our services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-red-300 hover:shadow-md group"
              >
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div id="contact" className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Ready to Transform Your Network?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Contact us for a free assessment and consultation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-red-600/20 transition-all duration-300 group">
              <Phone size={24} className="mx-auto mb-2 text-gray-300 group-hover:text-red-500" />
              <p className="text-xs text-gray-400">Call Us</p>
              <p className="text-sm font-semibold text-white">{whatsapp.formatPhoneDisplay(contact.supportPhone)}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 text-center hover:bg-red-600/20 transition-all duration-300 group">
              <Mail size={24} className="mx-auto mb-2 text-gray-300 group-hover:text-red-500" />
              <p className="text-xs text-gray-400">Email Us</p>
              <p className="text-sm font-semibold text-white">{contact.supportEmail}</p>
            </div>
            
            <a 
              href={whatsapp.getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 rounded-lg p-4 text-center hover:bg-red-600/20 transition-all duration-300 group"
            >
              <MessageCircle size={24} className="mx-auto mb-2 text-gray-300 group-hover:text-red-500" />
              <p className="text-xs text-gray-400">WhatsApp</p>
              <p className="text-sm font-semibold text-white">{whatsapp.formatPhoneDisplay(contact.whatsappNumber)}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSupport;