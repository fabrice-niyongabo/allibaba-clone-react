import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Col, Row, Spinner } from "reactstrap";
import { RootState } from "../../../../reducers";
import { app } from "../../../../components/constants";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../../components/helpers";
import { PRICE_TYPE_ENUM, TOAST_MESSAGE_TYPES } from "../../../../interfaces";
import FullPageLoader from "../../../../components/full-page-loader";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const initilaState = {
  subCategoryId: "",
  categoryId: "",
  name: "",
  description: EditorState.createEmpty(),
  priceType: "",
  singlePrice: "",
  productId: "",
  brandName: "",
};
interface IEditProps {
  showModal: boolean;
  setShowModal: any;
  selectedItem: any;
  fetchData: any;
}
function Edit({
  showModal,
  setShowModal,
  selectedItem,
  fetchData,
}: IEditProps) {
  const { categories, isLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { token } = useSelector((state: RootState) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const description = draftToHtml(
      convertToRaw(state.description.getCurrentContent())
    );
    const singlePrice =
      state.priceType === PRICE_TYPE_ENUM.MANY ? 0.0 : state.singlePrice;
    setIsSubmitting(true);
    axios
      .put(
        app.BACKEND_URL + "/products/",
        {
          ...state,
          description,
          singlePrice,
        },
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmitting(false);
        setShowModal(false);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        fetchData();
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsSubmitting(false);
        }, 1000);
      });
  };

  useEffect(() => {
    if (showModal) {
      const blocksFromHtml = htmlToDraft(selectedItem?.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setState({ ...selectedItem, description: editorState });
    }
  }, [showModal]);
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
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <div className="form-group mb-3">
                  <label htmlFor="">Category</label>
                  <select
                    name="categoryId"
                    value={state.categoryId}
                    className="form-control"
                    onChange={(e) =>
                      setState({
                        ...state,
                        categoryId: e.target.value,
                        subCategoryId: "",
                      })
                    }
                    required
                  >
                    <option value="">Choose category</option>
                    {categories.map((item, position) => (
                      <option value={item.id} key={position}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group mb-3">
                  <label htmlFor="">Sub Category</label>
                  <select
                    name="subCategoryId"
                    value={state.subCategoryId}
                    onChange={changeHandler}
                    className="form-control"
                    required
                  >
                    <option value="">Choose subcategory</option>
                    {categories.filter(
                      (item) => item.id === Number(state.categoryId)
                    ).length > 0 &&
                      categories
                        .filter(
                          (item) => item.id === Number(state.categoryId)
                        )[0]
                        .subCategories.map((item, position) => (
                          <option value={item.id} key={position}>
                            {item.name}
                          </option>
                        ))}
                  </select>
                </div>
              </Col>
            </Row>
            <div className="form-group mb-3">
              <label htmlFor="">Product Name</label>
              <input
                name="name"
                value={state.name}
                onChange={changeHandler}
                placeholder="Enter product name"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Product Description</label>
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
              <label htmlFor="">Price type</label> <br />
              <input
                type="radio"
                name="priceType"
                value={PRICE_TYPE_ENUM.SINGLE}
                checked={state.priceType === PRICE_TYPE_ENUM.SINGLE}
                onChange={changeHandler}
                required
              />{" "}
              Single
              <input
                type="radio"
                name="priceType"
                value={PRICE_TYPE_ENUM.MANY}
                checked={state.priceType === PRICE_TYPE_ENUM.MANY}
                onChange={changeHandler}
                required
              />{" "}
              Many
            </div>
            {state.priceType === PRICE_TYPE_ENUM.SINGLE && (
              <div className="form-group mb-3">
                <label htmlFor="">Price per unit</label>
                <input
                  type="input"
                  name="singlePrice"
                  value={state.singlePrice}
                  onChange={changeHandler}
                  className="form-control"
                  required={state.priceType === PRICE_TYPE_ENUM.SINGLE}
                />
              </div>
            )}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="">Product ID (optional)</label>
                  <input
                    type="text"
                    name="productId"
                    className="form-control"
                    value={state.productId}
                    onChange={changeHandler}
                    placeholder="Enter product ID"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="">Brand Name (optional)</label>
                  <input
                    type="text"
                    name="brandName"
                    className="form-control"
                    value={state.brandName}
                    onChange={changeHandler}
                    placeholder="Enter product brand name"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary">
              {isSubmitting && <Spinner size="sm" color="white" />} Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;
