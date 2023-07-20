import axios from "axios";
import { useEffect, useState } from "react";
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
  isActive: "true",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: any;
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .put(app.BACKEND_URL + "/services/", state, setHeaders(token))
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

  useEffect(() => {
    showModal && setState(selectedItem);
  }, [showModal]);
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
          <Modal.Title>Edit</Modal.Title>
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
            <div className="form-group mb-2">
              <label>Status</label>
              <select
                className="form-control"
                required
                value={state.isActive}
                onChange={(e) =>
                  setState({ ...state, isActive: e.target.value })
                }
              >
                <option value={"true"}>Active</option>
                <option value={"false"}>Disabled</option>
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
