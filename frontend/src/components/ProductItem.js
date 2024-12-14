import React from "react";
import "../css/ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <Link to={`/product/${product.product_id}`}>
      <div className="product-card">
        <div className="product-card-image">
          <img src={`http://localhost:5000/uploads/${product.image_url}`} alt={product.name} />
        </div>
        <div className="product-card-summary">
          <div className="product-card-name">{product.name}</div> {/* Display name */}
          <div className="product-card-description">{product.description}</div>
          <div className="product-card-details">
            <div className="product-card-price">₱{product.price}</div>
            <div>{product.stock_quantity} in stock</div>
          </div>
        </div>
      </div>
    </Link>
  );
}


export default ProductItem;
