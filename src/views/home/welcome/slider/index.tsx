import React from "react";
import { Carousel } from "react-responsive-carousel";

import slide1 from "../../../../assets/images/static/banner.jpg";
import slide2 from "../../../../assets/images/static/banner2.jpg";

function Slider() {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      swipeable={true}
      interval={5000}
    >
      <div>
        <img className="d-block w-100" src={slide1} alt="f slide" />
      </div>
      <div>
        <img className="d-block w-100" src={slide2} alt="Second slide" />
      </div>
    </Carousel>
  );
}

export default Slider;
