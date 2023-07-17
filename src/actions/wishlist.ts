import axios from "axios";
import { app } from "../constants";
import { ICategory, IProduct, Ishop } from "../interfaces";
import { errorHandler, setHeaders } from "../helpers";

export const SET_WISHLIST = "SET_WISHLIST";
export const SET_IS_LOADING_WISHLIST = "SET_IS_LOADING_WISHLIST";
export const RESET_WISHLIST = "RESET_WISHLIST";

interface IAction {
  type: string;
  payload: any;
}
export const setWishlist = (list: IProduct[]): IAction => ({
  type: SET_WISHLIST,
  payload: list,
});
export const setIsLoadingWishlist = (value: boolean): IAction => ({
  type: SET_IS_LOADING_WISHLIST,
  payload: value,
});

export const resetWishlist = () => ({ type: RESET_WISHLIST });

export const fetchWishlist = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch(setIsLoadingWishlist(true));
  axios
    .get(app.BACKEND_URL + "/wishlist", setHeaders(user.token))
    .then((res) => {
      dispatch(setWishlist(res.data.list));
      dispatch(setIsLoadingWishlist(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingWishlist(false));
    });
};
