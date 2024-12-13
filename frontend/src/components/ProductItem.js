import React from "react";
import '../css/ProductItem.css'
import { Link } from "react-router-dom"; 

function ProductItem() {
  return (
    <Link to='/product'>
      <div className="product-card">
      <div className="product-image">image</div>
      <div className="product-description">Product 5 description</div>
    </div>
    </Link>
  );
}

export default ProductItem;
