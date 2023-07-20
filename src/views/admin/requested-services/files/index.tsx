import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import { IRequestedService, TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";

const initilaState = {
  status: "",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: IRequestedService | undefined;
}
function Files({ showModal, setShowModal, selectedItem }: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsSubmitting(false);
        }, 1000);
      });
  };

  const fetchFiles = () => {};
  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Service Files</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body></Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

export default Files;
