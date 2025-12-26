import React, { useState, useEffect } from 'react';
import './contactmodel.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: '',
    package: '',
    description: ''
  });

  const services = [
    { value: 'CCTV Installation', label: 'CCTV Installation' },
    { value: 'Electrical Installation', label: 'Electrical Installation' },
    { value: 'Solar Installation', label: 'Solar Installation' },
    { value: 'Fixed Broadband Internet', label: 'Fixed Broadband Internet' },
    { value: 'Hotspot Installation', label: 'Hotspot Installation in Your Building' },
    { value: 'PLC Design & Installation', label: 'PLC Design & Installation' },
    { value: 'Other', label: 'Other' }
  ];

  const wifiPackages = [
    {
      id: 'wifi-swift',
      name: 'WiFi Swift',
      speed: '5Mbps',
      price: 'Ksh 1,500.00',
      description: 'Perfect for basic browsing and email'
    },
    {
      id: 'wifi-plus',
      name: 'WiFi Plus',
      speed: '10 Mbps',
      price: 'Ksh 2,000.00',
      description: 'Great for streaming and remote work'
    },
    {
      id: 'wifi-turbo',
      name: 'WiFi Turbo',
      speed: '15Mbps',
      price: 'Ksh 3,000.00',
      description: 'Ideal for gaming and multiple devices'
    }
  ];

  // Reset package when service changes
  useEffect(() => {
    if (formData.service !== 'Fixed Broadband Internet') {
      setFormData(prev => ({ ...prev, package: '' }));
    }
  }, [formData.service]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xlgergee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          fullName: `${formData.firstName} ${formData.lastName}`,
          _subject: `Service Inquiry: ${formData.service}${formData.package ? ` - ${formData.package}` : ''}`,
          _replyto: formData.email
        })
      });
      
      if (response.ok) {
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          service: '',
          package: '',
          description: ''
        });
        alert('Thank you! Your message has been sent. We will contact you within 24 hours.');
        onClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal-container">
        <div className="contact-modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">Get In Touch</h2>
            <p className="modal-subtitle">Fill out the form below and our team will contact you within 24 hours</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <span>×</span>
          </button>
        </div>
        
        <form className="contact-modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="form-input"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
                placeholder="Enter your first name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="form-input"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                placeholder="e.g., 0730 862 862"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="service" className="form-label">
              Service Interested In <span className="required">*</span>
            </label>
            <select
              id="service"
              className="form-select"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option 
                  key={service.value} 
                  value={service.value}
                  style={{
                    color: '#10b981',
                    fontWeight: '500',
                    padding: '12px'
                  }}
                >
                  {service.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* WiFi Packages Section - Only shown when Fixed Broadband is selected */}
          {formData.service === 'Fixed Broadband Internet' && (
            <div className="packages-section">
              <div className="packages-header">
                <h3 className="packages-title">Monthly WiFi Packages</h3>
                <p className="packages-subtitle">Affordable monthly plans for reliable internet access</p>
              </div>
              
              <div className="packages-grid">
                {wifiPackages.map((pkg) => (
                  <div 
                    key={pkg.id}
                    className={`package-card ${formData.package === pkg.name ? 'package-selected' : ''}`}
                    onClick={() => setFormData({...formData, package: pkg.name})}
                  >
                    <div className="package-header">
                      <h4 className="package-name">{pkg.name}</h4>
                      <div className="package-speed">{pkg.speed}</div>
                    </div>
                    
                    <div className="package-price">
                      {pkg.price}
                      <span className="price-period">per month</span>
                    </div>
                    
                    <p className="package-description">{pkg.description}</p>
                    
                    <div className="package-actions">
                      <button 
                        type="button"
                        className="select-package-btn"
                        onClick={() => setFormData({...formData, package: pkg.name})}
                      >
                        {formData.package === pkg.name ? '✓ Selected' : 'Select Package'}
                      </button>
                    </div>
                    
                    {formData.package === pkg.name && (
                      <div className="selected-indicator">
                        <span className="checkmark">✓</span>
                        Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {formData.package && (
                <div className="selected-package-info">
                  <span className="selected-label">Selected Package:</span>
                  <span className="selected-value">{formData.package}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Project Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              className="form-textarea"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please describe your project requirements, location, timeline, and any specific needs..."
              required
            ></textarea>
          </div>
          
          <div className="form-footer">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
            
            <p className="form-note">
              By submitting this form, you agree to our privacy policy and consent to be contacted by WeBA Solutions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;