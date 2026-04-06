import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Clock, Zap, CheckCircle } from 'lucide-react';

const Hotspot = () => {
  const solutions = [
    { type: 'Hotel WiFi', desc: 'Guest internet with room-based access', icon: '🏨' },
    { type: 'Restaurant WiFi', desc: 'Customer WiFi with marketing integration', icon: '🍽️' },
    { type: 'Shopping Mall', desc: 'Public WiFi with sponsor branding', icon: '🛍️' },
    { type: 'Office Building', desc: 'Secure guest network for visitors', icon: '🏢' },
    { type: 'Student Hostels', desc: 'Affordable packages for campus students', icon: '🎓' },
    { type: 'Campus WiFi', desc: 'High-speed internet for educational institutions', icon: '🏫' }
  ];

  const hotspotpackages = [
    { name: 'Diamond Day', speed: '8Mbps', price: 'Ksh 50.00', duration: '1 Day', popular: false, tag: 'Full Day' },
    { name: 'Bronze Pass', speed: '4Mbps', price: 'Ksh 10.00', duration: '1 Hour', popular: false, tag: 'Quick Access' },
    { name: 'Silver Boost', speed: '4Mbps', price: 'Ksh 20.00', duration: '3 Hours', popular: false, tag: 'Best Seller' },
    { name: 'Gold Access', speed: '5Mbps', price: 'Ksh 30.00', duration: '6 Hours', popular: true, tag: 'Most Popular' },
    { name: 'Platinum Surf', speed: '5Mbps', price: 'Ksh 40.00', duration: '12 Hours', popular: false, tag: 'Extended Use' },
    { name: 'Triple Ruby', speed: '8Mbps', price: 'Ksh 100.00', duration: '3 Days', popular: true, tag: 'Value Pack' },
    { name: 'Seven Days', speed: '10Mbps', price: 'Ksh 150.00', duration: '7 Days', popular: false, tag: 'Weekly Plan' },
    { name: '14 Days - 2 Devices', speed: '10Mbps', price: 'Ksh 300.00', duration: '14 Days', popular: true, tag: 'Multi-Device' },
    { name: '21 Days packages', speed: '10Mbps', price: 'Ksh 250.00', duration: '21 Days', popular: false, tag: 'Long Term' },
    { name: 'One Month - 2 Users', speed: '10Mbps', price: 'Ksh 500.00', duration: '1 Month', popular: true, tag: 'Premium' }
  ];

  const features = [
    'Instant activation after payment',
    '24/7 customer support',
    'No long-term contracts',
    'Unlimited data usage',
    'Secure connection',
    'Easy voucher system',
    'Auto-login option',
    'Usage statistics'
  ];

  // Scroll to packages section when clicking "Browse Packages"
  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages-section');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Styled exactly like Home page */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back to Home Link - positioned absolute */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white text-sm transition-colors">
                ← Back to Home
              </Link>
            </div>

            <div className="inline-block bg-white/10 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">⚡ Trusted Since 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Hotspot & Public WiFi
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Affordable, flexible WiFi packages for students, plus enterprise-grade solutions 
              for businesses. Instant activation, no contracts, and 24/7 support.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={scrollToPackages}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Browse Packages →
              </button>
              <Link 
                to="/coverage" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                Check Coverage Areas
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">10+</div>
                <div className="text-sm text-gray-300">Package Options</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-300">Student Support</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">Instant</div>
                <div className="text-sm text-gray-300">Activation</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">No Contracts</div>
                <div className="text-sm text-gray-300">Pay as you go</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Perfect for Campus Students
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We understand student needs - that's why we offer flexible, affordable WiFi packages 
            specifically designed for hostel living. Choose from hourly, daily, weekly, or monthly 
            plans that fit your schedule and budget.
          </p>
        </div>

        {/* Hotspot Packages Grid - added id for scrolling */}
        <div id="packages-section" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">WiFi Packages</h2>
            <p className="text-gray-500">Choose the perfect plan for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {hotspotpackages.map((pkg, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative ${
                  pkg.popular ? 'ring-1 ring-gray-300' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg z-10">
                    🔥 Popular
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                    {pkg.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Zap size={14} className="mr-1" />
                      <span>{pkg.speed}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {pkg.price}
                    </span>
                  </div>
                  
                  <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mb-3">
                    {pkg.tag}
                  </div>
                  
                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Our Hotspot Service?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all duration-300 group">
                <CheckCircle size={18} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                <span className="text-gray-700 text-sm group-hover:text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Professional Solutions
            </h2>
            <p className="text-gray-500">Enterprise-grade WiFi solutions for various businesses</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-6 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {solution.type}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {solution.desc}
                </p>
                <button className="text-gray-900 font-semibold text-sm inline-flex items-center gap-1 group-hover:text-red-600 group-hover:gap-2 transition-all">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Need Help Choosing a Package?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Our student support team is here to help you select the perfect WiFi plan for your needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button onClick={scrollToPackages} className="bg-white text-gray-900 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2">
              <Wifi size={16} />
              <span>Browse All Packages</span>
            </button>
            <button className="border border-white text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
              Contact Support
            </button>
            <button className="border border-white text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
              Download Brochure
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              <span>Instant activation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              <span>24/7 student support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspot;