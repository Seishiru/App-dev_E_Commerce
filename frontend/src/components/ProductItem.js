import React from "react";
import "../css/ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem() {
  return (
    <Link to="/product">
      <div className="product-card">
        <div className="product-card-image">image</div>
        <div className="product-card-summary">
          <div className="product-card-name">Product name</div>
          <div className="product-card-details">
            <div className="product-card-price">₱100</div>
            <div>10k+ sold</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
