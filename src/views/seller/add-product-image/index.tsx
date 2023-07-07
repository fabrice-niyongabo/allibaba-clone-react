import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { IProduct, IUser, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import FullPageLoader from "../../../components/full-page-loader";
import CropImage from "./crop-image";
import axios from "axios";
import { app } from "../../../constants";
import { useParams } from "react-router-dom";
import { errorHandler, setHeaders } from "../../../helpers";

function AddProductImage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.user as IUser);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(undefined);
  const [isLoading, setIsloading] = useState(false);

  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    setIsloading(true);
    axios
      .get(app.BACKEND_URL + "/products/mine/" + id, setHeaders(token))
      .then((res) => {
        setIsloading(false);
        setProduct(res.data.product);
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
              Add New Product Image
            </CardTitle>
            <CardBody>
              <p>{product?.name}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                  setShowModal(true);
                }}
                className="form-control"
              />
            </CardBody>
          </Card>
        </Col>
        {product && (
          <Col md={6}>
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                Other Images for this product
              </CardTitle>
              <CardBody>
                <Row>
                  {product.images.map((item, position) => (
                    <Col key={position} md={6}>
                      <img
                        src={app.FILE_URL + item.image}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
      <CropImage
        setShowModal={setShowModal}
        showModal={showModal}
        selectedImage={selectedImage}
        pId={product?.pId as any}
        fetchData={fetchProduct}
      />
    </div>
  );
}

export default AddProductImage;
