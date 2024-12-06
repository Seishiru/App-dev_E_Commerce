import React from "react";
import "../css/Checkout.css";

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
      </div>

      <div className="section-container">
      <h2 className="section-title">Order Summary</h2>
      <hr />
      </div>
    </div>
  );
}

export default CheckoutPage;
