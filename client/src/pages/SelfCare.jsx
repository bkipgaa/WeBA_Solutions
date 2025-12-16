import React, { useState } from 'react';
import './Selfcare.css'

const SelfCare = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const selfCareFeatures = [
    { title: 'Bill Payment', desc: 'Pay your bills online securely' },
    { title: 'Service Status', desc: 'Check your service status and reports' },
    { title: 'Usage Details', desc: 'View your data/usage statistics' },
    { title: 'Profile Management', desc: 'Update your account information' },
    { title: 'Support Tickets', desc: 'Create and track support requests' },
    { title: 'Service Upgrade', desc: 'Upgrade or modify your services' }
  ];

  return (
    <div className="page-content">
      <div className="container">
        <h1>Self-care Portal</h1>
        
        {!isLoggedIn ? (
          <div className="login-section">
            <div className="login-card">
              <h2>Customer Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username / Account Number</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <div className="login-help">
                <p>Forgot password? <a href="/support">Reset here</a></p>
                <p>New customer? <a href="/support">Contact sales</a></p>
              </div>
            </div>
            
            <div className="portal-info">
              <h3>What you can do in the portal:</h3>
              <ul>
                <li>View and pay bills</li>
                <li>Check service status</li>
                <li>Monitor usage</li>
                <li>Update account details</li>
                <li>Request support</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="dashboard-section">
            <div className="dashboard-header">
              <h2>Welcome back, {username}!</h2>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </div>

            <div className="quick-stats">
              <div className="stat-card">
                <h3>Current Bill</h3>
                <p className="stat-value">Ksh 2,450</p>
                <button className="btn btn-small">Pay Now</button>
              </div>
              <div className="stat-card">
                <h3>Service Status</h3>
                <p className="stat-value active">Active</p>
                <button className="btn btn-small">View Details</button>
              </div>
              <div className="stat-card">
                <h3>Data Usage</h3>
                <p className="stat-value">65% Used</p>
                <button className="btn btn-small">View Usage</button>
              </div>
            </div>

            <div className="features-grid">
              <h2>Self-care Features</h2>
              <div className="features-list">
                {selfCareFeatures.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                    <button className="btn">Access</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="support-quick">
              <h2>Need Help?</h2>
              <div className="support-options">
                <button className="btn">Create Support Ticket</button>
                <button className="btn btn-secondary">Live Chat</button>
                <button className="btn">Call Support</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCare;