import React from "react";
import "../css/Checkout.css";
import empty from "../assets/empty_image.png";

function CheckoutPage() {
  return (
    <div>
      <div className="section-container">
        <h2 className="section-title">Delivery Address</h2>
        <hr />
        <div className="address-container">
          <div>
            <div className="receiver-name">Ernie Manatad</div>
            <div>091234567890</div>
          </div>
          <div className="address-contents">
            Building 5, House 23, Mango Avenue, Barangay Capitol Site, Cebu
            City, Cebu, Visayas, 6000
          </div>
          <div className="address-button-container">
            <button>Change</button>
          </div>
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">Items Ordered</h2>
        <hr />
        <div className="checkout-list">
          <div className="checkout-columns">
            <div className="checkout-product-container">
              <img src={empty} className="checkout-product-image" />
              <div className="checkout-product-name">
                <h3>Product name</h3>
                <div>variation</div>
              </div>
            </div>
            <div>₱100.00</div>
            <div>
              3
            </div>
            <div>₱300.00</div>
          </div>
        </div>
        <hr />
        <div className="total-container">
          <div className="total-label">TOTAL</div>
          <div className="total-price">₱300.00</div>
        </div>
      </div>

      <div className="section-container">
        <h2 className="section-title">Order Summary</h2>
        <hr />
        <div className="order-summary-row">
          <div>Merchandise Subtotal</div>
          <div>₱300.00</div>
        </div>
        <div className="order-summary-row">
          <div>Shipping Subtotal</div>
          <div>₱60.00</div>
        </div>
        <div className="order-summary-row">
          <div>Voucher Discount</div>
          <div>₱0.00</div>
        </div>
        <hr />
        <div className="total-container">
          <div className="total-label">TOTAL</div>
          <div className="total-price">₱360.00</div>
        </div>
        <div className="order-button-container">
        <button className="order-button">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
