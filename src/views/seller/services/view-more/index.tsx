import axios from "axios";
import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import { Iservice, TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import ImageLoader from "../../../../components/image-loader";

const initilaState = {
  name: "",
  description: EditorState.createEmpty(),
  price: "",
  image: "",
  currency: "",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: Iservice | undefined;
}
function ViewMore({ showModal, setShowModal, selectedItem }: IEditProps) {
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageRef = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setIsSubmitting(true);
    // const formData = new FormData();
    // formData.append("file", state.image);
    // formData.append("name", state.name);
    // formData.append("description", state.description);
    // formData.append("price", state.price);
    // formData.append("currency", state.currency);
    // axios
    //   .post(app.BACKEND_URL + "/services/", formData, setHeaders(token))
    //   .then((res) => {
    //     setTimeout(() => {
    //       setIsSubmitting(false);
    //       setShowModal(false);
    //       toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
    //       fetchData();
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     setTimeout(() => {
    //       errorHandler(error);
    //       setIsSubmitting(false);
    //     }, 1000);
    //   });
  };

  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size="xl"
        style={{
          backgroundImage: `url(${
            (app.FILE_URL as string) + selectedItem?.image
          })`,
          backgroundSize: "100% 100%",
        }}
      >
        <Modal.Header closeButton={!isSubmitting} style={{}}>
          <Modal.Title>View More</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h3 className="">{selectedItem?.name}</h3>
              <p>{selectedItem?.description}</p>
              <ImageLoader
                props={{ style: { width: "100%", borderRadius: 10 } }}
                src={(app.FILE_URL as string) + selectedItem?.image}
                alt={selectedItem?.name}
              />
            </Col>
            <Col md={6}>
              <form onSubmit={handleSubmit}>
                <h3>Request This Service</h3>
                <div className="form-group mb-2">
                  <label>Description</label>

                  <Editor
                    editorState={state.description as any}
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
                    placeholder="How do you want this service?"
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
                        "image",
                        //   "remove",
                        "history",
                      ],
                    }}
                  />
                  <p>
                    <small>
                      Afriseller will try to reach out to you for further
                      communications & processing details
                    </small>
                  </p>
                  <button className="common-btn w-100">Submit request</button>
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewMore;
