import React from "react";

import img from "../../../assets/images/start-selling-banner.png";
function Supplier() {
  return (
    <>
      <div className="supplier-banner">
        <img alt="" src={img} alt="" />
        <div className="supplier-profile">
          <img alt="" src={img} alt="" />
        </div>
      </div>
      <p>
        For more detailed information including pricing, customization, and
        shipping:
      </p>
      <a href="tel:0783242342">
        <button className="contact-btn">
          <i className="bi bi-telephone-fill"></i> Cantact Supplier
        </button>
      </a>
      <button className="contact-btn mt-3">View more from this supplier</button>
    </>
  );
}

export default Supplier;
