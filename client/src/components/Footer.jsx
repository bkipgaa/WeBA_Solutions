import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>WeBA Solutions Ltd</h3>
            <p>
              Providing integrated engineering and internet solutions 
              for homes and businesses across the region.
            </p>
            
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/coverage">Coverage Areas</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><Link to="/support">Contact Support</Link></li>
              <li><Link to="/selfcare">Self-care Portal</Link></li>
              <li><Link to="/support">FAQs</Link></li>
              <li><Link to="/support">Technical Support</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy">Data Privacy Statement</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/acceptable-use">Acceptable Use Policy</Link></li>
              <li><Link to="/whistleblowing">Whistleblowing Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} WeBA Solutions Ltd. All rights reserved.</p>
          <p>
            Registered Office: Nairobi, Kenya | 
            Email: support@poainternet.net | 
            Phone: 0730762762
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;