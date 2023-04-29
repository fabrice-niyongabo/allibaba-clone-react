import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Col, Row } from "reactstrap";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { app } from "../../components/constants";
import { errorHandler, toastMessage } from "../../components/helpers";

interface IregisterState {
  names: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  apply: boolean;
  terms: boolean;
}
const initialRegisterState: IregisterState = {
  names: "",
  email: "",
  phone: "" as any,
  confirmPassword: "",
  password: "",
  apply: false,
  terms: false,
};
function LoginRegister() {
  const [registerState, setRegisterState] = useState(initialRegisterState);
  const registerChangeHandler = (e: any) => {
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (!registerState.terms) {
      toast.error("Please accept our terms of use");
      return;
    }
    if (registerState.password.length <= 4) {
      toast.error("Password must be greater than 4 characters");
      return;
    }
    if (registerState.password !== registerState.confirmPassword) {
      toast.error("Passwords do no match");
      return;
    }

    if (!registerState.terms) {
      toast.error("Please accept our terms of use");
      return;
    }

    axios
      .post(app.BACKEND_URL + "/users/register", { ...registerState })
      .then((res) => {
        console.log({ data: res.data });
        toastMessage();
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
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
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <label htmlFor="">Fullname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="names"
                    onChange={registerChangeHandler}
                    value={registerState.names}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone. Ex: 078........."
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    name="phone"
                    onChange={registerChangeHandler}
                    value={registerState.phone}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={registerState.email}
                    onChange={registerChangeHandler}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={registerState.password}
                    onChange={registerChangeHandler}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Confrim Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={registerState.confirmPassword}
                    onChange={registerChangeHandler}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <div className="role">
                    <input
                      type="checkbox"
                      checked={registerState.apply}
                      onClick={() =>
                        setRegisterState({
                          ...registerState,
                          apply: !registerState.apply,
                        })
                      }
                    />
                    <span
                      onClick={() =>
                        setRegisterState({
                          ...registerState,
                          apply: !registerState.apply,
                        })
                      }
                    >
                      App to become a seller
                    </span>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="terms">
                    <input
                      type="checkbox"
                      checked={registerState.terms}
                      onClick={() =>
                        setRegisterState({
                          ...registerState,
                          terms: !registerState.terms,
                        })
                      }
                    />
                    <span
                      onClick={() =>
                        setRegisterState({
                          ...registerState,
                          terms: !registerState.terms,
                        })
                      }
                    >
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
