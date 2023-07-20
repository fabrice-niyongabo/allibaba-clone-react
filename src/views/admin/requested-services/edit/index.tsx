import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import {
  IRequestedService,
  TOAST_MESSAGE_TYPES,
  VERIFICATION_ENUM,
  VERIFICATION_ENUM_ENUM,
} from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";

const initilaState = {
  status: "",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: IRequestedService | undefined;
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

  useEffect(() => {
    if (selectedItem) {
      showModal && setState(selectedItem);
    }
  }, [showModal]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .put(app.BACKEND_URL + "/reqservices/", state, setHeaders(token))
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
          <Modal.Title>Approve/desapprove request</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <table className="table">
              <tbody>
                <tr>
                  <td valign="top">
                    <b>Service Name</b>
                  </td>
                  <td valign="top">{selectedItem?.service.name}</td>
                </tr>
              </tbody>
            </table>
            <div className="form-group">
              <label htmlFor="">Request Status</label>
              <select
                className="form-select"
                value={state.status}
                onChange={(e) => setState({ ...state, status: e.target.value })}
                required
              >
                <option value={VERIFICATION_ENUM_ENUM.APPROVED}>
                  APPROVED
                </option>
                <option value={VERIFICATION_ENUM_ENUM.REJECTED}>
                  REJECTED
                </option>
                <option value={VERIFICATION_ENUM_ENUM.UNDER_REVIEW}>
                  UNDER_REVIEW
                </option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="common-btn">Save Changes</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;
