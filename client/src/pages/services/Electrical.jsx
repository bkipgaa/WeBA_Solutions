import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle } from 'lucide-react';

const ElectricalWorks = () => {
  const services = [
    'New home electrical wiring and installation',
    'Commercial building electrical systems',
    'Electrical panel upgrades and replacements',
    'Lighting design and installation',
    'Electrical safety inspections and testing',
    'Generator installation and backup systems',
    'Smart home automation wiring',
    'Electrical fault finding and repairs'
  ];

  const certifications = [
    { name: 'NEMA Certified', desc: 'National Environmental Management Authority compliance', icon: '🌿' },
    { name: 'ERB Licensed', desc: 'Engineers Registration Board certified electricians', icon: '📜' },
    { name: 'OSHA Trained', desc: 'Occupational Safety and Health Administration standards', icon: '🛡️' },
    { name: 'ISO 9001:2015', desc: 'Quality management system certified', icon: '⭐' }
  ];

  const safetyFeatures = [
    { title: '100% Code Compliance', desc: 'All installations meet Kenya building codes and electrical regulations', icon: '📋' },
    { title: 'Quality Materials', desc: 'We use only certified electrical materials from reputable suppliers', icon: '🔧' },
    { title: 'Insurance Covered', desc: 'Fully insured workmanship with liability coverage', icon: '🛡️' },
    { title: 'Warranty Protection', desc: 'Comprehensive warranty on all installations and materials', icon: '📝' }
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
                <Zap size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Electrical Installation Services
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              Professional electrical solutions for homes and commercial buildings
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            WeBA Infinity Solutions provides comprehensive electrical installation services 
            for both residential and commercial properties. Our team of certified electricians 
            ensures safe, reliable, and code-compliant electrical systems that meet the 
            highest industry standards.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Electrical Services
            </h2>
            <p className="text-gray-500">Comprehensive electrical solutions for every need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-red-300 hover:shadow-md group"
              >
                <CheckCircle size={18} className="text-gray-400 group-hover:text-red-600 transition-colors flex-shrink-0" />
                <span className="text-gray-700 text-sm group-hover:text-gray-900">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Certifications & Qualifications
            </h2>
            <p className="text-gray-500">Recognized and trusted by industry authorities</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Compliance Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Safety & Compliance
            </h2>
            <p className="text-gray-500">Your safety is our top priority</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {safetyFeatures.map((safety, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {safety.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {safety.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {safety.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Schedule an Electrical Assessment
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Contact our certified electricians for a free site survey and quotation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
              Request Free Quote
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
              Call Now: 0718831298
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalWorks;