// src/pages/services/Security.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

  const securityPackages = [
    { id: 'starter', name: 'Starter Shield', displayName: 'Starter Shield', priceKES: 1500, priceFormatted: 'KSh 1,500', tag: 'Basic', description: 'Safe browsing & malware protection', devices: 'All devices on Wi-Fi' },
    { id: 'home', name: 'Home Shield', displayName: 'Home Shield', priceKES: 5000, priceFormatted: 'KSh 5,000', tag: 'Family', description: 'Parental controls & safe search', devices: 'Family protection' },
    { id: 'smart', name: 'Smart Shield', displayName: 'Smart Shield', priceKES: 15000, priceFormatted: 'KSh 15,000', tag: 'Advanced', description: 'View devices, block unknown users', devices: 'Smart home ready' },
    { id: 'business', name: 'Business Shield', displayName: 'Business Shield', priceKES: 30000, priceFormatted: 'KSh 30,000', tag: 'Business', description: 'Firewall & intrusion detection', devices: 'SMEs' },
    { id: 'elite', name: 'Elite Shield', displayName: 'Elite Shield', priceKES: 50000, priceFormatted: 'KSh 50,000', tag: 'Enterprise', description: 'Real-time monitoring & SLA', devices: 'Corporates' }
  ];

  const getNumericPrice = (pkg) => pkg.priceKES;
  const getFormattedPrice = (pkg) => pkg.priceFormatted;

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
    if (!formData.firstName.trim() || !formData.lastName.trim()) return alert('Full name required');
    if (!formData.phone.trim()) return alert('Phone required');
    if (!formData.email.trim() || !formData.email.includes('@')) return alert('Valid email required');
    if (!formData.location.trim()) return alert('Location required');
    if (!formData.agreeTerms) return alert('Agree to terms');
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
    setFormData({ firstName: '', lastName: '', phone: '', email: '', location: '', package: '', description: '', agreeTerms: false });
  };
  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment success:', paymentData);
    handleCloseAll();
    // Show activation code from paymentData (if backend returns it)
    alert(`Payment successful! Your activation code: ${paymentData.activationCode || 'sent to email'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-gray-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/" className="absolute top-6 left-6 text-white/80 hover:text-white text-sm">← Back to Home</Link>
          <div className="inline-block bg-blue-500/20 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">🛡️ Smart Internet Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">WEBASECURE</h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">Stay Safe. Stay Fast. Stay in Control.</p>
          <p className="text-gray-300 mb-8">Protect your home, business, and devices from cyber threats.</p>
          <button onClick={handleOrderNowClick} className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">Get Protected →</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Monthly Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {securityPackages.map((pkg) => (
            <div key={pkg.id} onClick={() => handlePackageClick(pkg)} className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-2">{pkg.displayName}</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">{getFormattedPrice(pkg)}<span className="text-sm font-normal text-gray-500">/month</span></div>
              <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{pkg.tag}</span>
              <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-600 transition">Select Plan</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modals - same as Broadband but with security packages */}
      {showPackageSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-4 border-b flex justify-between"><h2 className="font-bold">Choose Security Plan</h2><button onClick={handleCloseAll}>✕</button></div>
            <div className="p-4 space-y-3">
              {securityPackages.map(pkg => (
                <div key={pkg.id} className={`border rounded-lg p-3 cursor-pointer ${selectedPackage?.id === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePackageSelect(pkg)}>
                  <div className="flex justify-between"><span className="font-semibold">{pkg.displayName}</span><span className="font-bold">{getFormattedPrice(pkg)}</span></div>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t"><button className="w-full bg-gray-900 text-white py-2 rounded-lg" onClick={() => { if(selectedPackage) { setShowPackageSelection(false); setShowPackageForm(true); } else alert('Select a package'); }}>Continue</button></div>
          </div>
        </div>
      )}

      {showPackageForm && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b"><h2 className="font-bold">Complete Subscription</h2><button onClick={handleCloseAll}>✕</button></div>
            <div className="p-5">
              <button onClick={handleBackToSelection} className="text-blue-600 text-sm mb-4 flex items-center"><ArrowLeft size={16} /> Change Package</button>
              <div className="bg-gray-50 p-3 rounded mb-4"><strong>{selectedPackage.displayName}</strong> – {getFormattedPrice(selectedPackage)}/month</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3"><input type="text" placeholder="First Name" className="border p-2 rounded" value={formData.firstName} onChange={e=>setFormData({...formData, firstName:e.target.value})} required/><input type="text" placeholder="Last Name" className="border p-2 rounded" value={formData.lastName} onChange={e=>setFormData({...formData, lastName:e.target.value})} required/></div>
                <input type="tel" placeholder="Phone" className="w-full border p-2 rounded" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} required/>
                <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} required/>
                <input type="text" placeholder="Location/Address" className="w-full border p-2 rounded" value={formData.location} onChange={e=>setFormData({...formData, location:e.target.value})} required/>
                <textarea placeholder="Special requirements" rows="2" className="w-full border p-2 rounded" value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})}></textarea>
                <label className="flex items-center"><input type="checkbox" checked={formData.agreeTerms} onChange={e=>setFormData({...formData, agreeTerms:e.target.checked})} className="mr-2"/> I agree to terms</label>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-600">{isSubmitting ? 'Processing...' : 'Proceed to Payment'}</button>
              </form>
            </div>
          </div>
        </div>
      )}

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