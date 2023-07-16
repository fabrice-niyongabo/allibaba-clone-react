import { useDispatch } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";
import { TOAST_MESSAGE_TYPES } from "../interfaces";
import { fetchCategories } from "../actions/categories";
import { fetchShops } from "../actions/shops";
import { fetchProducts } from "../actions/products";
import { app } from "../constants";
import { fetchCountries } from "../actions/countries";

//custom dispatcher hook
export const useLoadBasicData = (): any => {
  const dispatch = useDispatch();
  return (payload: any) => {
    dispatch(fetchCategories());
    dispatch(fetchShops());
    dispatch(fetchProducts());
    dispatch(fetchCountries());
  };
};

export const handleAuthError = (error: any) => {
  if (error?.response?.status === 401) {
    //@ts-ignore
    window.location =
      "/logout?redirect=" + window.location.pathname.replace("/", "");
    //@ts-ignore
  }
};

export const returnErroMessage = (error: any) => {
  if (error?.response?.data?.msg) {
    return error.response.data.msg;
  } else if (error.message) {
    return error.message;
  } else {
    return error;
  }
};

export const openUrlInNewTab = (url: string, self: boolean = true) => {
  const urlToUse = self ? app.PUBLIC_URL + url : url;
  window.open(urlToUse, "_blank");
};

export const randomNumber = () => {
  const max = 99999;
  const min = 11111;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toastMessage = (type: TOAST_MESSAGE_TYPES, message: string) => {
  if (type === TOAST_MESSAGE_TYPES.INFO) {
    toast.info(message);
  }
  if (type === TOAST_MESSAGE_TYPES.ERROR) {
    toast.error(message);
  }
  if (type === TOAST_MESSAGE_TYPES.SUCCESS) {
    toast.success(message);
  }
};

export const errorHandler = (error: any) => {
  if (error?.response?.data?.msg) {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, error.response.data.msg);
  } else {
    toastMessage(TOAST_MESSAGE_TYPES.ERROR, error.message);
  }
  handleAuthError(error);
};

export const setHeaders = (token: string) => {
  return {
    headers: {
      token: token,
    },
  };
};
export const currencyFormatter = (num: any) => {
  if (
    isNaN(num) ||
    num === undefined ||
    num === null ||
    typeof num === "undefined"
  ) {
    // throw new Error(`currencyFormatter Failed,not a NUM`)
    // console.log("Num:-", num)
    return "";
  }
  // console.log("Num:-", num)
  let sign = "";
  if (num < 0) {
    sign = "-";
  }
  const str = Math.abs(num).toString();
  let lastComma = 0;
  let lastDot = str.lastIndexOf(".");
  if (lastDot == -1) {
    lastComma = str.length - 4;
  } else {
    lastComma = lastDot - 4;
  }

  // console.log(lastComma);
  let newStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    if (i == lastComma) {
      newStr = "," + newStr;
      lastComma -= 2;
    }

    newStr = str[i] + newStr;
  }
  if (sign === "-") {
    newStr = sign + newStr;
  }
  if (newStr.includes("e")) {
    return exponentialToFixed(newStr);
  }
  return newStr;
};

function exponentialToFixed(x: any) {
  if (Math.abs(+x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
