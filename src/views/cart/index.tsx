import { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { currencyFormatter, toastMessage } from "../../helpers";
import CartItem from "./item";
import "../../assets/scss/cart.scss";
import { ICartItem, TOAST_MESSAGE_TYPES } from "../../interfaces";
import Confirmation from "../../controllers/confirmation";
import { removeFromCart } from "../../actions/cart";
import { useNavigate } from "react-router-dom";
import Checkout from "./checkout";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.user);
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cartTotal, setCartTotal] = useState(0);
  const [selectectItem, setSelectedItem] = useState<ICartItem | undefined>(
    undefined
  );
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    calCulateCartTotal();
  }, [cart]);

  const calCulateCartTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    setCartTotal(total);
  };

  const handleRemove = () => {
    if (!selectectItem) return;
    dispatch(removeFromCart(selectectItem));
  };

  const handleCheckout = () => {
    if (token.trim().length === 0) {
      navigate("/login-register?redirect=cart");
      toastMessage(TOAST_MESSAGE_TYPES.INFO, "You must be logged in first");
    } else {
      setShowModal(true);
    }
  };
  return (
    <>
      <Header />
      <div className="shopin-container my-5 cart-main-container">
        <div className="alert alert-info">The delivery is within 6 hours.</div>
        <h2 className="text-center">Cart</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="alert alert-danger text-center">
                      Your cart is empty.
                    </div>
                  </td>
                </tr>
              )}
              {cart.length > 0 &&
                cart.map((item, index) => (
                  <CartItem
                    item={item}
                    key={index}
                    calCulateCartTotal={calCulateCartTotal}
                    setShowAlert={setShowAlert}
                    setSelectedItem={setSelectedItem}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <div className="border p-3">
              <h3>Cart total</h3>

              <p>
                <b>TOTAL: {currencyFormatter(cartTotal)} RWF</b>
              </p>

              <button
                className="common-btn w-100"
                disabled={cart.length === 0}
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
      <Confirmation
        callback={handleRemove}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        title="Do you want to remove this item from your cart?"
      />
      <Checkout
        showModal={showModal}
        setShowModal={setShowModal}
        cartTotal={cartTotal}
      />
    </>
  );
}

export default Cart;
