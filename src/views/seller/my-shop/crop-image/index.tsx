import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { Slider } from "@mui/material";
import FullPageLoader from "../../../../components/full-page-loader";
import { Modal } from "react-bootstrap";
import { Spinner } from "reactstrap";
import getCroppedImg from "./utils/cropImage";
import axios from "axios";
import { app } from "../../../../components/constants";
import { errorHandler, toastMessage } from "../../../../components/helpers";
import { TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { fetchMyShop } from "../../../../actions/myShop";

interface ICropImageProps {
  showModal: boolean;
  setShowModal: any;
  selectedImage: any;
  imageType: string;
}
const CropImage = ({
  showModal,
  setShowModal,
  selectedImage,
  imageType,
}: ICropImageProps) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<any>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaWidth, setMediaWidth] = useState<number>(400);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
      console.log(croppedArea, croppedAreaPixels);
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
      const URL =
        imageType === "shopImage" ? "/shops/shopimage" : "/shops/shopbanner";
      axios
        .put(app.BACKEND_URL + URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        })
        .then((res) => {
          setIsSubmitting(false);
          setShowModal(false);
          toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
          dispatch(fetchMyShop());
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
                onMediaLoaded={(size) => {
                  setMediaWidth(size.width);
                }}
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                objectFit="contain"
                cropSize={
                  imageType === "shopImage"
                    ? { width: 320, height: 300 }
                    : { width: mediaWidth, height: 170 }
                }
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
