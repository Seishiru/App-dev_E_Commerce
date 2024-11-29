// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/HomePage.css';
import Logo from '../assets/Logo.png'; // Import the logo

const Header = ({ setShowLogin, setShowSignup }) => {
  return (
    <div className="container2">
      <img src={Logo} alt="Shopee Logo" className="logo" />
      <h1 className="site-name">Shopease</h1>

      {/* Search Bar and Button */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Header Buttons */}
      <div className="header-right">
        <button className="header-button" onClick={() => setShowLogin(true)}>
          Login
        </button>
        <button className="header-button" onClick={() => setShowSignup(true)}>
          Signup
        </button>
        <div className="cart">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
