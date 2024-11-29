// src/components/SubHeader.js
import React from "react";
import Logo from "../assets/Logo.png"; // Import logo
import { Link } from "react-router-dom";

const SubHeader = () => {
  return (
    <div className="container2">
      <img src={Logo} alt="Shopee Logo" className="logo" />
      <h1 className="site-name">Shopease</h1>

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

      <div className="cart">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
    </div>
  );
};

export default SubHeader;
