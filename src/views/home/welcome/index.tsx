import React, { useState } from "react";
import "../../../assets/scss/homeWelcome.scss";
import { Col, Container, Row } from "reactstrap";
import Slider from "./slider";

import cameraImage from "../../../assets/images/static/camera.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function Welcome() {
  const [homeHover, setHomeHover] = useState(false);
  const { categories } = useSelector((state: RootState) => state.categories);
  return (
    <div className="afriseller-container home-welcome">
      <div style={{ backgroundColor: "#FFF" }}>
        <Row>
          <Col md={3} style={{ paddingRight: 0 }}>
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
                            <h3>{item.name}</h3>
                            <ul>
                              {item.subCategories.map((it, position) => (
                                <li key={position}>{it.name}</li>
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
                    <li key={position}>
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
          <Col md={6} className="m-0 p-0">
            <div className="slider-container">
              <Slider />
            </div>
          </Col>
          <Col md={3} style={{ paddingLeft: 0 }}>
            <div className="w-container new-products">
              <h3>New Products</h3>
              <ul>
                <li>
                  <div>
                    <p>
                      <b>Nikon Camera</b>
                    </p>
                    <span>200,000 RWF</span>
                  </div>
                  <div>
                    <img alt="" src={cameraImage} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>
                      <b>Nikon Camera</b>
                    </p>
                    <span>200,000 RWF</span>
                  </div>
                  <div>
                    <img alt="" src={cameraImage} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>
                      <b>Nikon Camera</b>
                    </p>
                    <span>200,000 RWF</span>
                  </div>
                  <div>
                    <img alt="" src={cameraImage} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>
                      <b>Nikon Camera</b>
                    </p>
                    <span>200,000 RWF</span>
                  </div>
                  <div>
                    <img alt="" src={cameraImage} />
                  </div>
                </li>
                <li>
                  <div>
                    <p>
                      <b>Nikon Camera</b>
                    </p>
                    <span>200,000 RWF</span>
                  </div>
                  <div>
                    <img alt="" src={cameraImage} />
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Welcome;
