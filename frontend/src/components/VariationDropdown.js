import React from "react";

function VariationDropbox({ variations }) {
  return (
    <div className="variation-dropdown">
      <select className="dropdown">
        <option value="">Select a variation</option>
        {variations.map((variation, index) => (
          <option key={index} value={variation}>
            {variation}
          </option>
        ))}
      </select>
    </div>
  );
}

export default VariationDropbox;
