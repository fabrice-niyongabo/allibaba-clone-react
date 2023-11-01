import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
import Confirmation from "../../../controllers/confirmation";
import { RootState } from "../../../reducers";
import FullPageLoader from "../../../components/full-page-loader";
import {
  currencyFormatter,
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../helpers";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import {
  IPAYMENT_METHODS_ENUM,
  TOAST_MESSAGE_TYPES,
} from "../../../interfaces";
import { app } from "../../../constants";
import { toast } from "react-toastify";
import { resetCart } from "../../../actions/cart";
import { useNavigate } from "react-router-dom";

const initilaState = {
  deliveryAddress: "",
  deliveryContactNumber: "",
  deliveryDescription: "",
  paymentMethod: IPAYMENT_METHODS_ENUM.MOMO,
  paymentPhoneNumber: "",
};
interface ICheckoutProps {
  showModal: boolean;
  setShowModal: any;
  cartTotal: number;
}
function Checkout({ showModal, setShowModal, cartTotal }: ICheckoutProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, phone } = useSelector((state: RootState) => state.user);
  const { cart } = useSelector((state: RootState) => state.cart);
  const validPhoneCode = ["8", "9", "2", "3"];
  const [showAlert, setShowAlert] = useState(false);
  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deliveryFees, setDeliveryFees] = useState(0);

  const approveSubmition = (e: any) => {
    e.preventDefault();
    setShowAlert(true);
  };

  const handleSubmit = () => {
    if (!isValidPhoneNumber(state.deliveryContactNumber)) {
      toast.error("Invalid phone number, please provide a valid phone number");
      // phoneNumberRef.current && phoneNumberRef.current.focus();
      return;
    }

    if (state.paymentMethod === IPAYMENT_METHODS_ENUM.MOMO) {
      if (state.paymentPhoneNumber.trim() === "") {
        toastMessage(
          TOAST_MESSAGE_TYPES.ERROR,
          "Please provide payment phone number"
        );
        return;
      }
      if (
        !validPhoneCode.includes(state.paymentPhoneNumber[2]) ||
        state.paymentPhoneNumber[0] !== "0" ||
        state.paymentPhoneNumber[1] !== "7" ||
        state.paymentPhoneNumber.length !== 10
      ) {
        toastMessage(
          TOAST_MESSAGE_TYPES.ERROR,
          "Invalid phone number. Please provide a valid MOMO phone number (MTN or AIRTEL-TIGO)."
        );
        return;
      }
    }

    setIsSubmitting(true);
    axios
      .post(
        app.BACKEND_URL + "/orders",
        {
          ...state,
          cartItems: cart,
        },
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmitting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        if (
          state.paymentMethod === IPAYMENT_METHODS_ENUM.CARD &&
          res.data?.url
        ) {
          dispatch(resetCart());
          window.location = res.data.url;
          setIsSubmitting(true);
        } else {
          dispatch(resetCart());
          navigate("/dashboard/orders");
        }
      })
      .catch((error) => {
        errorHandler(error);
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, deliveryContactNumber: phone }));
  }, []);

  useEffect(() => {
    if (cartTotal >= 20000) {
      setDeliveryFees(0);
    } else {
      setDeliveryFees(1500);
    }
  }, [cartTotal]);
  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <form onSubmit={approveSubmition}>
          <Modal.Body>
            <Row>
              <Col md="6" className="mb-3">
                <div className="border p-2">
                  <small>
                    <b>Delivery information</b>
                  </small>
                  <hr />
                  <div className="form-group mb-2">
                    <label htmlFor="">Delivery Address *</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      value={state.deliveryAddress}
                      onChange={(e: any) =>
                        setState((prev) => ({
                          ...prev,
                          deliveryAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="">Delivery contact number *</label>

                    <PhoneInput
                      placeholder="Enter phone number"
                      value={state.deliveryContactNumber}
                      onChange={(e: any) => {
                        setState((prev) => ({
                          ...prev,
                          deliveryContactNumber: e,
                        }));
                      }}
                      defaultCountry="RW"
                      error={
                        state.deliveryContactNumber
                          ? isValidPhoneNumber(state.deliveryContactNumber)
                            ? undefined
                            : "Invalid phone number"
                          : "Phone number required"
                      }
                      numberInputProps={{
                        className: "form-control",
                      }}
                    />
                  </div>
                  <div className="form-group mb-2 mt-3">
                    <label htmlFor="">
                      Other delivery info/details (optional)
                    </label>
                    <textarea
                      placeholder="Other info/details/description"
                      className="form-control"
                      style={{ minHeight: 150 }}
                      value={state.deliveryDescription}
                      onChange={(e: any) =>
                        setState((prev) => ({
                          ...prev,
                          deliveryDescription: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <small>
                  <b>Order Summary</b>
                </small>
                <hr />

                <div className="form-group mb-2">
                  <label htmlFor="">Payment method</label>
                  <br />
                  <span
                    className="pointer"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        paymentMethod: IPAYMENT_METHODS_ENUM.MOMO,
                      }))
                    }
                  >
                    <input
                      required
                      type="radio"
                      name="method"
                      checked={
                        state.paymentMethod === IPAYMENT_METHODS_ENUM.MOMO
                      }
                    />{" "}
                    MOMO
                  </span>
                  &nbsp;|&nbsp;
                  <span
                    className="pointer"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        paymentMethod: IPAYMENT_METHODS_ENUM.CARD,
                        paymentPhoneNumber: "",
                      }))
                    }
                  >
                    <input
                      required
                      type="radio"
                      name="method"
                      checked={
                        state.paymentMethod === IPAYMENT_METHODS_ENUM.CARD
                      }
                    />{" "}
                    CARD
                  </span>
                  &nbsp;|&nbsp;
                  <span
                    className="pointer"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        paymentMethod: IPAYMENT_METHODS_ENUM.MOMO_CODE,
                        paymentPhoneNumber: "",
                      }))
                    }
                  >
                    <input
                      required
                      type="radio"
                      name="method"
                      checked={
                        state.paymentMethod === IPAYMENT_METHODS_ENUM.MOMO_CODE
                      }
                    />{" "}
                    MOMO CODE
                  </span>
                </div>

                {state.paymentMethod === IPAYMENT_METHODS_ENUM.MOMO_CODE && (
                  <>
                    <div className="form-group mb-2 alert alert-info">
                      Our momo code is: <b>646633</b>
                    </div>
                    <div className="form-group mb-2 alert alert-danger">
                      <i className="bi bi-exclamation-triangle"></i> After
                      completing the payment on our momo code shown above,
                      please send us a screenshoot of your payment on our
                      whatsapp number so that we can confirm your order manually
                      in our system.
                    </div>
                  </>
                )}
                {state.paymentMethod === IPAYMENT_METHODS_ENUM.MOMO && (
                  <div className="form-group mb-2">
                    <label htmlFor="">MOMO payment phone number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: 07xxxxxxxx"
                      required
                      value={state.paymentPhoneNumber}
                      onChange={(e: any) =>
                        setState((prev) => ({
                          ...prev,
                          paymentPhoneNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <b>DELIVERY FEES</b>
                      </td>
                      <td align="right">
                        {currencyFormatter(deliveryFees)} RWF
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>CART ITEMS</b>
                      </td>
                      <td align="right">{cart.length}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>SUBTOTAL</b>
                      </td>
                      <td align="right">{currencyFormatter(cartTotal)} RWF</td>
                    </tr>
                    <tr>
                      <td>
                        <b>GENERAL TOTAL</b>
                      </td>
                      <td align="right">
                        {currencyFormatter(cartTotal + deliveryFees)} RWF
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="common-btn w-100">
                  {isSubmitting && <Spinner size="sm" color="white" />}
                  Checkout
                </button>
              </Col>
            </Row>
          </Modal.Body>
        </form>
      </Modal>

      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        title={`Do you want to approve this transaction?`}
        callback={handleSubmit}
      />
    </div>
  );
}

export default Checkout;
