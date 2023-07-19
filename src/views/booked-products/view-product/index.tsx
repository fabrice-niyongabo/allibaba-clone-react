import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { IBooking, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import ReactHtmlParser from "react-html-parser";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import countries from "../../../constants/countries.json";
import { errorHandler, setHeaders, toastMessage } from "../../../helpers";
import axios from "axios";
import { app } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { fetchBooking } from "../../../actions/bookings";
import FullPageLoader from "../../../components/full-page-loader";
import Confirmation from "../../../controllers/confirmation";

interface Iprops {
  showModal: boolean;
  setShowModal: any;
  booked: IBooking | undefined;
}

const initialState = {
  quantity: "",
  description: EditorState.createEmpty(),
  shippingCountry: "",
  from: "",
  to: "",
};

function ViewProduct({ setShowModal, showModal, booked }: Iprops) {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (booked) {
      const blocksFromHtml = htmlToDraft(booked.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setState({ ...booked, description: editorState } as any);
    }
  }, [booked]);

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

  const handleSubmit = () => {
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
    setIsEditting(true);
    axios
      .put(
        app.BACKEND_URL + "/booking",
        { ...state, description },
        setHeaders(token)
      )
      .then((res) => {
        setIsLoading(false);
        setIsEditting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        dispatch(fetchBooking());
        setShowModal(false);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(app.BACKEND_URL + "/booking/" + booked?.id, setHeaders(token))
      .then((res) => {
        setIsLoading(false);
        setIsEditting(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        dispatch(fetchBooking());
        setShowModal(false);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
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
        <Modal.Header closeButton>
          <Modal.Title>{booked?.product?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <b>Quantity</b>
                  </td>
                  <td>
                    {isEditting ? (
                      <input
                        type="number"
                        value={state.quantity}
                        onChange={(e) =>
                          setState({ ...state, quantity: e.target.value })
                        }
                      />
                    ) : (
                      booked?.quantity
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Shipping Country</b>
                  </td>
                  <td>
                    {isEditting ? (
                      <select
                        value={state.shippingCountry}
                        onChange={(e) =>
                          setState({
                            ...state,
                            shippingCountry: e.target.value,
                          })
                        }
                      >
                        <option value="">Choose country</option>
                        {countries.map((item, index) => (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      booked?.shippingCountry
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Shipping date range</b>
                  </td>
                  <td>
                    {isEditting ? (
                      <input
                        type="date"
                        value={state.from}
                        onChange={(e) => handleDateChange("from", e)}
                      />
                    ) : (
                      booked?.from
                    )}{" "}
                    -{" "}
                    {isEditting ? (
                      <input
                        type="date"
                        value={state.to}
                        onChange={(e) => handleDateChange("to", e)}
                      />
                    ) : (
                      booked?.to
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {isEditting ? (
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
                    ) : (
                      ReactHtmlParser(booked?.description as string)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <small>
              <i>{new Date(String(booked?.createdAt)).toDateString()}</i>
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {isEditting ? (
            <>
              <button
                className="common-btn bg-danger"
                onClick={() => setIsEditting(false)}
              >
                Cancel Edit
              </button>
              <button className="common-btn" onClick={() => handleSubmit()}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              {booked?.status !== "APPROVED" && (
                <button
                  className="common-btn bg-danger"
                  onClick={() => setShowAlert(true)}
                >
                  Cancel Request
                </button>
              )}
              <button
                className="common-btn"
                onClick={() => setIsEditting(true)}
              >
                Edit Request
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <Confirmation
        title="Do you want to cancel this order?"
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
      />
    </>
  );
}

export default ViewProduct;
