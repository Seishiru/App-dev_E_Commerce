import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import empty from "../assets/empty_image.png";
import "../css/ProductPage.css";
import StarRating from "../components/StarRating";
import VariationDropbox from "../components/VariationDropdown";
import UserReview from "../components/UserReview";

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState(""); // For user feedback
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product with ID:", id); // Debug: Product fetch started
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        ); // Fetch product details by ID
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        console.log("Product data fetched successfully:", data); // Debug: Product fetch successful
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    console.log("Adding product to cart, product ID:", id); // Debug: Add to cart started
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1, // Replace with logged-in user's ID
          product_id: id,
          quantity: 1, // Default quantity
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      setCartMessage("Product added to cart!");
      console.log("Product successfully added to cart."); // Debug: Product added to cart
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setCartMessage("Failed to add product to cart");
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Show a loading state until the product is fetched
  }

  return (
    <div>
      <div className="section-container">
        <div className="product-container">
          <div className="product-container-left">
            <img
              src={
                product.image_url
                  ? `http://localhost:5000/uploads/${product.image_url}`
                  : empty
              }
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

            <div className="product-description-label">
              Product Description:
            </div>
            <div
              className={`product-description ${isExpanded ? "expanded" : ""}`}
            >
              <div>{product.description}</div>
              <div className="see-more" onClick={toggleDescription}>
                {isExpanded ? "See less" : "See more"}
              </div>
            </div>
            <div className="product-buttons">
              <button className="buy-button">Buy Now</button>
              <button className="add-button" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
            {cartMessage && <div className="cart-message">{cartMessage}</div>}
          </div>
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">Product Reviews</h2>
        <hr />
        <div className="review-list">
          <UserReview/>
          <UserReview/>
        </div>
        <div className="see-more">See More</div>
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
