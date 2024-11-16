// src/components/Header.js
import React from 'react';

const Header = ({ setShowLogin, setShowSignup }) => {
  return (
    <div className="header-bar">
      <button className="header-button" onClick={() => setShowLogin(true)}>Login</button>
      <button className="header-button" onClick={() => setShowSignup(true)}>Signup</button>
    </div>
  );
};

export default Header;
