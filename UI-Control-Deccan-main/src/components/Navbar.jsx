import React, { useState } from 'react';
import './Navbar.css';
import deccanAiLogo from '../assets/deccan-ai-logo.png';
import ThemeToggle from './ThemeToggle';
import ProfileSidebar from './ProfileSidebar';

const Navbar = ({ onLogout, userProfile, onDownload, onReset, isDataParsed }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={deccanAiLogo} alt="Deccan AI Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        {isDataParsed && (
          <div className="nav-buttons">
            <button onClick={onDownload} className="nav-button">Download Parsed JSON</button>
            <button onClick={onReset} className="nav-button secondary">Parse Another File</button>
          </div>
        )}
        <ThemeToggle />
        {userProfile && (
          <div className="user-profile" onClick={toggleSidebar}>
            <img src={userProfile.picture} alt="User avatar" className="avatar" />
          </div>
        )}
      </div>
      {userProfile && (
        <ProfileSidebar 
          user={userProfile} 
          onLogout={onLogout} 
          isOpen={isSidebarOpen} 
          onClose={toggleSidebar} 
        />
      )}
    </nav>
  );
};

export default Navbar;
