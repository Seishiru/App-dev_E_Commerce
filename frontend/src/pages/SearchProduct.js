import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ProductItem.css";
import ProductItem from "../components/ProductItem";

function SearchProduct() {
  const location = useLocation();
  const [products, setProducts] = useState([]); // State for fetched products
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found for "{searchQuery}"</div>;
  }

  return (
    <div className="section-container">
      <h2 className="section-title">Results for "{searchQuery}"</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default SearchProduct;
