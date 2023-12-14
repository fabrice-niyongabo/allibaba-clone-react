import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardFooter, CardTitle, Col, Row } from "reactstrap";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import FullPageLoader from "../../components/full-page-loader";
import { TOAST_MESSAGE_TYPES, USER_ROLE_ENUM } from "../../interfaces";
import { errorHandler, setHeaders, toastMessage } from "../../helpers";
import { RootState } from "../../reducers";
import PhoneInput from "react-phone-number-input";
import { app } from "../../constants";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  names: "",
  phone: "",
};
const initialPwdState = {
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
};
const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState(initialState);
  const [pwdState, setPwdState] = useState(initialPwdState);
  const { email, names, phone, token, role } = useSelector(
    (state: RootState) => state.user
  );
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!isValidPhoneNumber(state.phone)) {
        toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Phone number, is invalid.");
        return;
      }
    } catch (error) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Phone number, is invalid.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.put(
        app.BACKEND_URL + "/users/info",
        state,
        setHeaders(token)
      );
      setIsLoading(false);
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
    } catch (error) {
      errorHandler(error);
      setIsLoading(false);
    }
  };

  const handleChangePwd = async (e: any) => {
    e.preventDefault();
    if (pwdState.newPassword.length < 5) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "Password must be greater or equal to five characters long."
      );
      return;
    }
    if (pwdState.newPassword !== pwdState.newPassword2) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.put(
        app.BACKEND_URL + "/users/pwd",
        pwdState,
        setHeaders(token)
      );
      setIsLoading(false);
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
    } catch (error) {
      errorHandler(error);
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: string) => {
    try {
      setState({ ...state, phone: e });
    } catch (error) {}
  };

  useEffect(() => {
    setState({
      email,
      names,
      phone,
    });
  }, []);

  return (
    <div>
      <Row>
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Basic info
              </CardTitle>
              <CardBody>
                <div className="form-group my-2">
                  <label htmlFor="">Names</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="form-control"
                    value={state.names}
                    onChange={(e) => {
                      setState({ ...state, names: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="">Phone Number</label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={state.phone}
                    onChange={handlePhoneChange}
                    defaultCountry="RW"
                    error={
                      state.phone
                        ? isValidPhoneNumber(state.phone)
                          ? undefined
                          : "Invalid phone number"
                        : "Phone number required"
                    }
                    numberInputProps={{
                      className: "form-control",
                    }}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="form-control"
                    value={state.email}
                    onChange={(e) => {
                      setState({ ...state, email: e.target.value });
                    }}
                    required
                  />
                </div>
              </CardBody>
              <CardFooter>
                <button type="submit" className="btn btn-primary">
                  Update info
                </button>
              </CardFooter>
            </Card>
          </form>
        </Col>
        <Col md={6}>
          <Card>
            <form onSubmit={handleChangePwd}>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Change Password
              </CardTitle>
              <CardBody>
                <div className="form-group my-2">
                  <label htmlFor="">Current Password</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="form-control"
                    value={pwdState.oldPassword}
                    onChange={(e) =>
                      setPwdState({ ...pwdState, oldPassword: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="">New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                    value={pwdState.newPassword}
                    onChange={(e) =>
                      setPwdState({ ...pwdState, newPassword: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="form-control"
                    value={pwdState.newPassword2}
                    onChange={(e) =>
                      setPwdState({ ...pwdState, newPassword2: e.target.value })
                    }
                    required
                  />
                </div>
              </CardBody>
              <CardFooter>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </CardFooter>
            </form>
          </Card>
        </Col>
      </Row>
      {(role === USER_ROLE_ENUM.CLIENT || role === USER_ROLE_ENUM.SELLER) && (
        <Card>
          <CardBody>
            <p className="text-danger">
              <b>Danger zone</b>
            </p>
            <div className="alert alert-danger text-center">
              <Link to={"/account/remove"} className="text-danger">
                <small>Delete and disable your account</small>
              </Link>
            </div>
          </CardBody>
        </Card>
      )}

      <FullPageLoader open={isLoading} />
    </div>
  );
};

export default Profile;
