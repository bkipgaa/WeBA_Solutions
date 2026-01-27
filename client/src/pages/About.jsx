import React from 'react';
import './About.css'

const About = () => {
  return (
    <div className="page-content">
      <div className="container">
        <h1>About WeBA Solutions Ltd</h1>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Vision</h2>
            <p>
              To be Africa’s most trusted and innovative technology and engineering solutions provider, bridging connectivity, renewable energy, and smart systems to empower people, businesses, and governments across the continent.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To deliver affordable, scalable, and sustainable connectivity and engineering solutions that transform communities, enable enterprises, and drive Africa’s participation in the global digital economy.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Pioneering technologies tailored to African challenges, such as affordable IoT for agriculture and urban management</p>
              </div>
              <div className="value-item">
                <h3>Integrity</h3>
                <p>Upholding trust, transparency, and ethical practices in all operations.</p>
              </div>
              <div className="value-item">
                <h3>Customer-Centricity</h3>
                <p>Prioritizing customer success through customized solutions and responsive support.</p>
              </div>
              <div className="value-item">
                <h3>Excellence:</h3>
                <p>Delivering reliable, high-quality solutions that meet international standards.</p>
              </div>
              <div className="value-item">
                <h3>Sustainability</h3>
                <p>Promoting renewable energy integration and socio-economic inclusion to achieve net-zero goals.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> webasolutions@gmail.com</p>
              <p><strong>Phone:</strong> 0718831298</p>
              <p><strong>Support:</strong> webasolutions@gmail.com</p>
              <p><strong>Sales:</strong> webasolutions@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;