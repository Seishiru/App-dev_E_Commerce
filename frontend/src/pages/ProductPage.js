import React from "react";
import { Link } from "react-router-dom";
import empty from "../assets/empty_image.png";
import "../css/ProductPage.css";
import ProductGrid from "../components/ProductGrid";

const ProductPage = () => {
  return (
    <div>
      <div className="section-container">
        <div className="product-container">
          <img src={empty} className="product-image" />
          <div>
            <h2 className="section-title">Product Name</h2>
            <hr />
          </div>
        </div>
      </div>
      <div className="section-container">
        <h2 className="section-title">Product Reviews</h2>
        <hr />
      </div>
      <div className="section-container">
        <h2 className="section-title">Recommended Products</h2>
        <hr />
        <ProductGrid/>
      </div>
    </div>
  );
};

export default ProductPage;
