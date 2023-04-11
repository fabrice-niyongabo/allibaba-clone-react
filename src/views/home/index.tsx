import React from "react";
import Header from "../header";
import Welcome from "./welcome";
import Cards from "./cards";
import "../../assets/scss/home.scss";
import Categories from "./categories";
import JustForYou from "./just-for-you";
import TopSelectedSupplier from "./top-selected-suppliers";

function Home() {
  return (
    <div>
      <Header />
      <Welcome />
      <Cards />
      <Categories />
      <JustForYou />
      <TopSelectedSupplier />
    </div>
  );
}

export default Home;
