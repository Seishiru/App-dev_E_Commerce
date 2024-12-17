import React from "react";
import "../css/ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { product_id, image_url, name, description, price, stock_quantity, category_name } = product;

  return (
    <Link to={`/product/${product_id}`}>
      <div className="product-card">
        <div className="product-card-image">
          <img src={`http://localhost:5000/uploads/${image_url}`} alt={name} />
        </div>
        <div className="product-card-summary">
          <div className="product-card-name">{name}</div>
          <div className="product-card-details">
            <div className="product-card-price">₱{price}</div>
            <div>{stock_quantity} in stock</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
