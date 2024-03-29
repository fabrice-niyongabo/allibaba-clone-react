import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { Slider } from "@mui/material";
import FullPageLoader from "../../../../components/full-page-loader";
import { Modal } from "react-bootstrap";
import { Spinner } from "reactstrap";
import getCroppedImg from "./utils/cropImage";
import axios from "axios";
import { app } from "../../../../constants";
import { errorHandler, toastMessage } from "../../../../helpers";
import { TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { fetchMyShop } from "../../../../actions/myShop";

interface ICropImageProps {
  showModal: boolean;
  setShowModal: any;
  selectedImage: any;
  fetchData: any;
  pId: number;
}
const CropImage = ({
  showModal,
  setShowModal,
  selectedImage,
  fetchData,
  pId,
}: ICropImageProps) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<any>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  useEffect(() => {
    if (showModal && selectedImage !== undefined) {
      setImage(selectedImage);
    }
  }, [showModal, selectedImage]);

  const cropImage = async () => {
    setIsSubmitting(true);
    try {
      const { file, url } = await getCroppedImg(image, croppedAreaPixels, 0);
      const formData = new FormData();
      formData.append("file", file, "cropped.jpeg");
      formData.append("pId", pId as any);
      const URL = "/products/image";
      axios
        .post(app.BACKEND_URL + URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        })
        .then((res) => {
          setIsSubmitting(false);
          setShowModal(false);
          toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
          fetchData();
        })
        .catch((error) => {
          errorHandler(error);
          setIsSubmitting(false);
        });
    } catch (error) {
      errorHandler(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <FullPageLoader open={isSubmitting} />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Crop & save image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={{ height: 300 }}>
            {image && (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <div className="controls">
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(Number(zoom))}
              classes={{ root: "slider" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => cropImage()}>
            {isSubmitting && <Spinner size="sm" color="white" />} Upload Image
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CropImage;
