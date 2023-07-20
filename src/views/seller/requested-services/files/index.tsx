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
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Service Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    item.fileType === "Video" ? "bi-file-play" : "bi-file-image"
                  }`}
                  style={{ fontSize: 18 }}
                ></i>
                <span>{new Date().toDateString()}</span>
                <a href={(app.FILE_URL as string) + item.file} target="_blank">
                  View file
                </a>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Files;
