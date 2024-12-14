// src/components/LoggedInHeader.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import "../css/Header.css";
import Logo from "../assets/Logo.png"; // Import the logo
import empty from "../assets/empty_image.png";

const LoggedInHeader = ({ user, handleLogout }) => {
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  // Handle the search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    }
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div>
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
                value={searchInput} // Controlled input
                onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
              />
            </div>
            <button
              className="search-button"
              onClick={handleSearch} // Trigger search on click
              disabled={!searchInput.trim()} // Disable button when input is empty
            >
              <i className="fas fa-search"></i>
            </button>
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
          <img
            src={empty}
            className="header-profile-image"
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown-container">
          <Link to='/profile'><div className="dropdown-item">My Account</div></Link>
          <Link to='/purchases'><div className="dropdown-item">My Purchases</div></Link>
          <div className="dropdown-item" onClick={handleLogout}>
            Log out
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInHeader;
