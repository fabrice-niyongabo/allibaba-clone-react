import React from "react";
import { Col, Row } from "reactstrap";

import img1 from "../../../assets/images/static/electronics.jpg";
import img2 from "../../../assets/images/static/1.jpg";
function Categories() {
  return (
    <div className="afriseller-container my-3 home-products-by-category">
      <h3>ELECTRONICS</h3>
      <Row>
        <Col md={4} style={{ height: "100%" }}>
          <div className="icon">
            <img alt="" src={img1} />
          </div>
        </Col>
        <Col md={8}>
          <Row>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Apple iphone 12</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
            <Col sm={6} md={3} className="product-container">
              <h3>Face Cleansing Solution</h3>
              <img alt="" src={img2} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Categories;
