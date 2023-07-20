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
}
function Edit({ showModal, setShowModal, selectedItem }: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        size="lg"
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Action</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  );
}

export default Edit;
