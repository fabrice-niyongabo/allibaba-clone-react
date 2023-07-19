import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { RootState } from "../../reducers";
import { fetchWishlist } from "../../actions/wishlist";
import Loader from "../../layouts/loader/Loader";
import ImageLoader from "../../components/image-loader";
import { app } from "../../constants";
import "../../assets/scss/wishlist.scss";
import { Link } from "react-router-dom";
import { IProduct, TOAST_MESSAGE_TYPES } from "../../interfaces";
import Confirmation from "../../controllers/confirmation";
import FullPageLoader from "../../components/full-page-loader";
import axios from "axios";
import { errorHandler, setHeaders, toastMessage } from "../../helpers";
import { fetchBooking } from "../../actions/bookings";

const BookedProducts = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const { isLoading, bookings } = useSelector(
    (state: RootState) => state.bookings
  );
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | undefined>(
    undefined
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleDelete = () => {
    setIsSubmiting(true);

    axios
      .delete(
        app.BACKEND_URL + "/wishlist/" + selectedItem?.pId,
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmiting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        dispatch(fetchWishlist());
      })
      .catch((error) => {
        setIsSubmiting(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    dispatch(fetchBooking());
  }, []);

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          My Wishlist
        </CardTitle>
        <CardBody>
          {isLoading && bookings.length === 0 ? (
            <Loader />
          ) : (
            <Row>
              {bookings.map((item, index) => (
                <Col md={3} key={index}>
                  <div className="wishlist-card-item shadow">
                    <Link to={"/product/" + item.productId}>
                      <ImageLoader
                        src={
                          (app.FILE_URL as string) +
                          item.product?.images[0].image
                        }
                      />
                    </Link>
                    <p>{item.product?.name}</p>
                    <button
                      className="common-btn"
                      onClick={() => {
                        // setSelectedItem(item);
                        setShowAlert(true);
                      }}
                    >
                      <i className="bi bi-eye"></i> View More
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </CardBody>
      </Card>
      <Confirmation
        title={`Do you want to remove ${selectedItem?.name} from your wishlist?`}
        callback={handleDelete}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
      <FullPageLoader open={isSubmiting} />
    </div>
  );
};

export default BookedProducts;
