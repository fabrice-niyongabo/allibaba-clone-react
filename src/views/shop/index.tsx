import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/scss/shop.scss";

import img1 from "../../assets/images/static/banner.jpg";
import img2 from "../../assets/images/static/2.jpg";
import Details from "./details";
import Products from "./products";

function Shop() {
  return (
    <>
      <Header />
      <div className="afriseller-container my-3 shop-main-container">
        <div className="banner">
          <img src={img1} className="banner-img" />
          <div className="details-container">
            <div className="details">
              <div className="cont">
                <img src={img2} />
                <div>
                  <h3>Kigali shopping group</h3>
                  <p>Kigali - Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Details />
        <Products />
      </div>
      <Footer />
    </>
  );
}

export default Shop;
