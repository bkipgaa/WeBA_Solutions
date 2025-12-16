import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Zap, Camera, Cpu, ShoppingCart, Settings } from 'lucide-react';

const ProductCard = ({ product }) => {
  const getIcon = (id) => {
    switch(id) {
      case 'hotspot': return <Wifi />;
      case 'fixed-internet': return <Zap />;
      case 'electrical': return <Settings />;
      case 'cctv': return <Camera />;
      case 'control-panel': return <Cpu />;
      case 'sales': return <ShoppingCart />;
      default: return <Zap />;
    }
  };

  const getDescription = (id) => {
    switch(id) {
      case 'hotspot': return 'Reliable public WiFi solutions for businesses and public spaces';
      case 'fixed-internet': return 'High-speed broadband for homes and businesses with 24/7 support';
      case 'electrical': return 'Professional electrical installations and maintenance services';
      case 'cctv': return 'Advanced surveillance systems for security monitoring';
      case 'control-panel': return 'Custom control panel design for industrial applications';
      case 'sales': return 'High-quality networking and electrical equipment';
      default: return '';
    }
  };

  return (
    <div className="product-card">
      <div className="product-icon">
        {getIcon(product.id)}
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{getDescription(product.id)}</p>
        <Link to={`/products/${product.id}`} className="btn">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;