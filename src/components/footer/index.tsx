import React from "react";
import "../../assets/scss/footer.scss";
import { Col, Row } from "reactstrap";

function Footer() {
  return (
    <footer>
      <div className="afriseller-container">
        <Row>
          <Col md={4} sm={6} xs={12}>
            <h3>Our Company</h3>
            <ul>
              <li>Home</li>
              <li>Start Selling</li>
              <li>My Account</li>
              <li>Shop</li>
            </ul>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <h3>Help</h3>
            <ul>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Support</li>
            </ul>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <h3>Sell</h3>
            <ul>
              <li>Supplier Memberships</li>
              <li>Learning Center</li>
              <li>Training Center</li>
            </ul>
          </Col>
        </Row>
        <div className="copy">
          Copyright © {new Date().getFullYear()} Afriseller
        </div>
      </div>
    </footer>
  );
}

export default Footer;
