import React from 'react';

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Optional Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {title && (
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;