import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/scss/startSelling.scss";
import banner from "../../assets/images/start-selling-banner.png";
import { Col, Row } from "reactstrap";

function StartSelling() {
  return (
    <>
      <Header />
      <div
        className="start-selling-banner"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <h2>
          Millions of shoppers can’t wait to see <br />
          What you have in store
        </h2>
        <button>
          <i className="bi bi-shop"></i>
          <span>Open Your Shop</span>
        </button>
      </div>
      <div className="afriseller-container my-5 start-selling-container">
        <h1>
          Join a creative marketplace where 24 million buyers around The world
          shop for unique items
        </h1>
        <Row className="mt-5">
          <Col md={4}>
            <div className="item">
              <i className="bi bi-wallet2"></i>
              <h3>Low fees</h3>
              <span>
                Starting an online business can mean significantly low start up
                costs.
              </span>
            </div>
          </Col>
          <Col md={4}>
            <div className="item">
              <i className="bi bi-tools"></i>
              <h3>Powerful tools</h3>{" "}
              <span>
                While choosing a tool we should keep in mind about SEO,
                mobile-friendliness, onsite search which makes your site most
                popular among others.
              </span>
            </div>
          </Col>
          <Col md={4}>
            <div className="item">
              <i className="bi bi-chat-text"></i>
              <h3>Support and Education</h3>
              <span>
                It deserves best training and support including the role based
                systems as well as the administrators.
              </span>
            </div>
          </Col>
        </Row>
        <div className="button-container">
          <button>Open Your Shop</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StartSelling;
