import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import {
  ICategory,
  IProduct,
  IUser,
  TOAST_MESSAGE_TYPES,
} from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import FullPageLoader from "../../../components/full-page-loader";
import axios from "axios";
import { app } from "../../../constants";
import { useParams } from "react-router-dom";
import { errorHandler, setHeaders } from "../../../components/helpers";
import CropImage from "./crop-image";

function CategoryImages() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.user as IUser);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(undefined);
  const [cropImageType, setCropImageType] = useState<string>("");
  const [isLoading, setIsloading] = useState(false);

  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    setIsloading(true);
    axios
      .get(app.BACKEND_URL + "/productcategories/" + id, setHeaders(token))
      .then((res) => {
        setIsloading(false);
        setCategory(res.data.category);
      })
      .catch((error) => {
        errorHandler(error);
        setIsloading(false);
      });
  };

  return (
    <div>
      <FullPageLoader open={isLoading} />
      <Row>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              {category?.name} - Category Image
            </CardTitle>
            <CardBody>
              {category?.image?.trim() === "" || category?.image === null ? (
                <div className="alert alert-warning">No image uploaded yet</div>
              ) : (
                <>
                  {category && (
                    <img
                      alt=""
                      src={app.FILE_URL + category?.image}
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                  setCropImageType("categoryImage");
                  setShowModal(true);
                }}
                className="form-control"
              />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              {category?.name} - Category Banner
            </CardTitle>
            <CardBody>
              {category?.banner?.trim() === "" || category?.banner === null ? (
                <div className="alert alert-warning">No image uploaded yet</div>
              ) : (
                <>
                  {category && (
                    <img
                      alt=""
                      src={app.FILE_URL + category?.banner}
                      style={{ width: "100%" }}
                    />
                  )}
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                  setCropImageType("categoryBanner");
                  setShowModal(true);
                }}
                className="form-control"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CropImage
        setShowModal={setShowModal}
        showModal={showModal}
        selectedImage={selectedImage}
        fetchData={fetchProduct}
        imageType={cropImageType}
        id={category?.id as any}
      />
    </div>
  );
}

export default CategoryImages;
