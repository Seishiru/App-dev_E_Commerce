// src/components/LoggedInHeader.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../css/Header.css";
import Logo from "../assets/Logo.png"; // Import the logo

const LoggedInHeader = ({ user, handleLogout }) => {
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
          <Link to='/search'>
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
          </Link>
          <div className="cart">
            <Link to="/cart">
              <i className="fas fa-shopping-cart cart-icon"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Header for Logged In Users */}
      <div className="header-section">
        <span>Hello, {user.name}</span> {/* Show user name */}
        <button className="header-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoggedInHeader;
