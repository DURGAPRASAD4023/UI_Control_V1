import React from 'react';
import './Loader.css';
import coinSymbol from '../assets/coin-symbol.jpeg';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="coin-loader">
        <div className="coin">
          <div className="side front">
            <img src={coinSymbol} alt="Coin Symbol" />
          </div>
          <div className="side back">
            <img src={coinSymbol} alt="Coin Symbol" />
          </div>
        </div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;