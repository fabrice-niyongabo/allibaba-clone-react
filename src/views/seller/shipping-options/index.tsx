import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { RootState } from "../../../reducers";
import axios from "axios";
import { app } from "../../../constants";
import {
  currencyFormatter,
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../helpers";
import FullPageLoader from "../../../components/full-page-loader";
import { IShippingEstimation, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import Edit from "./edit";
import Confirmation from "../../../controllers/confirmation";
import countries from "../../../constants/countries.json";
import { currencies } from "currencies.json";

const initialState = {
  toCountry: "",
  minAmount: "",
  maxAmount: "",
  currency: "",
};
function ShippingOptions() {
  const { token, userId } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsloading] = useState(false);
  const [estimations, setEstimations] = useState<IShippingEstimation[]>([]);
  const [state, setState] = useState(initialState);

  const { myShop } = useSelector((state: RootState) => state.myShop);

  //
  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    IShippingEstimation | undefined
  >(undefined);
  //

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchEstimations();
  }, []);

  const fetchEstimations = () => {
    setIsloading(true);
    axios
      .get(app.BACKEND_URL + "/estimation/" + userId)
      .then((res) => {
        setIsloading(false);
        setEstimations(res.data.estimations);
      })
      .catch((error) => {
        setIsloading(false);
        errorHandler(error);
      });
  };

  const handleDelete = async () => {
    setIsloading(true);
    try {
      setIsloading(false);
      const res = await axios.delete(
        app.BACKEND_URL + "/estimation/" + selectedItem?.id,
        setHeaders(token)
      );
      toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      setEstimations(
        estimations.filter((item) => item.id !== selectedItem?.id)
      );
      setSelectedItem(undefined);
      setIsloading(false);
    } catch (error) {
      errorHandler(error);
      setIsloading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsloading(true);
    axios
      .post(
        app.BACKEND_URL + "/estimation/",
        { ...state, fromCountry: myShop?.country },
        setHeaders(token)
      )
      .then((res) => {
        setIsloading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        setEstimations(res.data.estimations);
      })
      .catch((error) => {
        setIsloading(false);
        errorHandler(error);
      });
  };
  return (
    <div>
      <FullPageLoader open={isLoading} />
      <Row>
        <Col md={8}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Shipping Estimations
            </CardTitle>
            <CardBody>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </thead>
                  <tbody style={{ borderTopWidth: 0 }}>
                    {/* {products.map((item, position) => (
                      <tr key={position}>
                        <td>{item.pId}</td>
                        <td>{item.name}</td>
                        <td>{getCategoryName(item.categoryId)}</td>
                        <td>
                          {getSubCategoryName(
                            item.categoryId,
                            item.subCategoryId
                          )}
                        </td>
                        <td></td>
                        <td>
                          <span
                            className="text-primary pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowEdit(true);
                            }}
                          >
                            Edit
                          </span>
                          &nbsp;|&nbsp;
                          <span
                            className="text-danger pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              setShowAlert(true);
                            }}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Add estimation
            </CardTitle>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="">From</label>
                  <input
                    className="form-control"
                    disabled
                    value={myShop?.country}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">To (destination)</label>
                  <select
                    className="form-select"
                    value={state.toCountry}
                    onChange={changeHandler}
                    name="toCountry"
                    required
                  >
                    <option value="">Choose Destination</option>
                    {countries.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Minimum Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={state.minAmount}
                    onChange={changeHandler}
                    name="minAmount"
                    placeholder="Enter minimum amount"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Maximum Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={state.maxAmount}
                    onChange={changeHandler}
                    name="maxAmount"
                    placeholder="Enter maximum amount"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Currency</label>
                  <select
                    className="form-select"
                    value={state.currency}
                    onChange={changeHandler}
                    name="currency"
                    required
                  >
                    <option value="">Choose Currency</option>
                    {currencies.map((item, index) => (
                      <option key={index} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this product?"
      />
      {/* <Edit
        selectedItem={selectedItem}
        showModal={showEdit}
        setShowModal={setShowEdit}
        fetchData={fetchProducts}
      /> */}
    </div>
  );
}

export default ShippingOptions;
