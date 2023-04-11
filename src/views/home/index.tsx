import React from "react";
import Header from "../header";
import Welcome from "./welcome";
import Cards from "./cards";
import "../../assets/scss/home.scss";
import Categories from "./categories";

function Home() {
  return (
    <div>
      <Header />
      <Welcome />
      <Cards />
      <Categories />
    </div>
  );
}

export default Home;
