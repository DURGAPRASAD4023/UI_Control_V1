import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Deccan AI. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
