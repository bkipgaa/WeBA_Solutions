import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  CheckCircle, 
  Globe, 
  X, 
  ArrowLeft
} from 'lucide-react';
import PaymentGateway from '../../components/PaymentGateway';

const Broadband = () => {
  // State management for modals and forms
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [showPackageSelection, setShowPackageSelection] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    location: '',
    package: '',
    description: '',
    agreeTerms: false
  });

  // Features data
  const features = [
    { icon: '⚡', title: 'High-Speed Fiber', desc: 'Fiber optic connections' },
    { icon: '📊', title: 'Unlimited Data', desc: 'No throttling or caps' },
    { icon: '🛡️', title: '24/7 Support', desc: 'Round-the-clock assistance' },
    { icon: '🏢', title: 'Business Grade', desc: 'Dedicated enterprise lines' }
  ];

  // Broadband packages
  const broadbandPackages = [
    { 
      id: 'test-micro',
      name: 'Basic',
      displayName: 'Micro',
      speed: '1 Mbps',
      priceKES: 10,
      priceFormatted: 'KSh 10',
      popular: false,
      tag: 'TEST',
      description: 'For testing payments',
      devices: '1'
    },
    { 
      id: 'test-small',
      name: 'Standard',
      displayName: 'Small',
      speed: '2 Mbps',
      priceKES: 150,
      priceFormatted: 'KSh 150',
      popular: false,
      tag: 'TEST',
      description: 'For testing payments',
      devices: '1-2'
    },
    { 
      id: 'basic',
      name: 'Basic',
      displayName: 'Basic',
      speed: '5 Mbps',
      priceKES: 150,
      priceFormatted: 'KSh 150',
      popular: false,
      tag: 'Budget',
      description: 'Light browsing & email',
      devices: '1-2'
    },
    { 
      id: 'standard',
      name: 'Standard',
      displayName: 'Standard',
      speed: '10 Mbps',
      priceKES: 250,
      priceFormatted: 'KSh 250',
      popular: true,
      tag: 'Popular',
      description: 'Streaming & home office',
      devices: '3-5'
    },
    { 
      id: 'premium',
      name: 'Premium',
      displayName: 'Premium',
      speed: '20 Mbps',
      priceKES: 400,
      priceFormatted: 'KSh 400',
      popular: false,
      tag: 'High Speed',
      description: 'Gaming & 4K streaming',
      devices: '5-10'
    },
    { 
      id: 'business',
      name: 'Business',
      displayName: 'Business',
      speed: '50 Mbps',
      priceKES: 700,
      priceFormatted: 'KSh 700',
      popular: false,
      tag: 'Business',
      description: 'For small to medium businesses',
      devices: '10-20'
    },
    { 
      id: 'home-package',
      name: 'Home Package',
      displayName: 'Home',
      speed: '15 Mbps',
      priceKES: 300,
      priceFormatted: 'KSh 300',
      popular: false,
      tag: 'Family',
      description: 'Perfect for family use',
      devices: '3-6'
    }
  ];

  const benefits = [
    { title: 'Stable Connection', desc: 'Consistent speeds', icon: '📶' },
    { title: 'Low Latency', desc: 'Perfect for gaming', icon: '🎮' },
    { title: 'Reliable Uptime', desc: '99.9% guarantee', icon: '⏱️' },
    { title: 'Secure Network', desc: 'Advanced security', icon: '🔒' }
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
    if (!formData.firstName.trim()) {
      alert('Please enter your first name');
      return false;
    }
    if (!formData.lastName.trim()) {
      alert('Please enter your last name');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email address');
      return false;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!formData.location.trim()) {
      alert('Please enter your location/address');
      return false;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
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
      firstName: '', lastName: '', phone: '', email: '', location: '', package: '', description: '', agreeTerms: false
    });
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    handleCloseAll();
    alert(`Payment of KSh ${paymentData.amount} successful! Check your email for confirmation.`);
  };

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
                <Globe size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Fixed Broadband Internet
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              High-speed, reliable fiber internet for homes and businesses worldwide
            </p>
            
            {/* Header Stats */}
            <div className="flex justify-center gap-12 mt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">Instant</div>
                <div className="text-sm text-gray-500">Activation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 transition-all duration-300 hover:border-red-300 hover:shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Experience lightning-fast internet with our fiber optic broadband. Perfect for streaming, 
            gaming, remote work, and running your business smoothly. Get reliable connectivity with 
            guaranteed speeds and exceptional support.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Monthly WiFi Packages
            </h2>
            <p className="text-gray-500">Affordable monthly plans for reliable internet access</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {broadbandPackages.map((pkg, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative ${
                  pkg.popular ? 'ring-1 ring-gray-300' : ''
                }`}
                onClick={() => handlePackageClick(pkg)}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg z-10">
                    Popular
                  </div>
                )}
                
                {pkg.tag === 'TEST' && (
                  <div className="bg-amber-500 text-white text-center py-1 text-xs font-semibold">
                    🧪 TEST
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {pkg.displayName}
                    </h3>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Zap size={12} className="mr-1" />
                      <span>{pkg.speed}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {getFormattedPrice(pkg)}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">/mo</span>
                  </div>

                  <p className="text-gray-500 text-sm mb-3">{pkg.description}</p>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    📱 {pkg.devices} {parseInt(pkg.devices) === 1 ? 'device' : 'devices'}
                  </div>

                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs mb-4">
                    {pkg.tag}
                  </div>

                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-300">
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
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
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
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group">
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
            Ready to Upgrade?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Get lightning-fast fiber internet installed today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button onClick={handleOrderNowClick} className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-2">
              <Zap size={18} />
              <span>Order Now</span>
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
              Call: 0718831298
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>Free installation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>No contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} />
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals remain the same */}
      {/* Package Selection Modal */}
      {showPackageSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Choose Your Package</h2>
                <p className="text-gray-500 text-sm">Select a plan that fits your needs</p>
              </div>
              <button onClick={handleCloseAll} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {broadbandPackages.map((pkg) => (
                <div key={pkg.id} className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-red-400 ${selectedPackage?.id === pkg.id ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} onClick={() => handlePackageSelect(pkg)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{pkg.displayName}</h3>
                      <div className="flex items-center text-gray-500 text-sm"><Zap size={12} className="mr-1" />{pkg.speed}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{getFormattedPrice(pkg)}</div>
                      <div className="text-xs text-gray-400">/month</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>
                  <div className="flex justify-between items-center mt-2"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{pkg.tag}</span>{selectedPackage?.id === pkg.id && <span className="text-red-500 text-sm font-semibold">✓ Selected</span>}</div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-white border-t p-4">
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors" onClick={() => { if(selectedPackage) { setShowPackageSelection(false); setShowPackageForm(true); } else alert('Select a package'); }}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* Package Subscription Form Modal */}
      {showPackageForm && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <div><h2 className="text-lg font-bold text-gray-900">Complete Subscription</h2><p className="text-gray-500 text-sm">Fill your details for {selectedPackage.displayName}</p></div>
              <button onClick={handleCloseAll} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-5">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm mb-4" onClick={handleBackToSelection}><ArrowLeft size={16} /> Change Package</button>
              <div className="bg-gray-50 rounded-lg p-4 mb-5"><h3 className="font-semibold text-gray-900 mb-2">Selected Package</h3>
                <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">Package:</span><strong>{selectedPackage.displayName}</strong></div>
                <div className="flex justify-between"><span className="text-gray-500">Speed:</span><strong>{selectedPackage.speed}</strong></div>
                <div className="flex justify-between"><span className="text-gray-500">Price:</span><strong>{getFormattedPrice(selectedPackage)}/month</strong></div></div>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required /></div></div>
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="0718831298" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required /></div></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location/Address *</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter your full address" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required /></div>
                <div><textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Any special requirements..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} /></div>
                <div className="flex items-center gap-2"><input type="checkbox" id="terms" className="w-4 h-4 rounded" checked={formData.agreeTerms} onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})} required /><label htmlFor="terms" className="text-sm text-gray-600">I agree to the terms</label></div>
                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Proceed to Payment'}</button>
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

export default Broadband;