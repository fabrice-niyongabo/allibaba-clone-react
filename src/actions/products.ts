import axios from "axios";
import * as constants from "constants";
import { IProduct } from "../interfaces";
import { errorHandler } from "../components/helpers";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_IS_LOADING_PRODUCTS = "SET_IS_LOADING_PRODUCTS";
export const RESET_PRODUCTS = "RESET_PRODUCTS";

interface IAction {
  type: string;
  payload: any;
}
export const setProducts = (products: IProduct[]): IAction => ({
  type: SET_PRODUCTS,
  payload: products,
});
export const setIsLoadingProducts = (value: boolean): IAction => ({
  type: SET_IS_LOADING_PRODUCTS,
  payload: value,
});

export const resetProducts = () => ({ type: RESET_PRODUCTS });

export const fetchProducts = (): any => (dispatch: any, getState: any) => {
  const { appReducer } = getState();
  dispatch(setIsLoadingProducts(true));
  axios
    .get(constants.app.BACKEND_URL + "/products", {
      params: { country: appReducer.country },
    })
    .then((res) => {
      dispatch(setProducts(res.data.products));
      dispatch(setIsLoadingProducts(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingProducts(false));
    });
};
