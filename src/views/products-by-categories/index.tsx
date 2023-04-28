import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Banner from "./banner";
import Categories from "./categories";
import "../../assets/scss/productsByCategories.scss";
import Products from "./products";

function ProductsByCategories() {
  return (
    <>
      <Header />
      <div className="product-by-category-main-container">
        <Banner />
        <div className="afriseller-container">
          <Categories />
          <Products />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsByCategories;
