import React from "react";
import { useState } from "react";
import "../css/CartPage.css";
import empty from "../assets/empty_image.png";

function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const price = 100

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

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
          <div className="cart-columns cart-item">
            <div className="icon-container">
              <input type="checkbox" className="custom-checkbox" />
            </div>
            <div className="cart-product-container">
              <img src={empty} className="cart-product-image" />
              <div className="cart-product-name">
                <h3>Product name</h3>
                <div>variation</div>
              </div>
            </div>
            <div>₱{price.toFixed(2)}</div>
            <div className="cart-quantity-container">
              <button className="quantity-btn" onClick={() => handleDecrease()}>-</button>
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled
              />
              <button className="quantity-btn" onClick={() => handleIncrease()}>+</button>
            </div>
            <div>₱{(quantity*price).toFixed(2)}</div>
            <div className="icon-container">
              <i className="fa-solid fa-trash delete-icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-container">
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
