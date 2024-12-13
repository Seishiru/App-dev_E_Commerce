

import React from "react";
import { useLocation } from "react-router-dom"; 
import "../css/ProductItem.css";
import ProductItem from "../components/ProductItem";

function SearchProduct() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  return (
    <div className="section-container">
      <h2 className="section-title">Results for "{searchQuery}"</h2>
      <div className="product-grid">
        {/* Temporary */}
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <ProductItem key={index} />
          ))}
      </div>
    </div>
  );
}

export default SearchProduct;
