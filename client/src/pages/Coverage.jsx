import React from 'react';
import './Coverage.css'

const Coverage = () => {
  const coverageAreas = [
    { area: 'Mombasa', status: 'Full Coverage', color: 'green' },
    { area: 'Kilifi', status: 'Full Coverage', color: 'green' },
    { area: 'Nairobi', status: 'Expanding', color: 'orange' },
    { area: 'Kisumu', status: 'Coming Soon', color: 'blue' },
    { area: 'Nakuru', status: 'Coming Soon', color: 'blue' },
    { area: 'Eldoret', status: 'Coming Soon', color: 'blue' },
    { area: 'Thika', status: 'Coming Soon', color: 'blue' },
    { area: 'Naivasha', status: 'Coming Soon', color: 'blue' }
  ];

  const counties = [
    { name: 'Mombasa County', status: 'Fully Operational', description: 'Our primary service hub with full coverage', zones: 12 },
    { name: 'Kilifi County', status: 'Expanding', description: 'Growing network with reliable service', zones: 8 }
  ];

  const mombasaZones = ['Nyali', 'Kisauni', 'Likoni', 'Mvita', 'Changamwe', 'Jomvu'];
  const kilifiZones = ['Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Magarini'];

  return (
    <div className="page-content">
      <div className="container">
        <h1>Service Coverage Areas</h1>
        
        <div className="coverage-intro">
          <p>
            We are currently based in Mombasa and Kilifi counties, providing reliable 
            internet services across the Coastal region. Our network is expanding to 
            serve more areas across Kenya.
          </p>
        </div>

        {/* County Visualization */}
        <div className="county-visualization">
          <h3>Our Primary Service Counties</h3>
          <div className="county-cards">
            {counties.map((county, index) => (
              <div key={index} className={`county-card ${index === 0 ? 'featured' : ''}`}>
                <h4>{county.name}</h4>
                <p>{county.description}</p>
                <div className="county-status">{county.status}</div>
                <p className="zones-count">{county.zones} Service Zones</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Zones */}
        <div className="service-zones">
          <div className="zone-card">
            <h4>Mombasa Service Zones</h4>
            <div className="zone-areas">
              {mombasaZones.map((zone, index) => (
                <span key={index} className="zone-area">{zone}</span>
              ))}
            </div>
          </div>
          <div className="zone-card">
            <h4>Kilifi Service Zones</h4>
            <div className="zone-areas">
              {kilifiZones.map((zone, index) => (
                <span key={index} className="zone-area">{zone}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="coverage-map">
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-color green"></span>
              <span>Full Coverage (Mombasa & Kilifi)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color orange"></span>
              <span>Expanding Coverage</span>
            </div>
            <div className="legend-item">
              <span className="legend-color blue"></span>
              <span>Coming Soon</span>
            </div>
          </div>
          <div className="map-info">
            <p>🌟 Mombasa County is our main operational base with the most extensive coverage.</p>
            <p>📈 Kilifi County is our expanding area with growing infrastructure.</p>
          </div>
        </div>

        <div className="coverage-list">
          <h2>Areas We Serve & Plan to Serve</h2>
          <div className="areas-grid">
            {coverageAreas.map((area, index) => (
              <div key={index} className="area-card">
                <h3>{area.area}</h3>
                <span className={`status status-${area.color}`}>
                  {area.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="coverage-request">
          <h2>Request Service in Your Area</h2>
          <p>
            Want our services in your location? Fill out our coverage request form 
            and we'll prioritize expansion based on demand. Currently focusing on 
            Coastal region expansion.
          </p>
          <button className="btn btn-primary">
            Request Coverage Expansion
          </button>
          <div className="contact-info">
            <p>📞 Mombasa Office: 020 123 4567</p>
            <p>📧 coverage@yourcompany.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;