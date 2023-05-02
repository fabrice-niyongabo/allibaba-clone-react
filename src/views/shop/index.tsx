import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/scss/shop.scss";

import img1 from "../../assets/images/static/banner.jpg";
import img2 from "../../assets/images/static/2.jpg";
import Details from "./details";
import Products from "./products";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { Ishop } from "../../interfaces";
import { useParams } from "react-router-dom";
import MiniLoader from "../../layouts/loader/MiniLoader";
import ImageLoader from "../../components/image-loader";
import { app } from "../../components/constants";

function Shop() {
  const { id } = useParams();
  const { shops, isLoading } = useSelector((state: RootState) => state.shops);
  const [shop, setShop] = React.useState<Ishop | undefined>(undefined);
  React.useEffect(() => {
    let sub = true;
    if (sub) {
      const shp = shops.find((item) => item.shopId === Number(id));
      if (shp) setShop(shp);
    }
    return () => {
      sub = false;
    };
  }, [shops, id]);
  return (
    <>
      <Header />
      {shop === undefined || (isLoading && shops.length === 0) ? (
        <div className="afriseller-container my-3 shop-main-container">
          <MiniLoader />
        </div>
      ) : (
        <div className="afriseller-container my-3 shop-main-container">
          <div className="banner">
            <ImageLoader
              src={app.FILE_URL + shop.shopBanner}
              props={{ className: "banner-img", alt: shop.shopName }}
            />
            <div className="details-container">
              <div className="details">
                <div className="cont">
                  <ImageLoader
                    src={app.FILE_URL + shop.shopImage}
                    alt={shop.shopName}
                  />
                  <div>
                    <h3>{shop.shopName}</h3>
                    <p>{shop.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Details shop={shop} />
          <Products shop={shop} />
        </div>
      )}
      <Footer />
    </>
  );
}

export default Shop;
