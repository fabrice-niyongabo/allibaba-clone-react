import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { fetchCategories } from "../../../actions/categories";
import { RootState } from "../../../reducers";
import FullPageLoader from "../../../components/full-page-loader";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { PRICE_TYPE_ENUM, TOAST_MESSAGE_TYPES } from "../../../interfaces";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../../components/helpers";
import axios from "axios";
import { app } from "../../../components/constants";

const initialState = {
  subCategoryId: "",
  categoryId: "",
  name: "",
  description: EditorState.createEmpty(),
  priceType: "",
  singlePrice: "",
};
function AddProduct() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const [state, setState] = useState(initialState);
  const { categories, isLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (isLoading && categories.length === 0) {
        setIsSubmitting(true);
      } else {
        setIsSubmitting(false);
      }
    }
    return () => {
      sub = false;
    };
  }, [isLoading]);

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

    const singlePrice =
      state.priceType === PRICE_TYPE_ENUM.MANY ? 0.0 : state.singlePrice;

    setIsSubmitting(true);
    axios
      .post(
        app.BACKEND_URL + "/products",
        { ...state, description, singlePrice },
        setHeaders(token)
      )
      .then((res) => {
        setIsSubmitting(false);
        setState(initialState);
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Add new product
        </CardTitle>
        <CardBody>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="common-btn">
              Save product
            </button>
          </form>
        </CardBody>
      </Card>
      <FullPageLoader open={isSubmitting} />
    </div>
  );
}

export default AddProduct;
