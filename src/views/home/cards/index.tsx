import React from "react";
import { Col, Row } from "reactstrap";

import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ImageLoader from "../../../components/image-loader";
import { app } from "../../../constants";
import { PRICE_TYPE_ENUM } from "../../../interfaces";
import { currencyFormatter, openUrlInNewTab } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
function Cards() {
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.products);
  return (
    <div className="afriseller-container home-cards-container">
      <Row>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>New Arrivals</h3>
            <Row>
              {products
                .filter((item) => item.onNewArrivals)
                .slice(0, 3)
                .map((item, position) => (
                  <Col xs={4} sm={4} md={4} key={position}>
                    <div
                      className="product-container pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.categoryId)
                          : openUrlInNewTab("/category/" + item.categoryId)
                      }
                    >
                      <ImageLoader
                        alt={item.name}
                        src={app.FILE_URL + item.images[0]?.image}
                      />
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span>
                          {item.currency} {currencyFormatter(item.singlePrice)}
                        </span>
                      ) : (
                        <span>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                        </span>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Electronics Items</h3>
            <Row>
              {products
                .filter((item) => item.onElectronics)
                .slice(0, 3)
                .map((item, position) => (
                  <Col xs={4} sm={4} md={4} key={position}>
                    <div
                      className="product-container pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.categoryId)
                          : openUrlInNewTab("/category/" + item.categoryId)
                      }
                    >
                      <ImageLoader
                        alt={item.name}
                        src={app.FILE_URL + item.images[0]?.image}
                      />
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span>
                          {item.currency} {currencyFormatter(item.singlePrice)}
                        </span>
                      ) : (
                        <span>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                        </span>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Top Rated Products</h3>
            <Row>
              {products
                .filter((item) => item.onTopRated)
                .slice(0, 3)
                .map((item, position) => (
                  <Col xs={4} sm={4} md={4} key={position}>
                    <div
                      className="product-container pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.categoryId)
                          : openUrlInNewTab("/category/" + item.categoryId)
                      }
                    >
                      <ImageLoader
                        alt={item.name}
                        src={app.FILE_URL + item.images[0]?.image}
                      />
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span>
                          {item.currency} {currencyFormatter(item.singlePrice)}
                        </span>
                      ) : (
                        <span>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                        </span>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Beauty Products</h3>
            <Row>
              {products
                .filter((item) => item.onBeauty)
                .slice(0, 3)
                .map((item, position) => (
                  <Col xs={4} sm={4} md={4} key={position}>
                    <div
                      className="product-container pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.categoryId)
                          : openUrlInNewTab("/category/" + item.categoryId)
                      }
                    >
                      <ImageLoader
                        alt={item.name}
                        src={app.FILE_URL + item.images[0]?.image}
                      />
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span>
                          {item.currency} {currencyFormatter(item.singlePrice)}
                        </span>
                      ) : (
                        <span>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                        </span>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Sale Products</h3>
            <Row>
              {products
                .filter((item) => item.onSale)
                .slice(0, 3)
                .map((item, position) => (
                  <Col xs={4} sm={4} md={4} key={position}>
                    <div
                      className="product-container pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.categoryId)
                          : openUrlInNewTab("/category/" + item.categoryId)
                      }
                    >
                      <ImageLoader
                        alt={item.name}
                        src={app.FILE_URL + item.images[0]?.image}
                      />
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span>
                          {item.currency} {currencyFormatter(item.singlePrice)}
                        </span>
                      ) : (
                        <span>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                        </span>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Best Selling Products</h3>
            <Row>
              {products
                .filter((item) => item.onBestSelling)
                .slice(0, 3)
                .map((item, position) => (
                  <Col xs={4} sm={4} md={4} key={position}>
                    <div
                      className="product-container pointer"
                      onClick={() =>
                        isMobile
                          ? navigate("/category/" + item.categoryId)
                          : openUrlInNewTab("/category/" + item.categoryId)
                      }
                    >
                      <ImageLoader
                        alt={item.name}
                        src={app.FILE_URL + item.images[0]?.image}
                      />
                      {item.priceType === PRICE_TYPE_ENUM.SINGLE ? (
                        <span>
                          {item.currency} {currencyFormatter(item.singlePrice)}
                        </span>
                      ) : (
                        <span>
                          {item.currency}{" "}
                          {currencyFormatter(item.prices[0]?.amount)}
                        </span>
                      )}
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
