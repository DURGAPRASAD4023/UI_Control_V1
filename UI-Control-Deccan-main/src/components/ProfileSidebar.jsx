import React from 'react';
import './ProfileSidebar.css';

const ProfileSidebar = ({ user, onLogout, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <img src={user.picture} alt="User avatar" className="sidebar-avatar" />
          <h3 className="sidebar-username">{user.name}</h3>
          <p className="sidebar-email">{user.email}</p>
        </div>
        <div className="sidebar-body">
          <button onClick={onLogout} className="sidebar-logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
