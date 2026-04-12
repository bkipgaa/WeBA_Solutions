// src/pages/services/Security.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle, 
  X, 
  ArrowLeft,
  
} from 'lucide-react';
import PaymentGateway from '../../components/PaymentGateway';

const Security = () => {
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', location: '',
    package: '', description: '', agreeTerms: false
  });

  // ✅ Security Packages – includes two test plans + all real plans
  const securityPackages = [
    // TEST PLANS (first two, for testing)
    { 
      id: 'starter-test-150', 
      name: 'Starter Shield',          // same name as real plan, but test price
      displayName: 'Starter Shield (Test 150)', 
      priceKES: 150, 
      priceFormatted: 'KSh 150', 
      tag: 'TEST', 
      description: 'For testing – 150 KES',
      devices: 'Test only'
    },
    { 
      id: 'starter-test-10', 
      name: 'Starter Shield',          // same name as real plan, but test price
      displayName: 'Starter Shield (Test 10)', 
      priceKES: 10, 
      priceFormatted: 'KSh 10', 
      tag: 'TEST', 
      description: 'For testing – 10 KES',
      devices: 'Test only'
    },
    // REAL PLANS
    { 
      id: 'starter', 
      name: 'Starter Shield', 
      displayName: 'Starter Shield', 
      priceKES: 1500, 
      priceFormatted: 'KSh 1,500', 
      tag: 'Basic', 
      description: 'Safe browsing & malware protection', 
      devices: 'All devices on Wi-Fi' 
    },
    { 
      id: 'home', 
      name: 'Home Shield', 
      displayName: 'Home Shield', 
      priceKES: 5000, 
      priceFormatted: 'KSh 5,000', 
      tag: 'Family', 
      description: 'Parental controls & safe search', 
      devices: 'Family protection' 
    },
    { 
      id: 'smart', 
      name: 'Smart Shield', 
      displayName: 'Smart Shield', 
      priceKES: 15000, 
      priceFormatted: 'KSh 15,000', 
      tag: 'Advanced', 
      description: 'View devices, block unknown users', 
      devices: 'Smart home ready' 
    },
    { 
      id: 'business', 
      name: 'Business Shield', 
      displayName: 'Business Shield', 
      priceKES: 30000, 
      priceFormatted: 'KSh 30,000', 
      tag: 'Business', 
      description: 'Firewall & intrusion detection', 
      devices: 'SMEs' 
    },
    { 
      id: 'elite', 
      name: 'Elite Shield', 
      displayName: 'Elite Shield', 
      priceKES: 50000, 
      priceFormatted: 'KSh 50,000', 
      tag: 'Enterprise', 
      description: 'Real-time monitoring & SLA', 
      devices: 'Corporates' 
    }
  ];

  // Security‑specific features
  const features = [
    { icon: '🛡️', title: 'Block Harmful Websites', desc: 'Malware, phishing & scam protection' },
    { icon: '👨‍👩‍👧‍👦', title: 'Parental Controls', desc: 'Protect your family online' },
    { icon: '🔒', title: 'Secure Wi-Fi', desc: 'Block unknown users' },
    { icon: '👁️', title: 'Usage Monitoring', desc: 'See who uses your network' }
  ];

  // Security benefits
  const benefits = [
    { title: 'Peace of Mind', desc: 'Browse without worry', icon: '🛡️' },
    { title: 'Child Safety', desc: 'Age‑appropriate content', icon: '👨‍👩‍👧‍👦' },
    { title: 'Cyber Threat Block', desc: 'Real‑time protection', icon: '🚫' },
    { title: 'Easy Management', desc: 'Control from your phone', icon: '📱' }
  ];

  const getFormattedPrice = (pkg) => pkg.priceFormatted;
  const getNumericPrice = (pkg) => pkg.priceKES;

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({ ...formData, package: pkg.name });
    setShowPackageForm(true);
  };

  const handleOrderNowClick = () => setShowPackageSelection(true);
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setFormData({ ...formData, package: pkg.name });
    setShowPackageSelection(false);
    setShowPackageForm(true);
  };
  const handleBackToSelection = () => {
    setShowPackageForm(false);
    setShowPackageSelection(true);
    setSelectedPackage(null);
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert('Full name required');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Phone required');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Valid email required');
      return false;
    }
    if (!formData.location.trim()) {
      alert('Location required');
      return false;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the terms');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setShowPaymentGateway(true);
      setShowPackageForm(false);
      setIsSubmitting(false);
    }, 500);
  };

  const handleCloseAll = () => {
    setShowPackageForm(false);
    setShowPackageSelection(false);
    setShowPaymentGateway(false);
    setSelectedPackage(null);
    setFormData({
      firstName: '', lastName: '', phone: '', email: '', location: '',
      package: '', description: '', agreeTerms: false
    });
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment success:', paymentData);
    handleCloseAll();
    alert(`Payment successful! Your activation code: ${paymentData.activationCode || 'sent to email'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section – Blue gradient */}
      <div className="bg-gradient-to-br from-blue-900 to-gray-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white text-sm transition-colors">
                ← Back to Home
              </Link>
            </div>

            <div className="inline-block bg-blue-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">🛡️ Smart Internet Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              WEBASECURE
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay Safe. Stay Fast. Stay in Control. Protect your home, business, and devices 
              from cyber threats with our powerful, affordable security solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={handleOrderNowClick}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Get Protected →
              </button>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">99.9%</div>
                <div className="text-sm text-gray-300">Threat Block Rate</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">24/7</div>
                <div className="text-sm text-gray-300">Monitoring</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">Instant</div>
                <div className="text-sm text-gray-300">Activation</div>
              </div>
              <div className="w-px h-12 bg-gray-600 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">30-Day</div>
                <div className="text-sm text-gray-300">Money Back</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 transition-all duration-300 hover:border-blue-300 hover:shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            WEBASECURE is a powerful, affordable internet security solution designed to protect 
            your home, business, and devices. Whether you are browsing, streaming, working, or 
            running a business — WEBASECURE keeps you safe from harmful websites, cyber threats, 
            and unauthorized access.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Monthly Subscription Plans
            </h2>
            <p className="text-gray-500">Choose the plan that fits your security needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {securityPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative ${
                  pkg.tag === 'TEST' ? 'ring-1 ring-amber-400' : ''
                }`}
                onClick={() => handlePackageClick(pkg)}
              >
                {pkg.tag === 'TEST' && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg z-10">
                    🧪 TEST
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {pkg.displayName}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Shield size={12} className="mr-1" />
                      <span>{pkg.tag}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {getFormattedPrice(pkg)}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">/month</span>
                  </div>

                  <p className="text-gray-500 text-sm mb-3">{pkg.description}</p>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    📱 {pkg.devices}
                  </div>

                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs mb-4">
                    {pkg.tag}
                  </div>

                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors duration-300">
                    Subscribe Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose WEBASECURE?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
            Ready to Secure Your Network?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Get protected today with WEBASECURE – simple, affordable, and built for everyday users.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button onClick={handleOrderNowClick} className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2">
              <Shield size={18} />
              <span>Get Protected</span>
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all duration-300">
              Call: 0718831298
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>30‑day money‑back</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>No long‑term contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>Instant activation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Package Selection Modal */}
      {showPackageSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Choose Your Security Plan</h2>
                <p className="text-gray-500 text-sm">Select a plan that fits your needs</p>
              </div>
              <button onClick={handleCloseAll} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {securityPackages.map((pkg) => (
                <div key={pkg.id} 
                  className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-blue-400 
                    ${selectedPackage?.id === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{pkg.displayName}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Shield size={12} className="mr-1" />{pkg.tag}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{getFormattedPrice(pkg)}</div>
                      <div className="text-xs text-gray-400">/month</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{pkg.tag}</span>
                    {selectedPackage?.id === pkg.id && <span className="text-blue-500 text-sm font-semibold">✓ Selected</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-white border-t p-4">
              <button 
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                onClick={() => {
                  if (selectedPackage) {
                    setShowPackageSelection(false);
                    setShowPackageForm(true);
                  } else {
                    alert('Please select a package');
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Subscription Form Modal */}
      {showPackageForm && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Complete Subscription</h2>
                <p className="text-gray-500 text-sm">Fill your details for {selectedPackage.displayName}</p>
              </div>
              <button onClick={handleCloseAll} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <button 
                className="flex items-center gap-2 text-gray-500 hover:text-blue-500 text-sm mb-4"
                onClick={handleBackToSelection}
              >
                <ArrowLeft size={16} /> Change Package
              </button>
              <div className="bg-gray-50 rounded-lg p-4 mb-5">
                <h3 className="font-semibold text-gray-900 mb-2">Selected Package</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Package:</span>
                    <strong>{selectedPackage.displayName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <strong>{getFormattedPrice(selectedPackage)}/month</strong>
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                      value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                      placeholder="0718831298" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location/Address *</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    placeholder="Enter your full address" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                </div>
                <div>
                  <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    placeholder="Any special requirements..." value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="w-4 h-4 rounded" 
                    checked={formData.agreeTerms} onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})} required />
                  <label htmlFor="terms" className="text-sm text-gray-600">I agree to the terms and conditions</label>
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50" 
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      {showPaymentGateway && selectedPackage && (
        <PaymentGateway
          email={formData.email}
          amount={getNumericPrice(selectedPackage)}
          packageName={selectedPackage.name}
          customerName={`${formData.firstName} ${formData.lastName}`}
          phone={formData.phone}
          location={formData.location}
          currency="KES"
          onSuccess={handlePaymentSuccess}
          onClose={handleCloseAll}
        />
      )}
    </div>
  );
};

export default Security;