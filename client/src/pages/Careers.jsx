import React from 'react';

const Careers = () => {
  const jobOpenings = [
    {
      title: 'Network Engineer',
      department: 'Technical',
      location: 'Nairobi',
      type: 'Full-time'
    },
    {
      title: 'Electrical Technician',
      department: 'Engineering', 
      location: 'Mombasa',
      type: 'Full-time'
    },
    {
      title: 'Customer Support Agent',
      department: 'Support',
      location: 'Nairobi',
      type: 'Full-time'
    },
    {
      title: 'Field Technician',
      department: 'Operations',
      location: 'Various',
      type: 'Full-time'
    }
  ];

  return (
    <div className="page-content">
      <div className="container">
        <h1>Careers at WeBA Solutions</h1>
        
        <div className="careers-intro">
          <h2>Join Our Team</h2>
          <p>
            We're looking for talented individuals who are passionate about 
            technology and engineering. Grow your career with us.
          </p>
        </div>

        <div className="current-openings">
          <h2>Current Openings</h2>
          <div className="jobs-grid">
            {jobOpenings.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <div className="job-details">
                  <span>📋 {job.department}</span>
                  <span>📍 {job.location}</span>
                  <span>⏰ {job.type}</span>
                </div>
                <div className="job-actions">
                  <button className="btn">View Details</button>
                  <button className="btn btn-secondary">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="benefits-section">
          <h2>Employee Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>Competitive Salary</h3>
              <p>Attractive compensation package</p>
            </div>
            <div className="benefit-item">
              <h3>Health Insurance</h3>
              <p>Comprehensive medical coverage</p>
            </div>
            <div className="benefit-item">
              <h3>Training & Development</h3>
              <p>Continuous learning opportunities</p>
            </div>
            <div className="benefit-item">
              <h3>Modern Workplace</h3>
              <p>Great work environment</p>
            </div>
          </div>
        </div>

        <div className="application-process">
          <h2>How to Apply</h2>
          <ol className="process-steps">
            <li>Browse current openings</li>
            <li>Submit your application online</li>
            <li>Interview process</li>
            <li>Job offer and onboarding</li>
          </ol>
          <p className="contact-email">
            Send your CV to: <strong>careers@poainternet.net</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;