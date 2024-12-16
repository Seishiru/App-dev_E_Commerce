import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import empty from "../assets/empty_image.png";
import "../css/ProductPage.css";
import StarRating from "../components/StarRating";
import VariationDropbox from "../components/VariationDropdown";

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`); // This id should match the URL structure
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    

    fetchProduct();
  }, [id]); // Re-fetch when the product ID changes

  if (!product) {
    return <div>Loading...</div>; // Show a loading state until the product is fetched
  }

  return (
    <div>
      <div className="section-container">
        <div className="product-container">
          <div className="product-container-left">
            <img
              src={product.image_url ? `http://localhost:5000/uploads/${product.image_url}` : empty}
              alt={product.name}
              className="product-image"
            />
          </div>
          <div className="product-container-right">
            <h2 className="product-name">{product.name}</h2>
            <hr />
            <div className="product-details-summary">
              <div className="product-price">₱{product.price}</div>
              <div className="product-sales-summary">
                <StarRating rating={4.7} /> | 10k+ sold
              </div>
            </div>
            <VariationDropbox variations={["Small", "Medium", "Large"]} />
            <div className="product-description">
              <div className="product-description-label">Product Description:</div>
              <div>{product.description}</div>
            </div>
            <div className="product-buttons">
              <button className="buy-button">Buy Now</button>
              <button className="add-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">Product Reviews</h2>
        <hr />
      </div>

      <div className="section-container">
        <h2 className="section-title">Recommended Products</h2>
        <hr />
        {/* ProductGrid component can be used here if you want to show other products */}
      </div>
    </div>
  );
};

export default ProductPage;
