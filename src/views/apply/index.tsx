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
import {
  errorHandler,
  setHeaders,
  toastMessage,
} from "../../components/helpers";
import { IUser, TOAST_MESSAGE_TYPES } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { setUserApply, setUserRole, setUserShopId } from "../../actions/user";

import countries from "../../components/constants/countries.json";
import { isValidPhoneNumber } from "react-phone-number-input/input";
import PhoneInput from "react-phone-number-input";

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
            <PhoneInput
              placeholder="Enter phone number"
              value={state.phone1}
              onChange={(e) => {
                setState({ ...state, phone1: e as any });
              }}
              defaultCountry="RW"
              error={
                state.phone1
                  ? isValidPhoneNumber(state.phone1)
                    ? undefined
                    : "Invalid phone number"
                  : "Phone number required"
              }
              numberInputProps={{
                className: "form-control",
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Phone Number (2)</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={state.phone2}
              onChange={(e) => {
                setState({ ...state, phone2: e as any });
              }}
              defaultCountry="RW"
              error={
                state.phone2
                  ? isValidPhoneNumber(state.phone2)
                    ? undefined
                    : "Invalid phone number"
                  : "Phone number required"
              }
              numberInputProps={{
                className: "form-control",
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Phone Number (3)</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={state.phone3}
              onChange={(e) => {
                setState({ ...state, phone3: e as any });
              }}
              defaultCountry="RW"
              error={
                state.phone3
                  ? isValidPhoneNumber(state.phone3)
                    ? undefined
                    : "Invalid phone number"
                  : "Phone number required"
              }
              numberInputProps={{
                className: "form-control",
              }}
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
