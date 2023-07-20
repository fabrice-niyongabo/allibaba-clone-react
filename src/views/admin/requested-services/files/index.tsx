import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { app } from "../../../../constants";
import { errorHandler, setHeaders, toastMessage } from "../../../../helpers";
import {
  IRequestFile,
  IRequestedService,
  TOAST_MESSAGE_TYPES,
} from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import Loader from "../../../../layouts/loader/Loader";
import { Col, Row } from "reactstrap";

const initilaState = {
  image: "",
  comment: "",
  fileType: "",
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
  const [files, setFiles] = useState<IRequestFile[]>([]);

  useEffect(() => {
    if (selectedItem) {
      fetchFiles();
    }
  }, [showModal]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", state.image);
    formData.append("comment", state.comment);
    formData.append("fileType", state.fileType);
    formData.append("serviceId", selectedItem?.serviceId as any);
    formData.append("requestId", selectedItem?.id as any);
    axios
      .post(
        app.BACKEND_URL + "/reqservices/files/",
        formData,
        setHeaders(token)
      )
      .then((res) => {
        setTimeout(() => {
          setIsSubmitting(false);
          toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
          fetchFiles();
          setState(initilaState);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsSubmitting(false);
        }, 1000);
      });
  };

  const fetchFiles = () => {
    setIsLoading(true);
    axios
      .get(
        app.BACKEND_URL + "/reqservices/files/" + selectedItem?.id,
        setHeaders(token)
      )
      .then((res) => {
        setIsLoading(false);
        setFiles(res.data.files);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
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
        size="lg"
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Service Files</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <h2>Uploade Files</h2> <hr />
                {isLoading && files.length === 0 && <Loader />}
                {files.map((item, index) => (
                  <div key={index} className="border p-2 mb-2">
                    <small>{item.comment}</small>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className={`bi ${
                          item.fileType === "Video"
                            ? "bi-file-play"
                            : "bi-file-image"
                        }`}
                        style={{ fontSize: 18 }}
                      ></i>
                      <span>{new Date().toDateString()}</span>
                      <a
                        href={(app.FILE_URL as string) + item.file}
                        target="_blank"
                      >
                        View file
                      </a>
                    </div>
                  </div>
                ))}
              </Col>
              <Col md={6}>
                <h2>Add New FIle</h2>
                <hr />
                <div className="form-group mb-3">
                  <label htmlFor="">File Type</label>
                  <select
                    className="form-select"
                    value={state.fileType}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      setState({ ...state, fileType: e.target.value })
                    }
                    required
                  >
                    <option value="">Choose type</option>
                    <option value="Video">Video</option>
                    <option value="Image">Image</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Comment</label>
                  <textarea
                    placeholder="Enter a short description"
                    className="form-control"
                    required
                    value={state.comment}
                    onChange={(e) =>
                      setState({ ...state, comment: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={(e: any) =>
                      setState({ ...state, image: e.target.files[0] })
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button className="common-btn w-100">Submit</button>
              </Col>
            </Row>
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

export default Files;
