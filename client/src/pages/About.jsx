import React from 'react';
import './About.css'

const About = () => {
  return (
    <div className="page-content">
      <div className="container">
        <h1>About WeBA Solutions Ltd</h1>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded with a vision to bridge the gap between engineering excellence 
              and reliable internet connectivity, WeBA Solutions Ltd has been serving 
              homes and businesses across the region for over a decade.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To deliver innovative, reliable, and integrated engineering and internet 
              solutions that empower businesses and enhance the quality of life for 
              our residential customers.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Reliability</h3>
                <p>Consistent and dependable service delivery</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Embracing new technologies and solutions</p>
              </div>
              <div className="value-item">
                <h3>Integrity</h3>
                <p>Honest and transparent in all dealings</p>
              </div>
              <div className="value-item">
                <h3>Customer Focus</h3>
                <p>Putting our clients' needs first</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> info@webasolutions.net</p>
              <p><strong>Phone:</strong> 0730 862 862</p>
              <p><strong>Support:</strong> support@poainternet.net</p>
              <p><strong>Sales:</strong> sales@poainternet.net</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;