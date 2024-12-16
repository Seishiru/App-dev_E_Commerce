import React, { useState, useEffect } from "react";
import "../css/ProductItem.css";
import ProductItem from "../components/ProductItem";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products"); // Adjust the endpoint as necessary
      if (response.ok) {
        const result = await response.json();
        setProducts(result); // Update the products state with the fetched data
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <div>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product.product_id} product={product} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
