import React from 'react'
import '../css/ProductItem.css'
import ProductItem from '../components/ProductItem'

function SearchProduct() {
  return (
    <div className="section-container">
        <h2 className="section-title">Results for [search input]</h2>
        <div className="product-grid">
            {/* Temporary */}
          {Array(20)
            .fill(null)
            .map((_, index) => (
              <ProductItem key={index} />
            ))}
        </div>
      </div>
  )
}

export default SearchProduct