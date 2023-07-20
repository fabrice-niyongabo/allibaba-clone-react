import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import {
  currencyFormatter,
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../../helpers";
import { IRequestedService, TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import ReactHtmlParser from "react-html-parser";

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
  selectedItem: IRequestedService | undefined;
}
function ViewRequest({ showModal, setShowModal, selectedItem }: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // showModal && setState(selectedItem);
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
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr>
                <td valign="top">
                  <b>Service Name</b>
                </td>
                <td valign="top">{selectedItem?.service.name}</td>
              </tr>
              <tr>
                <td valign="top">
                  <b>Amount</b>
                </td>
                <td valign="top">
                  {currencyFormatter(selectedItem?.price)}{" "}
                  {selectedItem?.currency}
                </td>
              </tr>
              <tr>
                <td valign="top">
                  <b>Client's Description</b>
                </td>
                <td valign="top">
                  {ReactHtmlParser(selectedItem?.description as string)}
                </td>
              </tr>
              <tr>
                <td valign="top">
                  <b>Client Names</b>
                </td>
                <td valign="top">{selectedItem?.user.names}</td>
              </tr>
              <tr>
                <td valign="top">
                  <b>Email</b>
                </td>
                <td valign="top">{selectedItem?.user.email}</td>
              </tr>
              <tr>
                <td valign="top">
                  <b>Phone</b>
                </td>
                <td valign="top">{selectedItem?.user.phone}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewRequest;
