import React, { useState } from "react";
import "../../../assets/scss/homeWelcome.scss";
import { Col, Container, Row } from "reactstrap";
import Slider from "./slider";

import cameraImage from "../../../assets/images/static/camera.png";

function Welcome() {
  const [homeHover, setHomeHover] = useState(false);
  return (
    <div className="afriseller-container home-welcome">
      <Row>
        <Col md={3} className="w-container">
          <h3>All categories</h3>
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
                  homeHover ? "bi bi-house text-orange" : "bi bi-house"
                }
              />
              <span className={homeHover ? "text-orange" : ""}>
                Home Appliance
              </span>{" "}
              {homeHover ? (
                <i className="bi bi-chevron-right text-orange" />
              ) : (
                <i className="bi bi-chevron-down" />
              )}
              {homeHover && (
                <div className="category-menu">
                  <div className="row">
                    <div className="col-md-4">
                      <h3>Home Storage</h3>
                      <ul>
                        <li>Storage Boxes & Bins</li>
                        <li>Laundry baskets</li>
                        <li>Drawer organiser</li>
                        <li>Make up organiser</li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h3>Home Storage</h3>
                      <ul>
                        <li>Storage Boxes & Bins</li>
                        <li>Laundry baskets</li>
                        <li>Drawer organiser</li>
                        <li>Make up organiser</li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <h3>Home Storage</h3>
                      <ul>
                        <li>Storage Boxes & Bins</li>
                        <li>Laundry baskets</li>
                        <li>Drawer organiser</li>
                        <li>Make up organiser</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li>
              <i className="bi bi-bag" />
              <span>Bags</span>
            </li>
            <li>
              <i className="bi bi-bag" />
              <span>Fashion Accessories</span>
            </li>
            <li>
              <i className="bi bi-bag" />
              <span>Gifts</span>
            </li>
            <li>
              <i className="bi bi-bag" />
              <span>Electronics</span>
            </li>
            <li>
              <i className="bi bi-bag" />
              <span>ecurity & Protection</span>
            </li>
            <li>
              <i className="bi bi-bag" />
              <span>Health</span>
            </li>
          </ul>
        </Col>
        <Col md={6} className="slider-container">
          <Slider />
        </Col>
        <Col md={3} className="w-container new-products">
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
                <img src={cameraImage} />
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
                <img src={cameraImage} />
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
                <img src={cameraImage} />
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
                <img src={cameraImage} />
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
                <img src={cameraImage} />
              </div>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Welcome;
