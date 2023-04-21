import React from "react";

function Reviews() {
  return (
    <div className="product-reviews-main-container">
      <h3>1 Review for this product</h3>
      <div className="review">
        <div>
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="contents">
          <span>
            <b>Fabrice</b> 12-02-2018
          </span>
          <p>Review message here</p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
