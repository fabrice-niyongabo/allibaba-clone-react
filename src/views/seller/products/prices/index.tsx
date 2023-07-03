import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import {
  IProduct,
  IProductPrice,
  TOAST_MESSAGE_TYPES,
} from "../../../../interfaces";
import { app } from "../../../../components/constants";
import { Link } from "react-router-dom";
import Confirmation from "../../../../components/controllers/confirmation";
import FullPageLoader from "../../../../components/full-page-loader";
import {
  currencyFormatter,
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
const initialState: IProductPrice = {
  ppId: "" as any,
  shopId: "" as any,
  productId: "" as any,
  name: "",
  amount: "" as any,
};
function Prices({
  showModal,
  setShowModal,
  selectedItem,
  allProducts,
  fetchData,
}: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  //

  const [state, setState] = useState(initialState);
  const [editItem, setEditItem] = useState<IProductPrice | undefined>(
    undefined
  );
  const [editState, setEditState] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteItem, setDeleteItem] = useState<IProductPrice | undefined>(
    undefined
  );
  const [isDeleting, setIsDeleting] = useState(false);
  //

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

  //

  const handleEditSubmit = () => {
    if (
      editState.name.trim() === "" ||
      String(editState.amount).trim() === ""
    ) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "All fields are mandatory");
      return;
    }
    setIsEditing(true);
    axios
      .put(
        app.BACKEND_URL + "/products/prices/",
        {
          ...editState,
        },
        setHeaders(token)
      )
      .then((res) => {
        setIsEditing(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setEditItem(undefined);
        setEditState(initialState);
        fetchData();
      })
      .catch((error) => {
        setIsEditing(false);
        errorHandler(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsloading(true);
    axios
      .post(
        app.BACKEND_URL + "/products/prices/",
        {
          ...state,
          productId: product?.pId,
        },
        setHeaders(token)
      )
      .then((res) => {
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setState(initialState);
        setIsloading(false);
        fetchData();
      })
      .catch((error) => {
        setIsloading(false);
        errorHandler(error);
      });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    axios
      .delete(
        app.BACKEND_URL + "/products/prices/" + deleteItem?.ppId,
        setHeaders(token)
      )
      .then((res) => {
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setDeleteItem(undefined);
        setIsDeleting(false);
        fetchData();
      })
      .catch((error) => {
        setIsDeleting(false);
        errorHandler(error);
      });
  };

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  //
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
            Prices for {selectedItem && selectedItem.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>P/U</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product &&
                      product.prices.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {editItem && editItem.ppId === item.ppId ? (
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Title  ex: 1-100 pc"
                                value={editState.name}
                                onChange={(e) =>
                                  setEditState({
                                    ...editState,
                                    name: e.target.value,
                                  })
                                }
                                required
                              />
                            ) : (
                              item.name
                            )}
                          </td>
                          <td>
                            {editItem && editItem.ppId === item.ppId ? (
                              <input
                                type="number"
                                name="amount"
                                className="form-control"
                                placeholder={`Amount in ${selectedItem?.currency}`}
                                value={editState.amount}
                                onChange={(e) =>
                                  setEditState({
                                    ...editState,
                                    amount: e.target.value as any,
                                  })
                                }
                                required
                              />
                            ) : (
                              product.currency +
                              " " +
                              currencyFormatter(item.amount)
                            )}
                          </td>
                          <td>
                            {editItem && editItem.ppId === item.ppId ? (
                              <>
                                <button
                                  disabled={isEditing}
                                  className="btn text-primary"
                                  onClick={() => handleEditSubmit()}
                                >
                                  {isEditing ? "Saving..." : "Save"}
                                </button>
                                &nbsp; &nbsp;
                                <button
                                  disabled={isEditing}
                                  className="btn text-warning"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setEditItem(undefined);
                                    setEditState(initialState);
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <span
                                  className="text-primary"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setEditItem(item);
                                    setEditState(item);
                                  }}
                                >
                                  Edit
                                </span>
                                &nbsp; &nbsp;
                                <span
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    if (
                                      !(
                                        isDeleting &&
                                        deleteItem?.ppId === item.ppId
                                      )
                                    ) {
                                      setDeleteItem(item);
                                      setShowAlert(true);
                                    }
                                  }}
                                >
                                  Delete
                                </span>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col md={4}>
              <form onSubmit={handleSubmit}>
                <h3>Add price</h3>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Title  ex: 1-100 pc"
                    value={state.name}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    placeholder={`Amount in ${product?.currency}`}
                    value={state.amount}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this price?"
      />
    </div>
  );
}

export default Prices;
