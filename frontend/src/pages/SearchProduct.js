import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import "../css/ProductItem.css";
import ProductItem from "../components/ProductItem";

function SearchProduct() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  // State to store products and loading/error status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products based on the search query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the fetched products to the state
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="section-container">
      <h2 className="section-title">Results for "{searchQuery}"</h2>

      {/* Loading Spinner */}
      {loading && <p>Loading products...</p>}

      {/* Error Message */}
      {error && <p>Error: {error}</p>}

      {/* Display products */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product.product_id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
