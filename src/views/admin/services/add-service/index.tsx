import axios from "axios";
import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import { TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import { currencies } from "currencies.json";

const initilaState = {
  name: "",
  description: "",
  price: "",
  image: "",
  currency: "",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  fetchData: any;
}
function AddService({ showModal, setShowModal, fetchData }: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageRef = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", state.image);
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price);
    formData.append("currency", state.currency);
    axios
      .post(app.BACKEND_URL + "/services/", formData, setHeaders(token))
      .then((res) => {
        setTimeout(() => {
          setIsSubmitting(false);
          setShowModal(false);
          toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
          fetchData();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsSubmitting(false);
        }, 1000);
      });
  };

  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group mb-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                required
                onChange={(e) => setState({ ...state, name: e.target.value })}
                value={state.name}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group mb-2">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                required
                onChange={(e) => setState({ ...state, price: e.target.value })}
                value={state.price}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group mb-2">
              <label>Currency</label>
              <select
                value={state.currency}
                onChange={(e) =>
                  setState({ ...state, currency: e.target.value })
                }
                required
                className="form-select"
              >
                <option value="">Choose currency</option>
                {currencies.map((item, index) => (
                  <option key={index} value={item.code}>
                    {item.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-2">
              <label>Description</label>
              <textarea
                placeholder="Enter description"
                className="form-control"
                required
                value={state.description}
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={(e: any) =>
                  setState({ ...state, image: e.target.files[0] })
                }
                required
                disabled={isSubmitting}
                ref={imageRef}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary">
              {isSubmitting && <Spinner size="sm" color="white" />} Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default AddService;
