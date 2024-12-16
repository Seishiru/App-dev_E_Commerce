import React from "react";
import { Link } from "react-router-dom";
import "../css/CheckoutItem.css";
import "../css/Checkout.css";
import empty from "../assets/empty_image.png";

function CheckoutItem() {
  return (
    <div className="checkout-columns">
      <div className="checkout-product-container">
        <img src={empty} className="checkout-product-image" />
        <div className="checkout-product-name">
          <h3>Product name</h3>
          <div>variation</div>
        </div>
      </div>
      <div>₱100.00</div>
      <div>3</div>
      <div>₱300.00</div>
    </div>
  );
}

export default CheckoutItem;
