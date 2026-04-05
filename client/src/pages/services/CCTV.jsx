import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const CCTVInstallation = () => {
  const solutions = [
    'HD & 4K CCTV camera systems',
    'IP network camera installation',
    'Wireless CCTV solutions',
    'Night vision & thermal cameras',
    'Remote monitoring setup',
    'Cloud storage & backup systems',
    'Mobile app integration',
    '24/7 monitoring services'
  ];

  const applications = [
    { type: 'Residential Security', desc: 'Home surveillance and perimeter protection', icon: '🏠' },
    { type: 'Commercial Security', desc: 'Business premises and retail security systems', icon: '🏢' },
    { type: 'Industrial Monitoring', desc: 'Factory and warehouse surveillance', icon: '🏭' },
    { type: 'Institutional Security', desc: 'Schools, hospitals, and government facilities', icon: '🏫' }
  ];

  const benefits = [
    { title: 'Crime Deterrence', desc: 'Visible cameras reduce criminal activity by up to 60%', icon: '🛡️' },
    { title: '24/7 Monitoring', desc: 'Round-the-clock surveillance with remote access', icon: '⏰' },
    { title: 'Evidence Collection', desc: 'High-quality recording for legal proceedings', icon: '📹' },
    { title: 'Insurance Benefits', desc: 'Potential premium reductions with installed security', icon: '📋' }
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
                <Camera size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              CCTV Security Systems
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              Advanced surveillance solutions for complete peace of mind
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 transition-all duration-300 hover:border-red-300 hover:shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Protect your property with our professional CCTV installation services. 
            We provide custom-designed surveillance systems that offer real-time monitoring, 
            remote access, and advanced security features for both residential and commercial clients.
          </p>
        </div>

        {/* Solutions Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our CCTV Solutions
            </h2>
            <p className="text-gray-500">Comprehensive security options for every need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-red-300 hover:shadow-md group"
              >
                <Camera size={18} className="text-gray-400 group-hover:text-red-600 transition-colors flex-shrink-0" />
                <span className="text-gray-700 text-sm group-hover:text-gray-900">{solution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Areas Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Application Areas
            </h2>
            <p className="text-gray-500">Tailored security for every environment</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((app, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {app.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {app.type}
                </h3>
                <p className="text-gray-500 text-sm">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Security Benefits
            </h2>
            <p className="text-gray-500">Why choose our CCTV solutions</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Secure Your Property Today
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Get a free security assessment and customized CCTV solution.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
              Book Security Audit
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
              View CCTV Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCTVInstallation;