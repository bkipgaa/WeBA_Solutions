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
    supportPhone: process.env.REACT_APP_SUPPORT_PHONE || '0712200198',
    emergencyPhone: process.env.REACT_APP_EMERGENCY_PHONE || '0712200198'
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
  
  // Debug info
  getDebugInfo() {
    return {
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelUrl: process.env.VERCEL_URL,
      buildTime: new Date().toISOString(),
      apiAvailable: this.api.isAvailable()
    };
  }
};

// Log debug info in development
if (process.env.NODE_ENV === 'development') {
  console.log('Config loaded:', config.getDebugInfo());
}

export default config;