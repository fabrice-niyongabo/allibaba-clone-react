import { useState } from "react";

import { Modal } from "react-bootstrap";
import { IProduct, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { errorHandler, setHeaders, toastMessage } from "../../../helpers";
import axios from "axios";
import { app } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { fetchBooking } from "../../../actions/bookings";
import FullPageLoader from "../../../components/full-page-loader";

interface IProps {
  showModal: boolean;
  setShowModal: any;
  product: IProduct | undefined;
}
const initialState = {
  quantity: "",
  description: EditorState.createEmpty(),
  from: "",
  to: "",
  confirm: false,
};
const Book = ({ showModal, setShowModal, product }: IProps) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const description = draftToHtml(
      convertToRaw(state.description.getCurrentContent())
    );
    if (description.length < 10) {
      toastMessage(
        TOAST_MESSAGE_TYPES.INFO,
        "Description/message can not be less that 10 characters please!"
      );
      return;
    }
    setIsLoading(true);
    axios
      .post(
        app.BACKEND_URL + "/booking",
        { ...state, description, productId: product?.pId },
        setHeaders(token)
      )
      .then((res) => {
        setIsLoading(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        dispatch(fetchBooking());
        setShowModal(false);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const handleDateChange = (type: "from" | "to", e: any) => {
    if (e.target.value.trim() === "") {
      setState({ ...state, [type]: e.target.value });
      return;
    }
    const date = new Date();
    const choosenDate = new Date(e.target.value);
    if (choosenDate < date) {
      toastMessage(TOAST_MESSAGE_TYPES.ERROR, "Please specify valid date");
      return;
    }
    setState({ ...state, [type]: e.target.value });
  };
  return (
    <>
      <FullPageLoader open={isLoading} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Booking Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>{product?.name}</b>
            </p>
            <div className="form-group mb-3">
              <label htmlFor="">Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="How many quantity do you want?"
                required
                min={1}
                onChange={(e) =>
                  setState({ ...state, quantity: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Description/Message to supplier</label>
              <Editor
                editorState={state.description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) =>
                  setState({ ...state, description: editorState })
                }
                editorStyle={{
                  border: "1px solid #CCC",
                  padding: "10px",
                  fontSize: 12,
                }}
                placeholder="Order description/message"
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    //   "embedded",
                    "emoji",
                    //   "image",
                    //   "remove",
                    "history",
                  ],
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">
                Expected Delivery date (delivery date range)
              </label>
              <table className="w-100">
                <tbody>
                  <tr>
                    <td>
                      <b>From</b>
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) => handleDateChange("from", e)}
                        value={state.from}
                        required
                      />
                    </td>
                    <td>
                      <b>Up To</b>
                      <input
                        type="date"
                        className="form-control"
                        onChange={(e) => handleDateChange("to", e)}
                        value={state.to}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <input type="checkbox" required />{" "}
              <span>
                Share my contact details to the supplier so that I can be
                contacted about processing of this order.
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="common-btn">Book Now</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Book;
