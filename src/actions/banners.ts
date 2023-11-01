import axios from "axios";
import { errorHandler } from "../helpers";
import { IBanner } from "../interfaces";
import { app } from "../constants";

export const SET_BANNERS = "SET_BANNERS";
export const SET_IS_LOADING_BANNERS = "SET_IS_LOADING_BANNERS";
export const RESET_BANNERS = "RESET_BANNERS";

interface IAction {
  type: string;
  payload: any;
}
export const setBanners = (banners: IBanner[]): IAction => ({
  type: SET_BANNERS,
  payload: banners,
});
export const setIsLoadingBanners = (value: boolean): IAction => ({
  type: SET_IS_LOADING_BANNERS,
  payload: value,
});
export const resetBanners = () => ({ type: RESET_BANNERS });

export const fetchBanners = (): any => (dispatch: any) => {
  dispatch(setIsLoadingBanners(true));

  axios
    .get(app.BACKEND_URL + "/banners/")
    .then((res) => {
      dispatch(setIsLoadingBanners(false));
      dispatch({
        type: SET_BANNERS,
        payload: res.data.banners,
      });
    })
    .catch((error) => {
      dispatch(setIsLoadingBanners(false));
      errorHandler(error);
    });
};
