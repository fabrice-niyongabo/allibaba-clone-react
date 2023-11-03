import { useState } from "react";
import "../../../assets/scss/homeWelcome.scss";
import { Col, Row } from "reactstrap";
import Slider from "./slider";

import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { currencyFormatter, openUrlInNewTab } from "../../../helpers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";
import { PRICE_TYPE_ENUM } from "../../../interfaces";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const [homeHover, setHomeHover] = useState(false);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { products } = useSelector((state: RootState) => state.products);
  return (
    <div className="afriseller-container home-welcome">
      <div style={{ backgroundColor: "#FFF" }}>
        <Row>
          <Col
            md={3}
            style={{ paddingRight: 0, display: isMobile ? "none" : "block" }}
          >
            <div className="w-container">
              <h3>My Markets</h3>
              <ul>
                <li
                  onMouseOver={() => {
                    setHomeHover(true);
                  }}
                  onMouseLeave={() => {
                    setHomeHover(false);
                  }}
                >
                  <i
                    className={
                      homeHover ? "bi bi-list text-orange" : "bi bi-list"
                    }
                    style={{ fontSize: 20 }}
                  />
                  <span className={homeHover ? "text-orange" : ""}>
                    All Categories
                  </span>{" "}
                  {homeHover ? (
                    <i className="bi bi-chevron-right text-orange" />
                  ) : (
                    <i className="bi bi-chevron-down" />
                  )}
                  {homeHover && (
                    <div className="category-menu">
                      <div className="row">
                        {categories.map((item, position) => (
                          <div className="col-md-4" key={position}>
                            <h3
                              className="pointer"
                              onClick={() =>
                                isMobile
                                  ? navigate("/category/" + item.id)
                                  : openUrlInNewTab("/category/" + item.id)
                              }
                            >
                              {item.name}
                            </h3>
                            <ul>
                              {item.subCategories.map((it, position) => (
                                <li
                                  key={position}
                                  onClick={() =>
                                    isMobile
                                      ? navigate(
                                          "/category/" + item.id + "/" + it.id
                                        )
                                      : openUrlInNewTab(
                                          "/category/" + item.id + "/" + it.id
                                        )
                                  }
                                >
                                  {it.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                {categories
                  .filter((item) => item.onCategoriesSection)
                  .map((item, position) => (
                    <li
                      key={position}
                      className="pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.id)
                          : openUrlInNewTab("/category/" + item.id)
                      }
                    >
                      <i
                        className={`bi ${item.icon}`}
                        style={{ fontSize: 20 }}
                      />
                      <span>{item.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
          <Col md={6} className={!isMobile ? "m-0 p-0" : ""}>
            <div className="slider-container">
              <Slider />
            </div>
          </Col>
          <Col
            md={3}
            style={{ paddingLeft: 0, display: isMobile ? "none" : "block" }}
          >
            <div className="w-container new-products">
              <h3>New Products</h3>
              <ul>
                {products.slice(0, 5).map((item, index) => (
                  <li
                    className="pointer"
                    key={index}
                    onClick={() =>
                      isMobile
                        ? navigate("/product/" + item.pId)
                        : openUrlInNewTab("/product/" + item.pId)
                    }
                  >
                    <div>
                      <p>
                        <b>{item.name}</b>
                      </p>
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span
                          title={`${item.currency} ${currencyFormatter(
                            item.singlePrice
                          )}`}
                        >
                          {item.currency} {currencyFormatter(item.singlePrice)}
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
                          {item.currency}{" "}
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
                    </div>
                    <div>
                      <ImageLoader src={app.FILE_URL + item.images[0]?.image} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Welcome;
