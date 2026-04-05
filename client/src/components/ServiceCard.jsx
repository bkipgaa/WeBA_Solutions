import React from 'react';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon, title, description, onClick, linkText = "Learn More" }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer 
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
                 group border border-gray-100"
    >
      <div className="p-5 md:p-6">
        {/* Icon */}
        {icon && (
          <div className="text-3xl md:text-4xl mb-3 md:mb-4">
            {icon}
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Link */}
        <div className="flex items-center text-red-600 text-sm font-semibold group-hover:gap-2 transition-all">
          <span>{linkText}</span>
          <ArrowRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;