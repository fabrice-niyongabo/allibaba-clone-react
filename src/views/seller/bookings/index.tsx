import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import "../../../assets/scss/wishlist.scss";
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
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Client's Email</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.product?.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.user.email}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="common-btn d-block"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-eye"></i> View More
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
