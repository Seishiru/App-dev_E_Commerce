// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../css/Header.css";
import Logo from "../assets/Logo.png"; // Import the logo

const Header = ({ setShowLogin, setShowSignup }) => {
  return (
    <div className="header-container">
      <Link to="/">
        <div className="header-section">
          <img src={Logo} alt="Shopee Logo" className="logo" />
          <h1 className="site-name">Shopease</h1>
        </div>
      </Link>

      <div className="header-section">
        {/* Search Bar and Button */}
        <div className="search-bar">
          <div>
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
            />
          </div>
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <div className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Header Buttons */}
      <div className="header-section">
        <button className="header-button" onClick={() => setShowLogin(true)}>
          Login
        </button>
        <button className="header-button" onClick={() => setShowSignup(true)}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Header;
