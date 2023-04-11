//@ts-nocheck
import React from "react";
import Carousel from "nuka-carousel";

import img1 from "../../../assets/images/static/1.jpg";
import img2 from "../../../assets/images/static/2.jpg";
import img3 from "../../../assets/images/static/3.jpg";
import img4 from "../../../assets/images/static/2.jpg";
import img5 from "../../../assets/images/static/electronics.jpg";

function TopSelectedSupplier() {
  return (
    <div className="afriseller-container my-5 top-suppliers">
      <h3>TOP SELECTED SUPPLIERS</h3>
      <div className="main-container">
        <Carousel
          autoplay={true}
          autoplayInterval={5000}
          wrapAround={true}
          slidesToShow={6}
          adaptiveHeight={true}
          withoutControls={true}
        >
          <div className="slider-item">
            <img src={img1} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img2} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img3} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img3} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img3} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img3} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img4} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
          <div className="slider-item">
            <img src={img5} alt="" style={{ width: 100 }} />
            <span>Supplier Name</span>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default TopSelectedSupplier;
