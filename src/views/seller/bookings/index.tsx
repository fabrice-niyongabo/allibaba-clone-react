import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import "../../assets/scss/wishlist.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import ViewProduct from "./view-product";
import { RootState } from "../../../reducers";
import { IBookingForSupplier } from "../../../interfaces";
import { app } from "../../../constants";
import { errorHandler, setHeaders } from "../../../helpers";
import Loader from "../../../layouts/loader/Loader";
import ImageLoader from "../../../components/image-loader";

const BookedProducts = () => {
  const { token, shopId } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<IBookingForSupplier[]>([]);
  const [selectedItem, setSelectedItem] = useState<
    IBookingForSupplier | undefined
  >(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(app.BACKEND_URL + "/booking/" + shopId, setHeaders(token))
      .then((res) => {
        setBookings(res.data.booking);
        setIsLoading(false);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Booked Products
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
                      className="common-btn d-block"
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
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
      {showModal && (
        <ViewProduct
          showModal={showModal}
          setShowModal={setShowModal}
          booked={selectedItem}
        />
      )}
    </div>
  );
};

export default BookedProducts;
