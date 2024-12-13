import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import empty from "../assets/empty_image.png";
import "../css/ProductPage.css";
import ProductGrid from "../components/ProductGrid";
import StarRating from "../components/StarRating";
import VariationDropbox from "../components/VariationDropdown";

const ProductPage = () => {
  const productVariations = ["Small", "Medium", "Large"]; // Example variations
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div className="section-container">
        <div className="product-container">
          <div className="product-container-left">
            <img src={empty} className="product-image" />
          </div>
          <div className="product-container-right">
            <h2 className="product-name">
              Product Name product name product name
            </h2>
            <hr />
            <div className="product-details-summary">
              <div className="product-price">₱100</div>
              <div className="product-sales-summary">
                <StarRating rating={4.7} /> | 10k+ sold
              </div>
            </div>
            <VariationDropbox variations={productVariations} />
            <div
              className={`product-description ${isExpanded ? "expanded" : ""}`}
            >
              <div className="product-description-label">Product Description:</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div className="see-more" onClick={toggleDescription}>
                {isExpanded ? "See less" : "See more"}
              </div>
            </div>
            <div className="product-buttons">
              <button className="buy-button">Buy Now</button>
              <button className="add-button">Add to Cart</button>
            </div>
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
        <ProductGrid />
      </div>
    </div>
  );
};

export default ProductPage;
