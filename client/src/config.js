// config.js - Updated for your backend
const config = {
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isPreview: process.env.VERCEL_ENV === 'preview',
  
  // Vercel-specific info
  vercel: {
    url: process.env.VERCEL_URL || 'localhost:3000',
    env: process.env.VERCEL_ENV || 'development',
    deployment: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  },
  
  // Backend API URL
  api: {
    // Your backend URL
   // baseUrl: process.env.REACT_APP_API_URL || 'https://weba-payment.vercel.app/api',
    
    // Helper method for making API calls
    async call(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        ...options
      };
      
      try {
        console.log(`📡 API Call: ${url}`);
        const response = await fetch(url, defaultOptions);
        const data = await response.json();
        
        if (!response.ok) {
          return { success: false, error: data.message || 'API request failed', status: response.status };
        }
        
        return { success: true, data };
      } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        return { success: false, error: error.message };
      }
    },
    
    // Payment endpoints
    endpoints: {
      health: '/health',
      healthDetails: '/health/details',
      initializePaystack: '/initialize-paystack-payment',
      initializePaypal: '/initialize-paypal-payment',
      verifyPaystack: (reference) => `/verify-paystack-payment/${reference}`,
      capturePaypal: '/capture-paypal-payment',
      transactionStatus: (reference) => `/transaction-status/${reference}`
    }
  },
  
  // Company Info
  company: {
    name: process.env.REACT_APP_COMPANY_NAME || 'Weba Solutions',
    slogan: process.env.REACT_APP_COMPANY_SLOGAN || 'Powering Homes & Businesses with Excellence',
    website: process.env.REACT_APP_WEBSITE_URL || 'https://we-ba-solutions-branch.vercel.app'
  },
  
  // Contact Information
  contact: {
    supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@webasolutions.net',
    salesEmail: process.env.REACT_APP_SALES_EMAIL || 'sales@webasolutions.net',
    infoEmail: process.env.REACT_APP_INFO_EMAIL || 'info@webasolutions.net',
    supportPhone: process.env.REACT_APP_SUPPORT_PHONE || '0718831298',
    emergencyPhone: process.env.REACT_APP_EMERGENCY_PHONE || '0718831298',
    whatsappNumber: process.env.REACT_APP_WHATSAPP_NUMBER || '254718831298',
    whatsappMessage: process.env.REACT_APP_WHATSAPP_MESSAGE || 'Hello%20Weba%20Solutions%2C%20I%20need%20assistance%20with%20your%20services.'
  },
  
  // Payment Configuration
  payments: {
    paystack: {
      publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_7a0fc41d34b883917d5e07e637557a108b015031',
      initializeEndpoint: '/initialize-paystack-payment',
      verifyEndpoint: '/verify-paystack-payment'
    },
    paypal: {
      clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'AT_Gv_AeiXeuyxiUjM9eQoWY_3-fZjkMEknCgbiZoxkDZw7zAc-_EIfVfJ_T0aLhc6XZLdTumxJy3d7T',
      initializeEndpoint: '/initialize-paypal-payment',
      captureEndpoint: '/capture-paypal-payment'
    },
    transactionStatusEndpoint: '/transaction-status'
  },
  
  // Features
  features: {
    enableContactForm: true,
    enableLiveChat: false,
    maintenanceMode: false,
    enablePaystack: true,
    enablePaypal: true,
    isPreviewDeployment() {
      return process.env.VERCEL_ENV === 'preview';
    }
  },
  
  // WhatsApp Helper
  whatsapp: {
    getWhatsAppLink(number = null, message = null) {
      const phone = this.formatWhatsAppNumber(number || config.contact.whatsappNumber);
      const msg = message || config.contact.whatsappMessage;
      return `https://wa.me/${phone}${msg ? `?text=${msg}` : ''}`;
    },

    formatWhatsAppNumber(phone) {
      if (!phone) return '';
      const cleaned = phone.toString().replace(/[^\d+]/g, '');
      if (cleaned.startsWith('0')) return `254${cleaned.substring(1)}`;
      if (cleaned.startsWith('+254')) return cleaned.substring(1);
      if (cleaned.startsWith('254')) return cleaned;
      return cleaned;
    },

    formatPhoneDisplay(phone) {
      if (!phone) return '';
      const num = phone.toString();
      if (num.startsWith('254')) return `0${num.substring(3)}`;
      if (num.length === 9) return `${num.substring(0, 3)} ${num.substring(3, 6)} ${num.substring(6)}`;
      if (num.length === 10) return `${num.substring(0, 4)} ${num.substring(4, 7)} ${num.substring(7)}`;
      return num;
    }
  },
  
  getDebugInfo() {
    return {
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelUrl: process.env.VERCEL_URL,
      backendUrl: this.api.baseUrl,
      buildTime: new Date().toISOString(),
      paymentsEnabled: {
        paystack: this.features.enablePaystack,
        paypal: this.features.enablePaypal
      }
    };
  }
};

// Log debug info in development
if (process.env.NODE_ENV === 'development') {
  console.log('Config loaded:', config.getDebugInfo());
}

export default config;