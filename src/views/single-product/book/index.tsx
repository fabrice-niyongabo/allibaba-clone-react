import { useState } from "react";

import { Modal } from "react-bootstrap";
import { IProduct } from "../../../interfaces";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

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
  const [state, setState] = useState(initialState);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
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
                      <input type="date" className="form-control" />
                    </td>
                    <td>
                      <b>Up To</b>
                      <input type="date" className="form-control" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <input type="checkbox" />{" "}
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
