import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, toastMessage } from "../../../../helpers";
import { TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";

const initilaState = { name: "", icon: "" };
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
      .put(app.BACKEND_URL + "/productcategories/", { ...state, token })
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
              <label>Category Name</label>
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
            <div className="form-group my-2">
              <input
                type="text"
                placeholder="Enter icon name, ex: bi-house"
                className="form-control"
                required
                value={state.icon}
                disabled={isSubmitting}
                onChange={(e) => setState({ ...state, icon: e.target.value })}
              />
              <a target="_blank" href="https://icons.getbootstrap.com/">
                <small>View icons list</small>
              </a>
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
