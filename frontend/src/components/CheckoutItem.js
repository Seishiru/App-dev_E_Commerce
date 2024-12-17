import React from "react";
import "../css/CheckoutItem.css";
import "../css/Checkout.css";
import empty from "../assets/empty_image.png";

function CheckoutItem({ item }) {
  const { product_name, price, quantity, image_url } = item;
  const totalPrice = parseFloat(price) * quantity;

  return (
    <div className="checkout-columns">
      <div className="checkout-product-container">
        <img 
          src={image_url ? `http://localhost:5000/uploads/${image_url}` : empty} 
          className="checkout-product-image" 
          alt={product_name}
        />
        <div className="checkout-product-name">
          <h3>{product_name}</h3>
        </div>
      </div>
      <div>₱{parseFloat(price).toFixed(2)}</div>
      <div>{quantity}</div>
      <div>₱{totalPrice.toFixed(2)}</div>
    </div>
  );
}

export default CheckoutItem;
