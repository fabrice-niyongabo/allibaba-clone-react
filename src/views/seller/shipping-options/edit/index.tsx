import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import {
  IProduct,
  IShippingEstimation,
  IVariation,
  PRICE_TYPE_ENUM,
  TOAST_MESSAGE_TYPES,
  VARITION_TYPES_ENUM,
} from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import { Editor } from "react-draft-wysiwyg";
import "../../../../assets/scss/addProduct.scss";
import { currencies } from "currencies.json";
import countries from "../../../../constants/countries.json";

const initilaState = {
  fromCountry: "",
  toCountry: "",
  minAmount: "",
  maxAmount: "",
  currency: "",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: IShippingEstimation | undefined;
  fetchData: any;
}
function Edit({
  showModal,
  setShowModal,
  selectedItem,
  fetchData,
}: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [variations, setVariations] = useState<IVariation[]>([]);
  const [defaultVariations, setDefaultVariations] = useState<IVariation[]>([]);
  const [unsavedVariations, setUnsavedVariations] = useState<
    VARITION_TYPES_ENUM[]
  >([]);

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .put(
        app.BACKEND_URL + "/estimation/",
        {
          ...state,
        },
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmitting(false);
        setShowModal(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        fetchData();
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsSubmitting(false);
        }, 1000);
      });
  };

  useEffect(() => {
    if (showModal && selectedItem) {
      setState({ ...selectedItem } as any);
    }
  }, [showModal]);
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
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="">From</label>
              <input
                className="form-control"
                disabled
                value={state.fromCountry}
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
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary">
              {isSubmitting && <Spinner size="sm" color="white" />} Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;
