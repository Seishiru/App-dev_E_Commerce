import React from "react";
import "../css/ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  // Debugging: Log the received product prop
  // console.log("Received product data:", product);

  if (!product) {
    return <div>Product data is unavailable</div>;
  }

  const { product_id, image_url, name, description, price, stock_quantity } = product;

  // Ensure all necessary fields are present before trying to render them
  if (!product_id || !image_url || !name || !description || price === undefined || stock_quantity === undefined) {
    console.error("Incomplete product data:", product);
    return <div>Product information is incomplete</div>;
  }

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
