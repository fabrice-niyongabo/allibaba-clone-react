import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import "../../assets/scss/search.scss";
import { useNavigate, useParams } from "react-router-dom";
import ImageLoader from "../../components/image-loader";
import { app } from "../../constants";
import { currencyFormatter, openUrlInNewTab } from "../../helpers";
import { PRICE_TYPE_ENUM } from "../../interfaces";
import { Col, Row } from "reactstrap";
import { isMobile } from "react-device-detect";

function Search() {
  const navigate = useNavigate();
  const { searchType, keyword } = useParams();
  const productsReducer = useSelector((state: RootState) => state.products);
  const shopsReducer = useSelector((state: RootState) => state.shops);

  return (
    <div>
      {/* <FullPageLoader open={} /> */}
      <Header />
      <div className="search-main-container">
        <div className="banner">
          <div className="afriseller-container">
            Search reasults: "{keyword}"
          </div>
        </div>
        <div className="afriseller-container my-5">
          <div className="bg-white p-5">
            <Row>
              {keyword &&
                searchType &&
                searchType === "products" &&
                productsReducer.products
                  .filter((item) =>
                    item.name.toLowerCase().includes(keyword.toLowerCase())
                  )
                  .map((item, index) => (
                    <Col md={6} className="mb-3">
                      <div
                        className="search-product pointer"
                        key={index}
                        onClick={() =>
                          isMobile
                            ? navigate("/product/" + item.pId)
                            : openUrlInNewTab("/product/" + item.pId)
                        }
                      >
                        <ImageLoader
                          src={app.FILE_URL + item.images[0]?.image}
                        />
                        <div className="div">
                          <h3>{item.name}</h3>
                          <p>
                            {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                              <span
                                title={`${item.currency} ${currencyFormatter(
                                  item.singlePrice
                                )}`}
                              >
                                {item.currency}{" "}
                                {currencyFormatter(item.singlePrice)}
                              </span>
                            ) : (
                              <span
                                title={`${item.currency} ${currencyFormatter(
                                  item.prices[0]?.amount
                                )} ${
                                  item.prices.length - 1 > 0 &&
                                  " - " +
                                    currencyFormatter(
                                      item.prices[item.prices.length - 1].amount
                                    )
                                }  `}
                              >
                                {item.currency}
                                {currencyFormatter(item.prices[0]?.amount)}
                                {item.prices.length - 1 > 0 && (
                                  <>
                                    -{" "}
                                    {currencyFormatter(
                                      item.prices[item.prices.length - 1].amount
                                    )}
                                  </>
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </Col>
                  ))}

              {keyword &&
                searchType &&
                searchType === "seller" &&
                shopsReducer.shops
                  .filter((item) =>
                    item.shopName.toLowerCase().includes(keyword.toLowerCase())
                  )
                  .map((item, index) => (
                    <Col md={3} className="mb-3">
                      <div
                        className="search-shop pointer"
                        key={index}
                        onClick={() =>
                          isMobile
                            ? navigate("/shops/" + item.shopId)
                            : openUrlInNewTab("/shops/" + item.shopId)
                        }
                      >
                        <ImageLoader src={app.FILE_URL + item.shopImage} />
                        <div className="div">
                          <h3>{item.shopName}</h3>
                          <p>{item.address}</p>
                        </div>
                      </div>
                    </Col>
                  ))}
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
