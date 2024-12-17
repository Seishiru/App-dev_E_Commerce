import React from "react";
import "../css/CartItem.css";
import "../css/CartPage.css";
import empty from "../assets/empty_image.png";

function CartItem({ item, onIncrease, onDecrease, onDelete }) {
  const { product_name, price, quantity, image_url, cart_item_id } = item;

  return (
    <div className="cart-columns cart-item">
      <div className="icon-container">
        <input type="checkbox" className="custom-checkbox" />
      </div>
      <div className="cart-product-container">
        <img
          src={image_url ? `http://localhost:5000/uploads/${image_url}` : empty}
          alt={product_name}
          className="cart-product-image"
        />
        <div className="cart-product-name">
          <h3>{product_name}</h3>
          <div>Variation</div>
        </div>
      </div>
      <div>₱{parseFloat(price).toFixed(2)}</div>
      <div className="cart-quantity-container">
        <button
          className="quantity-btn"
          onClick={() => onDecrease(item.cart_item_id)}
        >
          -
        </button>
        <input
          type="text"
          className="quantity-input"
          value={quantity}
          readOnly
        />
        <button
          className="quantity-btn"
          onClick={() => onIncrease(item.cart_item_id)}
        >
          +
        </button>
      </div>
      <div>₱{(quantity * parseFloat(price)).toFixed(2)}</div>
      <div className="icon-container">
        <i className="fa-solid fa-trash delete-icon" onClick={() => onDelete(cart_item_id)}></i>
      </div>
    </div>
  );
}

export default CartItem;
