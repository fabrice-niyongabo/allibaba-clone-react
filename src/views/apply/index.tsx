import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/scss/apply.scss";
import { Editor } from "react-draft-wysiwyg";
import FullPageLoader from "../../components/full-page-loader";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import axios from "axios";
import { app } from "../../components/constants";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../components/helpers";
import { IUser, TOAST_MESSAGE_TYPES } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { setUserApply, setUserRole, setUserShopId } from "../../actions/user";

import countries from "../../components/constants/countries.json";

const initialState = {
  shopName: "",
  description: EditorState.createEmpty(),
  country: "",
  phone1: "",
  phone2: "",
  phone3: "",
  address: "",
  open: "",
  close: "",
};

function Apply() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { phone, token, shopId } = useSelector(
    (state: RootState) => state.user
  );
  const [state, setState] = useState({ ...initialState, phone1: phone });
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

    setIsLoading(true);
    axios
      .post(
        app.BACKEND_URL + "/shops/register",
        { ...state, description },
        setHeaders(token)
      )
      .then((res) => {
        setIsLoading(false);
        const { role, shopId } = res.data.user as IUser;
        dispatch(setUserRole(role));
        dispatch(setUserShopId(shopId));
        toastMessage(TOAST_MESSAGE_TYPES.SUCCESS, res.data.msg);
        navigate("/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    if (shopId !== null) {
      navigate("/dashboard");
    }
    return () => {
      dispatch(setUserApply(false));
    };
  }, []);

  return (
    <>
      <FullPageLoader open={isLoading} />
      <Header />
      <div className="afriseller-container my-5 apply-main-container">
        <h2>Apply to become a seller on afriseller</h2>
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
            <label htmlFor="">Country*</label>
            <select
              className="form-control"
              onChange={(e) => setState({ ...state, country: e.target.value })}
            >
              <option value="">Choose country</option>
              {countries.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name} ({item.code})
                </option>
              ))}
            </select>
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
              Apply Now
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Apply;
