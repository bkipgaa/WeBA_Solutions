import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const services = [
    { id: 'broadband', name: 'Fixed Broadband Internet', path: '/services/broadband' },
    { id: 'hotspot', name: 'Hotspot Services', path: '/services/hotspot' },
    { id: 'electrical', name: 'Electrical Installation', path: '/services/electrical' },
    { id: 'cctv', name: 'CCTV Installation', path: '/services/cctv' },
    { id: 'solar', name: 'Solar Installation', path: '/services/solar' },
    { id: 'plc', name: 'Networking', path: '/services/plc' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform duration-300">
              ⚡
            </div>
            <div className="text-lg font-bold text-gray-900">
              We<span className="text-emerald-600">BA</span> Infinity Solutions
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-emerald-600 font-semibold' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`
              }
            >
              Home
            </NavLink>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                  isServicesOpen 
                    ? 'text-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <span>Services</span>
                <svg 
                  className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={service.path}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border-l-2 border-transparent hover:border-emerald-500 mx-2 rounded"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {['About', 'Coverage', 'Careers', 'Support'].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}

            <Link
              to="/selfcare"
              className="ml-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Self-care Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full overflow-y-auto">
          <div className="px-4 pt-5 pb-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white text-xl">
                  ⚡
                </div>
                <div className="text-lg font-bold text-gray-900">
                  We<span className="text-emerald-600">BA</span> Infinity
                </div>
              </Link>
            </div>
          </div>

          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) => 
                `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            {/* Mobile Services Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center justify-between w-full px-3 py-3 rounded-md text-base font-medium text-left ${
                  isServicesOpen 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                }`}
              >
                <span>Services</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="ml-4 pl-2 border-l-2 border-emerald-200 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={service.path}
                      className="block px-3 py-2.5 rounded-md text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsServicesOpen(false);
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {['About', 'Coverage', 'Careers', 'Support'].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => 
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}

            <div className="pt-4 px-3">
              <Link
                to="/selfcare"
                className="block w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Self-care Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;