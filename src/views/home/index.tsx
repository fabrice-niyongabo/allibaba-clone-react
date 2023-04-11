import React from "react";
import Welcome from "./welcome";
import Cards from "./cards";
import "../../assets/scss/home.scss";
import Categories from "./categories";
import JustForYou from "./just-for-you";
import TopSelectedSupplier from "./top-selected-suppliers";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Home() {
  return (
    <div>
      <Header />
      <Welcome />
      <Cards />
      <Categories />
      <JustForYou />
      <TopSelectedSupplier />
      <Footer />
    </div>
  );
}

export default Home;
