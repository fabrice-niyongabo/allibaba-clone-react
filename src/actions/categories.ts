import axios from "axios";
import { app } from "../constants";
import { ICategory, Ishop } from "../interfaces";
import { errorHandler, setHeaders } from "../helpers";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_IS_LOADING_CATEGORIES = "SET_IS_LOADING_CATEGORIES";
export const RESET_CATEGORIES = "RESET_CATEGORIES";

interface IAction {
  type: string;
  payload: any;
}
export const setCategories = (categories: ICategory[]): IAction => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setIsLoadingCategories = (value: boolean): IAction => ({
  type: SET_IS_LOADING_CATEGORIES,
  payload: value,
});

export const resetCategories = () => ({ type: RESET_CATEGORIES });

export const fetchCategories = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch(setIsLoadingCategories(true));
  axios
    .get(app.BACKEND_URL + "/productcategories")
    .then((res) => {
      dispatch(setCategories(res.data.categories));
      dispatch(setIsLoadingCategories(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingCategories(false));
    });
};
