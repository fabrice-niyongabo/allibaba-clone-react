//@ts-nocheck
import React from "react";
import Carousel from "nuka-carousel";

import img1 from "../../../assets/images/static/1.jpg";
import img2 from "../../../assets/images/static/2.jpg";
import img3 from "../../../assets/images/static/3.jpg";
import img4 from "../../../assets/images/static/2.jpg";
import img5 from "../../../assets/images/static/electronics.jpg";

function RelatedProducts() {
  return (
    <div className="related-products-container">
      <h3 style={{ fontSize: 16 }}>You may also like</h3>
      <Carousel
        autoplay={false}
        wrapAround={true}
        slidesToShow={5}
        adaptiveHeight={true}
        slidesToScroll={5}
        renderBottomCenterControls={() => <></>}
        renderCenterLeftControls={({ previousSlide }) => (
          <div className="carausel-custom-control" onClick={previousSlide}>
            <i className="bi bi-caret-left-fill"></i>
          </div>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <div className="carausel-custom-control" onClick={nextSlide}>
            <i className="bi bi-caret-right-fill"></i>
          </div>
        )}
      >
        <div className="slider-item">
          <img src={img1} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
        <div className="slider-item">
          <img src={img2} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
        <div className="slider-item">
          <img src={img3} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
        <div className="slider-item">
          <img src={img4} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
        <div className="slider-item">
          <img src={img5} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
        <div className="slider-item">
          <img src={img4} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
        <div className="slider-item">
          <img src={img5} alt="" />
          <p
            title="Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand"
          >
            Aluminum alloy Angle Adjustable Two Fans Cooling Pad Stand Ergonomic
            Home Use Foldable Riser Laptop Cooling Pads Laptop Stand
          </p>
          <span title="22,000 rwf - 100,000 rwf">22,000 rwf - 100,000 rwf</span>
        </div>
      </Carousel>
    </div>
  );
}

export default RelatedProducts;
