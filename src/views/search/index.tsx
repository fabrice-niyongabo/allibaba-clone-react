import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import FullPageLoader from "../../components/full-page-loader";
import "../../assets/scss/search.scss";
import { useParams } from "react-router-dom";

function Search() {
  const { searchType, keyword } = useParams();
  const productsReducer = useSelector((state: RootState) => state.products);
  const shopsReducer = useSelector((state: RootState) => state.shops);

  return (
    <div>
      {/* <FullPageLoader open={} /> */}
      <Header />
      <div className="search-main-container">
        <div className="banner">
          <div className="afriseller-container">Search reasults: ""</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
