import React from 'react'
import "../css/ProductItem.css";
import ProductItem from "../components/ProductItem";

function ProductGrid() {
  return (
    <div>
      <div className="product-grid">
          {/* Temporary */}
          {/* should display list of products based on conditions (all, recommended/related, recently viewed, etc) */}
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <ProductItem key={index} />
            ))}
        </div>
    </div>
  )
}

export default ProductGrid