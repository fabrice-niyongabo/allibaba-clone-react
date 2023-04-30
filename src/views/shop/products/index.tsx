import React from "react";
import { Col, Row } from "reactstrap";

import image from "../../../assets/images/static/2.jpg";

function Products() {
  return (
    <div>
      <h3>Products</h3>
      <Row>
        <Col md={2}>
          <div className="categories">
            <ul>
              <li className="active">
                <i className="bi bi-arrow-right-circle"></i>
                <span>All Categories</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
              <li>
                <i className="bi bi-arrow-right-circle"></i>
                <span>Industrial PC Motherboard</span>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={10}>
          <Row>
            <Col md={3} sm={6} xs={6} className="mb-3">
              <div className="product-item">
                <img alt="" src={image} />
                <div className="description">
                  <span>
                    OEM 27 inch 4K gaming monitor 144Hz FreeSync HDR PC Monitor
                  </span>
                  <div className="price">5,000 RWF</div>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} xs={6} className="mb-3">
              <div className="product-item">
                <img alt="" src={image} />
                <div className="description">
                  <span>
                    OEM 27 inch 4K gaming monitor 144Hz FreeSync HDR PC Monitor
                  </span>
                  <div className="price">5,000 RWF</div>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} xs={6} className="mb-3">
              <div className="product-item">
                <img alt="" src={image} />
                <div className="description">
                  <span>
                    OEM 27 inch 4K gaming monitor 144Hz FreeSync HDR PC Monitor
                  </span>
                  <div className="price">5,000 RWF</div>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} xs={6} className="mb-3">
              <div className="product-item">
                <img alt="" src={image} />
                <div className="description">
                  <span>
                    OEM 27 inch 4K gaming monitor 144Hz FreeSync HDR PC Monitor
                  </span>
                  <div className="price">5,000 RWF</div>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6} xs={6} className="mb-3">
              <div className="product-item">
                <img alt="" src={image} />
                <div className="description">
                  <span>
                    OEM 27 inch 4K gaming monitor 144Hz FreeSync HDR PC Monitor
                  </span>
                  <div className="price">5,000 RWF</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Products;
