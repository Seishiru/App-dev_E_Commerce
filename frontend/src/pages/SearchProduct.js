import React from 'react'
import '../css/ProductItem.css'
import ProductGrid from '../components/ProductGrid'

function SearchProduct() {
  return (
    <div className="section-container">
        <h2 className="section-title">Results for [search input]</h2>
        <hr />
        <ProductGrid/>
      </div>
  )
}

export default SearchProduct