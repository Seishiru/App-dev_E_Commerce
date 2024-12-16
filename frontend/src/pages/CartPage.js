import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/CartPage.css";
import empty from "../assets/empty_image.png";
import CartItem from "../components/CartItem";

function CartPage() {
  return (
    <div>
      <div className="section-container cart-columns">
        <div></div>
        <div>
          <h3 className="cart-column-name">Product</h3>
        </div>
        <div>
          <h3 className="cart-column-name">Unit Price</h3>
        </div>
        <div>
          <h3 className="cart-column-name">Quantity</h3>
        </div>
        <div>
          <h3 className="cart-column-name">Total Price</h3>
        </div>
        <div></div>
      </div>

      <div className="section-container cart-container">
        <div className="cart-list">
          <CartItem/>
        </div>
      </div>

      <div className="checkout-container">
        <Link to="/checkout">
          <button className="checkout-button">Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
