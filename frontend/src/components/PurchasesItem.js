import React from "react";
import empty from "../assets/empty_image.png";

function PurchasesItem() {
  return (
    <div className="purchases-columns">
      <div className="purchases-product-container">
        <img src={empty} className="purchases-product-image" />
        <div className="purchases-product-name">
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

export default PurchasesItem;
