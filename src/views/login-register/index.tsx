import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Col, Row } from "reactstrap";
import "../../assets/scss/login.scss";

function LoginRegister() {
  return (
    <>
      <Header />
      <div className="afriseller-container my-5 login-main-container">
        <Row>
          <Col md={6} className="page-col">
            <div className="login-container">
              <h3>Login</h3>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="">Email Address</label>
                  <input
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="btn-container">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </Col>
          <Col md={6} className="page-col">
            <div className="register-container">
              <h3>Create Account</h3>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="">Fullname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Confrim Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Trade Role: </label>&nbsp;&nbsp;
                  <div className="role">
                    <input type="radio" name="role" required />
                    <span>Buyer</span>
                  </div>
                  <div className="role">
                    <input type="radio" name="role" required />
                    <span>Seller</span>
                  </div>
                  <div className="role">
                    <input type="radio" name="role" required />
                    <span>Both</span>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="terms">
                    <input type="checkbox" />
                    <span>
                      I agree to (a)Free Membership Agreement, (b) Terms of Use,
                      and (c) Privacy Policy. I agree to receive more
                      information from Afriseller.com about its products and
                      services
                    </span>
                  </div>
                </div>
                <div className="btn-container">
                  <button className="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default LoginRegister;
