import React from "react";

import banner from "../../../assets/images/static/banner3.png";

function Banner() {
  return (
    <div className="banner">
      <img src={banner} style={{ width: "100%" }} />
    </div>
  );
}

export default Banner;
