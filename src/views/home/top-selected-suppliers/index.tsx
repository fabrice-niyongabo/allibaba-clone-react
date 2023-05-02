//@ts-nocheck
import React from "react";
import Carousel from "nuka-carousel";

import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../components/constants";
import { useNavigate } from "react-router-dom";

function TopSelectedSupplier() {
  const navigate = useNavigate();
  const { shops } = useSelector((state: RootState) => state.shops);
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
          {shops.map((shop, position) => (
            <div
              className="slider-item"
              key={position}
              onClick={() => navigate("/shops/" + shop.shopId)}
            >
              <img src={app.FILE_URL + shop.shopImage} alt={shop.shopName} />
              <span>{shop.shopName}</span>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default TopSelectedSupplier;
