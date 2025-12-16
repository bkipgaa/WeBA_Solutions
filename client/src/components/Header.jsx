import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    { id: 'broadband', name: 'Fixed Broadband Internet', path: '/services/broadband' },
    { id: 'hotspot', name: 'Hotspot Services', path: '/services/hotspot' },
    { id: 'electrical', name: 'Electrical Installation', path: '/services/electrical' },
    { id: 'cctv', name: 'CCTV Installation', path: '/services/cctv' },
    { id: 'solar', name: 'Solar Installation', path: '/services/solar' },
    { id: 'plc', name: 'PLC Design & Installation', path: '/services/plc' }
  ];

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <div className="logo-icon">⚡</div>
            <div className="logo-text">We<span>BA</span> Infinity Solutions</div>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><NavLink to="/" end>Home</NavLink></li>
            
            {/* Services Dropdown */}
            <li className="dropdown">
              <button 
                className="dropdown-toggle"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}
                   onMouseEnter={() => setIsServicesOpen(true)}
                   onMouseLeave={() => setIsServicesOpen(false)}>
                {services.map(service => (
                  <Link 
                    key={service.id} 
                    to={service.path}
                    className="dropdown-item"
                    onClick={() => {
                      setIsServicesOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </li>
            
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/coverage">Coverage</NavLink></li>
            <li><NavLink to="/careers">Careers</NavLink></li>
            <li><NavLink to="/support">Support</NavLink></li>
            <li>
              <Link to="/selfcare" className="btn btn-red">
                Self-care Portal
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;