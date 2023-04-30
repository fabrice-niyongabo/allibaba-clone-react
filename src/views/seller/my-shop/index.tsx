import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../components/helpers";
import { IUser, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import axios from "axios";
import { app } from "../../../components/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import FullPageLoader from "../../../components/full-page-loader";
import { Editor } from "react-draft-wysiwyg";
import {
  fetchMyShop,
  setIsLoadingMyShop,
  setMyShop,
} from "../../../actions/myShop";
import CropImage from "./crop-image";

const initialState = {
  shopName: "",
  description: EditorState.createEmpty(),
  phone1: "",
  phone2: "",
  phone3: "",
  address: "",
  open: "",
  close: "",
};
function MyShop() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user as IUser);
  const { myShop, isLoading } = useSelector((state: RootState) => state.myShop);
  const [state, setState] = useState({ ...initialState });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(undefined);
  const [cropImageType, setCropImageType] = useState<string>("shopImage");

  useEffect(() => {
    dispatch(fetchMyShop());
  }, []);

  useEffect(() => {
    if (myShop) {
      const blocksFromHtml = htmlToDraft(myShop?.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setState({ ...myShop, description: editorState });
    }
  }, [myShop]);

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const description = draftToHtml(
      convertToRaw(state.description.getCurrentContent())
    );
    if (description.length < 10) {
      toastMessage(
        TOAST_MESSAGE_TYPES.INFO,
        "Shop description can not be less that 10 characters please!"
      );
      return;
    }

    dispatch(setIsLoadingMyShop(true));
    axios
      .put(
        app.BACKEND_URL + "/shops",
        { ...state, description },
        setHeaders(token)
      )
      .then((res) => {
        dispatch(setIsLoadingMyShop(false));
        const { shop } = res.data;
        dispatch(setMyShop({ ...shop }));
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      })
      .catch((error) => {
        dispatch(setIsLoadingMyShop(false));
        errorHandler(error);
      });
  };
  return (
    <div>
      <FullPageLoader open={isLoading} />
      <Row>
        <Col md={8}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Shop Information
            </CardTitle>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 mt-4">
                  <label htmlFor="">Shop Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Shop Name"
                    name="shopName"
                    value={state.shopName}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Shop Description*</label>
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
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "embedded",
                        "emoji",
                        "image",
                        "remove",
                        "history",
                      ],
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Shop Address*</label>
                  <input
                    type="text"
                    placeholder="Shop address ex: Kigali kk18 Ave"
                    className="form-control"
                    name="address"
                    value={state.address}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Phone Number*</label>
                  <input
                    type="text"
                    placeholder="Line 1. Ex: 07...."
                    className="form-control"
                    name="phone1"
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    value={state.phone1}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Phone Number (2)</label>
                  <input
                    type="text"
                    placeholder="Line 2. Ex: 07...."
                    className="form-control"
                    name="phone2"
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    value={state.phone2}
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Phone Number (3)</label>
                  <input
                    type="text"
                    placeholder="Line 3. Ex: 07...."
                    className="form-control"
                    name="phone3"
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    value={state.phone3}
                    onChange={changeHandler}
                  />
                </div>
                <div className="open-close-container mb-3">
                  <div className="form-group">
                    <label htmlFor="">Open From*</label>
                    <input
                      type="time"
                      placeholder="Line 1"
                      className="form-control"
                      name="open"
                      value={state.open}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Close From*</label>
                    <input
                      type="time"
                      className="form-control"
                      name="close"
                      value={state.close}
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="common-btn">
                    Update Shop info
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Shop Image
            </CardTitle>
            <CardBody>
              {myShop?.shopImage.trim() === "" ? (
                <div className="alert alert-warning">No image uploaded yet</div>
              ) : (
                <>
                  {myShop && (
                    <img
                      alt=""
                      src={app.FILE_URL + myShop?.shopImage}
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
                  setCropImageType("shopImage");
                  setShowModal(true);
                }}
                className="form-control"
              />
            </CardBody>
          </Card>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Shop Banner
            </CardTitle>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
      <CropImage
        setShowModal={setShowModal}
        showModal={showModal}
        selectedImage={selectedImage}
        imageType={cropImageType}
      />
    </div>
  );
}

export default MyShop;
