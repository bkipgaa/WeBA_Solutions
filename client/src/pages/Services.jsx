// src/pages/Services.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    { icon: '🌐', title: 'Fixed Broadband Internet', description: 'High-speed fiber connections for homes and businesses', path: '/broadband' },
    { icon: '📡', title: 'Hotspot Service', description: 'Public WiFi solutions for commercial spaces', path: '/services/hotspot' },
    { icon: '⚡', title: 'Electrical Installation', description: 'Professional wiring and electrical service', path: '/services/electrical' },
    { icon: '📹', title: 'CCTV Installation', description: 'Advanced security and surveillance systems', path: '/services/cctv' },
    { icon: '☀️', title: 'Solar Installation', description: 'Complete solar power solutions', path: '/services/solar' },
    { icon: '🔧', title: 'PLC Design & Installation', description: 'Industrial automation and control systems', path: '/services/plc' }
  ];

  return (
    <PageLayout title="Our Core Services" subtitle="Comprehensive engineering and technology solutions tailored to your needs">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            onClick={() => navigate(service.path)}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Services;