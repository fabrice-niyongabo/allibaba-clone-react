import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Col, Row } from "reactstrap";
import "../../assets/scss/memberships.scss";

function LoginRegister() {
  return (
    <>
      <Header />
      <div className="afriseller-container my-5 membership-main-container">
        <div className="contents-container">
          <Row>
            <Col md={3}>
              <div className="plan-contents">
                <h3>Free</h3>
                <div className="price">
                  <h3>0 RWF</h3>
                </div>
                <ul>
                  <li>-No of products 3</li>
                  <li>-Membership will not expired</li>
                </ul>
                <button>Buy Now</button>
              </div>
            </Col>
            <Col md={3}>
              <div className="plan-contents">
                <h3>Gold</h3>
                <div className="price">
                  <h3>80,000 RWF /1 Month</h3>
                </div>
                <ul>
                  <li>-No of products 10</li>
                  <li>-Membership expires after 1 Month</li>
                </ul>
                <button>Buy Now</button>
              </div>
            </Col>
            <Col md={3}>
              <div className="plan-contents">
                <h3>Silver</h3>
                <div className="price">
                  <h3>50,000 RWF /1 Month</h3>
                </div>
                <ul>
                  <li>-No of products 5</li>
                  <li>-Membership expires after 1 Month</li>
                </ul>
                <button>Buy Now</button>
              </div>
            </Col>
            <Col md={3}>
              <div className="plan-contents">
                <h3>Platinum</h3>
                <div className="price">
                  <h3>120,000 RWF /100 Year</h3>
                </div>
                <ul>
                  <li>-No of products 1000</li>
                  <li>-Membership expires after 100 Year</li>
                </ul>
                <button>Buy Now</button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginRegister;
