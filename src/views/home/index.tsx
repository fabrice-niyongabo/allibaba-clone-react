import React from "react";
import Header from "../header";
import Welcome from "./welcome";
import Cards from "./cards";
import "../../assets/scss/home.scss";

function Home() {
  return (
    <div>
      <Header />
      <Welcome />
      <Cards />
    </div>
  );
}

export default Home;
