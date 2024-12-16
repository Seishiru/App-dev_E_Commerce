import React, { useState } from "react";
import "../css/Purchases.css";
import PurchasesItem from "../components/PurchasesItem";

function PurchasesPage() {
  const [activeTab, setActiveTab] = useState(1); 

  return (
    <div>
      <div className="section-container tab-columns">
        <div className={`tab ${activeTab === 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>
          <h3 className="tab-column-name">To be Shipped</h3>
        </div>
        <div className={`tab ${activeTab === 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>
          <h3 className="tab-column-name">To be Received</h3>
        </div>
        <div className={`tab ${activeTab === 3 ? "active" : ""}`} onClick={() => setActiveTab(3)}>
          <h3 className="tab-column-name">Completed Orders</h3>
        </div>
      </div>

      <div className="section-container">
        <div className="purchases-columns">
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        <hr />
        {activeTab === 1 && (
          <div>
            <PurchasesItem />
          </div>
        )}
        {/* Content for Tab 2 */}
        {activeTab === 2 && (
          <div>
            <PurchasesItem />
          </div>
        )}
        {/* Content for Tab 3 */}
        {activeTab === 3 && (
          <div>
            <PurchasesItem />
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchasesPage;
