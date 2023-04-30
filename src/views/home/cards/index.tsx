import React from "react";
import { Col, Row } from "reactstrap";

import ring from "../../../assets/images/static/3.jpg";
import dress from "../../../assets/images/static/1.jpg";
import parfume from "../../../assets/images/static/2.jpg";
function Cards() {
  return (
    <div className="afriseller-container home-cards-container">
      <Row>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>New Arrivals</h3>
            <Row>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={ring} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={dress} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={parfume} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Electronics Items</h3>
            <Row>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={ring} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={dress} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={parfume} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Top Rated Products</h3>
            <Row>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={ring} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={dress} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={parfume} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Beauty Products</h3>
            <Row>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={ring} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={dress} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={parfume} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Sale Products</h3>
            <Row>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={ring} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={dress} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={parfume} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="afriseller-card">
            <h3>Best Selling Products</h3>
            <Row>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={ring} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={dress} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
              <Col sm={4}>
                <div className="product-container">
                  <img alt="" src={parfume} />
                  <span>5,000 RWF</span>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
