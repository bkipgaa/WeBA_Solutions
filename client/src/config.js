// config.js - Centralized configuration
const config = {
  // Company Info
  company: {
    name: process.env.REACT_APP_COMPANY_NAME || 'Weba Solutions',
    slogan: process.env.REACT_APP_COMPANY_SLOGAN || 'Your Technology Partner',
    website: process.env.REACT_APP_WEBSITE_URL || 'https://webasolutions.net'
  },
  
  // Contact Information
  contact: {
    supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'webasolution@gmail.com',
    salesEmail: process.env.REACT_APP_SALES_EMAIL || 'webasolution@gmail.com',
    infoEmail: process.env.REACT_APP_INFO_EMAIL || 'info@webasolutions.net',
    supportPhone: process.env.REACT_APP_SUPPORT_PHONE || '0712200198',
    emergencyPhone: process.env.REACT_APP_EMERGENCY_PHONE || '0712200198'
  },
  
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000
  },
  
  // Feature Flags
  features: {
    enableContactForm: process.env.REACT_APP_ENABLE_CONTACT_FORM === 'true',
    enableLiveChat: process.env.REACT_APP_ENABLE_LIVE_CHAT === 'true',
    maintenanceMode: process.env.REACT_APP_MAINTENANCE_MODE === 'true'
  },
  
  // Analytics
  analytics: {
    googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || null,
    facebookPixelId: process.env.REACT_APP_FACEBOOK_PIXEL_ID || null
  },
  
  // Security
  security: {
    sessionTimeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT) || 3600000
  }
};

export default config;