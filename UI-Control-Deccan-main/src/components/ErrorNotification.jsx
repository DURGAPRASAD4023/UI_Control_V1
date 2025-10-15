import React from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-notification">
      <p>{message}</p>
      <button onClick={onClose} className="close-button">X</button>
    </div>
  );
};

export default ErrorNotification;
