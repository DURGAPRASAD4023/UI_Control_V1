import { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="theme-toggle-container">
      <span className="theme-toggle-icon">☀️</span>
      <input 
        type="checkbox" 
        id="theme-toggle" 
        className="theme-toggle-input"
        checked={theme === 'dark'}
        onChange={toggleTheme} 
      />
      <label htmlFor="theme-toggle" className="theme-toggle-label"></label>
      <span className="theme-toggle-icon">🌙</span>
    </div>
  );
};

export default ThemeToggle;
