import React from "react";
import ProductItem from "../components/ProductItem";
import "../css/ProductItem.css";

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductGrid;
