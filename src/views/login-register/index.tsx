import { useState, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Col, Row } from "reactstrap";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { app } from "../../constants";
import { errorHandler, toastMessage } from "../../helpers";
import FullPageLoader from "../../components/full-page-loader";
import { IUser, TOAST_MESSAGE_TYPES, USER_ROLE_ENUM } from "../../interfaces";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import {
  setUserApply,
  setUserEmail,
  setUserId,
  setUserImage,
  setUserNames,
  setUserPhone,
  setUserRole,
  setUserShopId,
  setUserToken,
} from "../../actions/user";
import { useNavigate } from "react-router-dom";

interface IregisterState {
  names: string;
  email: string;
  phone: string;
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
const initialLoginState = {
  emailOrPhone: "",
  password: "",
};
function LoginRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [registerState, setRegisterState] = useState(initialRegisterState);
  const [loginState, setLoginState] = useState(initialLoginState);
  const phoneNumberRef = useRef<HTMLInputElement>();
  const registerChangeHandler = (e: any) => {
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (!isValidPhoneNumber(registerState.phone)) {
      toast.error(
        "Invalid phone number, please register with valid phone number"
      );
      phoneNumberRef.current && phoneNumberRef.current.focus();
      return;
    }
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
    setIsloading(true);
    axios
      .post(app.BACKEND_URL + "/users/register", { ...registerState })
      .then((res) => {
        const {
          userId,
          email,
          phone,
          image,
          // isActive,
          names,
          role,
          token,
          shopId,
        } = res.data.user as IUser;
        dispatch(setUserApply(registerState.apply));
        setRegisterState(initialRegisterState);
        dispatch(setUserId(userId));
        dispatch(setUserEmail(email));
        dispatch(setUserPhone(phone));
        dispatch(setUserImage(image));
        dispatch(setUserNames(names));
        dispatch(setUserShopId(shopId));
        dispatch(setUserRole(role));
        dispatch(setUserToken(token));
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setIsloading(false);
      })
      .catch((error) => {
        errorHandler(error);
        setIsloading(false);
      });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setIsloading(true);
    axios
      .post(app.BACKEND_URL + "/users/login", { ...loginState })
      .then((res) => {
        const {
          userId,
          email,
          phone,
          image,
          // isActive,
          names,
          role,
          token,
          shopId,
        } = res.data.user as IUser;
        dispatch(setUserId(userId));
        dispatch(setUserEmail(email));
        dispatch(setUserPhone(phone));
        dispatch(setUserImage(image));
        dispatch(setUserNames(names));
        dispatch(setUserRole(role));
        dispatch(setUserShopId(shopId));
        dispatch(setUserToken(token));
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setIsloading(false);

        const url = new URL(window.location.href);
        const pathValue = url.searchParams.get("redirect");
        if (pathValue && pathValue.trim().length > 1) {
          navigate(`/${pathValue}`);
          return;
        }
        // if (role === USER_ROLE_ENUM.ADMIN) {
        //   navigate("/dashboard/main");
        //   return;
        // }
        // if (role === USER_ROLE_ENUM.CLIENT) {
        //   navigate("/");
        //   return;
        // }
      })
      .catch((error) => {
        errorHandler(error);
        setIsloading(false);
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
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="">Email Address or phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email address or phone number"
                    value={loginState.emailOrPhone}
                    onChange={(e) =>
                      setLoginState({
                        ...loginState,
                        emailOrPhone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={loginState.password}
                    onChange={(e) =>
                      setLoginState({
                        ...loginState,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="btn-container">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
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
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={registerState.phone}
                    onChange={(e) => {
                      setRegisterState({ ...registerState, phone: e as any });
                    }}
                    defaultCountry="RW"
                    error={
                      registerState.phone
                        ? isValidPhoneNumber(registerState.phone)
                          ? undefined
                          : "Invalid phone number"
                        : "Phone number required"
                    }
                    numberInputProps={{
                      className: "form-control",
                      ref: phoneNumberRef,
                    }}
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
                      Apply to become a seller
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
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
      <FullPageLoader open={isLoading} />
    </>
  );
}

export default LoginRegister;
