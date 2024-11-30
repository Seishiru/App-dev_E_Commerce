import React from "react";
import "../css/CartPage.css";

function CartPage() {
  return (
    <div className="container">
      <div className="section-container cart-columns">
        <div></div>
        <div><h3 className="cart-column-name">Product</h3></div>
        <div><h3 className="cart-column-name">Unit Price</h3></div>
        <div><h3 className="cart-column-name">Quantity</h3></div>
        <div><h3 className="cart-column-name">Total Price</h3></div>
        <div></div>
      </div>

      <div className="section-container cart-container">
        <div className="cart-list">
          <div className="cart-columns cart-item">
            <div>checkbox</div>
            <div>image+productname</div>
            <div>price</div>
            <div>quantity</div>
            <div>total</div>
            <div>cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
