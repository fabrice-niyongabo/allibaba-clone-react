import React from "react";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/images/static/1.jpg";
import img2 from "../../../assets/images/static/3.jpg";
import img3 from "../../../assets/images/static/banner.jpg";
function ProductImages() {
  return (
    <div>
      <Carousel infiniteLoop swipeable={true} dynamicHeight={true}>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </Carousel>
    </div>
  );
}

export default ProductImages;
