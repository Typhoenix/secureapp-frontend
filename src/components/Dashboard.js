import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to the Dashboard</h2>
        <p>Manage your accounts and transactions</p>
      </div>
      <div className="dashboard-links">
        <div className="dashboard-link create-account">
          <a href="/create-account">
            <div className="dashboard-link-icon">
              <i className="fas fa-plus"></i>
            </div>
            <span>Create Account</span>
          </a>
        </div>
        <div className="dashboard-link all-accounts">
          <a href="/accounts">
            <div className="dashboard-link-icon">
              <i className="fas fa-list-alt"></i>
            </div>
            <span>All Accounts</span>
          </a>
        </div>
        <div className="dashboard-link get-account">
          <a href="/account/123">
            <div className="dashboard-link-icon">
              <i className="fas fa-search"></i>
            </div>
            <span>Get Account by ID</span>
          </a>
        </div>
        <div className="dashboard-link delete-account">
          <a href="/delete-account/123">
            <div className="dashboard-link-icon">
              <i className="fas fa-trash-alt"></i>
            </div>
            <span>Delete Account</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
