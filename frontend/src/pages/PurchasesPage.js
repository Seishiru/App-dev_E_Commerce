import React from "react";
import "../css/Purchases.css";

function PurchasesPage() {
  return (
    <div>
      <div className="section-container purchases-columns">
        <div>
          <h3 className="purchases-column-name">To be Shipped</h3>
        </div>
        <div>
          <h3 className="purchases-column-name">To be Received</h3>
        </div>
        <div>
          <h3 className="purchases-column-name">Completed Orders</h3>
        </div>
      </div>

      <div className="section-container">
        <div className="">

        </div>
      </div>
    </div>
  );
}

export default PurchasesPage;
