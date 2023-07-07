import axios from "axios";
import { app } from "constants";
import { Ishop } from "../interfaces";
import { errorHandler, setHeaders } from "../components/helpers";

export const SET_SHOPS = "SET_SHOPS";
export const SET_IS_LOADING_SHOPS = "SET_IS_LOADING_SHOPS";
export const RESET_SHOPS = "RESET_SHOPS";

interface IAction {
  type: string;
  payload: any;
}
export const setShops = (categories: Ishop[]): IAction => ({
  type: SET_SHOPS,
  payload: categories,
});
export const setIsLoadingShops = (value: boolean): IAction => ({
  type: SET_IS_LOADING_SHOPS,
  payload: value,
});

export const resetShops = () => ({ type: RESET_SHOPS });

export const fetchShops = (): any => (dispatch: any, getState: any) => {
  const { appReducer } = getState();
  dispatch(setIsLoadingShops(true));
  axios
    .get(app.BACKEND_URL + "/shops", {
      params: { country: appReducer.country },
    })
    .then((res) => {
      dispatch(setShops(res.data.shops));
      dispatch(setIsLoadingShops(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingShops(false));
    });
};

export const adminfetchAllShops = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch(setIsLoadingShops(true));
  axios
    .get(app.BACKEND_URL + "/shops/all", setHeaders(user.token))
    .then((res) => {
      dispatch(setShops(res.data.shops));
      dispatch(setIsLoadingShops(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingShops(false));
    });
};
