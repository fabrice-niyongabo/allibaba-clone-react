import { useState } from "react";
import { Card, CardBody } from "reactstrap";
import Confirmation from "../../controllers/confirmation";
import Header from "../../components/header";
import { errorHandler, setHeaders, toastMessage } from "../../helpers";
import { TOAST_MESSAGE_TYPES } from "../../interfaces";
import FullPageLoader from "../../components/full-page-loader";
import axios from "axios";
import { app } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../actions/user";

function RemoveAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.user);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [acceptTems, setAcceptTerms] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClik = () => {
    if (feedback.trim().length < 10) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "Feedback can not be less that 10 characters"
      );
      return;
    }
    if (email.trim().length === 0) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "Please confirm your account's email address"
      );
      return;
    }
    if (!acceptTems) {
      toastMessage(
        TOAST_MESSAGE_TYPES.ERROR,
        "You must agree to account deleting terms."
      );
      return;
    }
    setShowAlert(true);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(app.BACKEND_URL + "users/delete", setHeaders(token))
      .then((res) => {
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        dispatch(resetUser());
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };
  return (
    <>
      <Header />
      <div className="mt-5 afriseller-container">
        <h3 className="text-center">Remove/delete your user account</h3>
        <Card className="mt-5">
          <CardBody className="p-5">
            <div>
              <p>Before you proceed, please consider the following:</p>

              <ul>
                <li>
                  <strong>Data Deletion:</strong> Deleting your account will
                  permanently remove all associated data, including profile
                  information and activity history.
                </li>
                <li>
                  <strong>Irreversible Action:</strong> This action is
                  irreversible. Once your account is deleted, it cannot be
                  recovered.
                </li>
                <li>
                  <strong>Reauthentication:</strong> For security reasons, we
                  may ask you to re-enter your password to confirm the deletion.
                </li>
              </ul>

              <p>
                If you still wish to proceed, please click the "Delete My
                Account" button below.
              </p>
            </div>
            <div className="border p-3">
              <div className="form-group">
                <label htmlFor="">
                  Why do you want to delete your account?
                </label>
                <textarea
                  className="form-control my-3"
                  placeholder="Leave us some feedback"
                  style={{ fontSize: 12 }}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">
                  Enter your email address for confirmation.
                </label>
                <input
                  type="email"
                  className="form-control my-3"
                  placeholder="Enter your account's"
                  style={{ fontSize: 12 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className="pointer"
                style={{ userSelect: "none" }}
                onClick={() => setAcceptTerms(!acceptTems)}
              >
                <input type="checkbox" checked={acceptTems} /> I agree that my
                account will be deleted immediately and I will not complain for
                anything to afrisellers whether money or any data.
              </div>
              <button
                onClick={() => handleClik()}
                className="common-btn w-100 mt-3"
              >
                Delete account
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        title="Are you sure you want to delete your account?"
        callback={handleSubmit}
      />
      <FullPageLoader open={isLoading} />
    </>
  );
}

export default RemoveAccount;
