// config.js - Optimized for Vercel
const config = {
  // Environment - Vercel automatically sets NODE_ENV
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isPreview: process.env.VERCEL_ENV === 'preview',
  
  // Vercel-specific info
  vercel: {
    url: process.env.VERCEL_URL || 'localhost:3000',
    env: process.env.VERCEL_ENV || 'development',
    deployment: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  },
  
  // Company Info
  company: {
    name: process.env.REACT_APP_COMPANY_NAME || 'Weba Solutions',
    slogan: process.env.REACT_APP_COMPANY_SLOGAN || 'Your Technology Partner',
    website: process.env.REACT_APP_WEBSITE_URL || 'https://webasolutions.vercel.app'
  },
  
  // Contact Information
  contact: {
    supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'webasolution@gmail.com',
    salesEmail: process.env.REACT_APP_SALES_EMAIL || 'webasolution@gmail.com',
    infoEmail: process.env.REACT_APP_INFO_EMAIL || 'info@webasolutions.net',
    supportPhone: process.env.REACT_APP_SUPPORT_PHONE || '+254730762762',
    emergencyPhone: process.env.REACT_APP_EMERGENCY_PHONE || '+254730762762',
    whatsappNumber: process.env.REACT_APP_WHATSAPP_NUMBER || '0730762762', // Added WhatsApp number
    whatsappMessage: process.env.REACT_APP_WHATSAPP_MESSAGE || 'Hello%20Weba%20Solutions%2C%20I%20need%20assistance%20with%20your%20services.' // Optional: Pre-filled message
  },
  
  // API Configuration - For Vercel (static site)
  api: {
    // On Vercel, backend is separate. Use environment variable or relative path
    getBaseUrl() {
      // If we have a custom API URL, use it
      if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
      }
      
      // In development, use localhost
      if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000/api';
      }
      
      // In production on Vercel, you'll need to specify your backend URL
      // Example: 'https://webasolutions-backend.onrender.com/api'
      return '/api'; // This assumes you'll add a backend later
    },
    
    // Check if API is available
    isAvailable() {
      return !!process.env.REACT_APP_API_URL || this.getBaseUrl() !== '/api';
    }
  },
  
  // Feature Flags
  features: {
    enableContactForm: process.env.REACT_APP_ENABLE_CONTACT_FORM !== 'false',
    enableLiveChat: process.env.REACT_APP_ENABLE_LIVE_CHAT === 'true',
    maintenanceMode: process.env.REACT_APP_MAINTENANCE_MODE === 'true',
    
    // For Vercel preview deployments
    isPreviewDeployment() {
      return process.env.VERCEL_ENV === 'preview';
    }
  },
  
  // Analytics - Vercel Analytics is built-in
  analytics: {
    vercelAnalytics: process.env.REACT_APP_VERCEL_ANALYTICS_ID || null,
    googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || null
  },

  // WhatsApp utility functions
  whatsapp: {
    // Generate WhatsApp link
    getWhatsAppLink(number = null, message = null) {
      const phone = this.formatWhatsAppNumber(number || config.contact.whatsappNumber);
      const msg = message || config.contact.whatsappMessage;
      return `https://wa.me/${phone}${msg ? `?text=${msg}` : ''}`;
    },

    // Format phone number for WhatsApp (international format)
    formatWhatsAppNumber(phone) {
      if (!phone) return '';
      
      // Remove all non-digit characters except plus sign
      const cleaned = phone.toString().replace(/[^\d+]/g, '');
      
      // If starts with 0, convert to +254
      if (cleaned.startsWith('0')) {
        return `+254${cleaned.substring(1)}`;
      }
      
      // If starts with +254, keep as is
      if (cleaned.startsWith('+254')) {
        return cleaned;
      }
      
      // If starts with 254, add plus
      if (cleaned.startsWith('254')) {
        return `+${cleaned}`;
      }
      
      // Default - just return cleaned
      return cleaned;
    },

    // Format phone number for display
    formatPhoneDisplay(phone) {
      if (!phone) return '';
      
      const num = phone.toString();
      
      // Remove +254 prefix and replace with 0
      if (num.startsWith('+254')) {
        return `0${num.substring(4)}`;
      }
      
      // If starts with 254, replace with 0
      if (num.startsWith('254')) {
        return `0${num.substring(3)}`;
      }
      
      // For local numbers, ensure they have spaces for readability
      if (num.length === 9) {
        return `${num.substring(0, 3)} ${num.substring(3, 6)} ${num.substring(6)}`;
      }
      
      if (num.length === 10) {
        return `${num.substring(0, 4)} ${num.substring(4, 7)} ${num.substring(7)}`;
      }
      
      return num;
    }
  },
  
  // Debug info
  getDebugInfo() {
    return {
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelUrl: process.env.VERCEL_URL,
      buildTime: new Date().toISOString(),
      apiAvailable: this.api.isAvailable(),
      whatsappConfigured: !!this.contact.whatsappNumber
    };
  }
};

// Log debug info in development
if (process.env.NODE_ENV === 'development') {
  console.log('Config loaded:', config.getDebugInfo());
}

export default config;