import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import {
  IProduct,
  IProductImage,
  TOAST_MESSAGE_TYPES,
} from "../../../../interfaces";
import { app } from "../../../../components/constants";
import { Link } from "react-router-dom";
import Confirmation from "../../../../components/controllers/confirmation";
import FullPageLoader from "../../../../components/full-page-loader";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../../components/helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";

interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: IProduct | undefined;
  fetchData: any;
  allProducts: IProduct[];
}
function Images({
  showModal,
  setShowModal,
  selectedItem,
  allProducts,
  fetchData,
}: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [tobedeleted, setTobeDeleted] = useState<IProductImage | undefined>(
    undefined
  );
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  useEffect(() => {
    if (showModal) {
      const prod = allProducts.find((item) => item.pId == selectedItem?.pId);
      if (prod) {
        setProduct(prod);
      }
    }
  }, [showModal, allProducts]);

  useEffect(() => {
    if (showModal) {
      fetchData();
    }
  }, [showModal]);

  const handleDelete = () => {
    setIsloading(true);
    axios
      .delete(
        app.BACKEND_URL + "/products/image/" + tobedeleted?.id,
        setHeaders(token)
      )
      .then((res) => {
        setIsloading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        fetchData();
      })
      .catch((error) => {
        errorHandler(error);
        setIsloading(false);
      });
  };
  return (
    <div>
      <FullPageLoader open={isLoading} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>
            Images for {selectedItem && selectedItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {selectedItem &&
              product &&
              product.images.map((item, position) => (
                <Col md={4} key={position}>
                  <img
                    src={app.FILE_URL + item.image}
                    style={{ width: "100%" }}
                    alt=""
                  />
                  <button
                    className="btn btn-danger mt-2 w-100"
                    onClick={() => {
                      setTobeDeleted(item);
                      setShowAlert(true);
                    }}
                  >
                    Delete
                  </button>
                </Col>
              ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Link
            onClick={() => setShowModal(false)}
            to={`/dashboard/product/${selectedItem?.pId}`}
            target="_blank"
          >
            <button className="btn btn-primary">Add Image</button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Confirmation
        callback={handleDelete}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        title="Do you want to delete this image?"
      />
    </div>
  );
}

export default Images;
