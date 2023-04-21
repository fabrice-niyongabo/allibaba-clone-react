import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/scss/product.scss";
import { Col, Row } from "reactstrap";
import ProductImages from "./product-images";
import Supplier from "./supplier";

function SingleProduct() {
  return (
    <>
      <Header />
      <div className="afriseller-container single-product-container">
        <div className="categories">
          <ul>
            <li>
              <span>Home</span>
            </li>
            <li>/</li>
            <li>
              <span>All Industries</span>
            </li>
            <li>/</li>
            <li>
              <span>Consumer Electronics</span>
            </li>
            <li>/</li>
            <li>
              <span>Computer Hardware & software</span>
            </li>
            <li>/</li>
            <li>
              <span>Other computer accessories</span>
            </li>
          </ul>
        </div>
        <Row className="mt-4">
          <Col md={4}>
            <ProductImages />
          </Col>
          <Col md={5}>
            <p>
              New flexible dual 2 3 4 6 monitor holder arm desk bracket mount
              for computer screens up laptop adjustable lcd dual gas spring
            </p>
            <div className="prices-container">
              <Row>
                <Col md={4}>
                  <div className="price">
                    <span>1-10 Pieces</span>
                    <h3>20,000 RWF</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="price">
                    <span>1-10 Pieces</span>
                    <h3>20,000 RWF</h3>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="price">
                    <span>1-10 Pieces</span>
                    <h3>20,000 RWF</h3>
                  </div>
                </Col>
              </Row>
            </div>
            <p style={{ margin: 0, marginTop: 10 }}>Share this product:</p>
            <div className="share-container">
              <div>
                <i className="bi bi-facebook"></i>
              </div>
              <div>
                <i className="bi bi-twitter"></i>
              </div>
              <div>
                <i className="bi bi-instagram"></i>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <Supplier />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default SingleProduct;
