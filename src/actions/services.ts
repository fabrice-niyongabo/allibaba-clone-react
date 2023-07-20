import axios from "axios";
import { app } from "../constants";
import { Iservice } from "../interfaces";
import { errorHandler } from "../helpers";

export const SET_SERVICES = "SET_SERVICES";
export const SET_IS_LOADING_SERVICES = "SET_IS_LOADING_SERVICES";
export const RESET_SERVICES = "RESET_SERVICES";

interface IAction {
  type: string;
  payload: any;
}
export const setServices = (services: Iservice[]): IAction => ({
  type: SET_SERVICES,
  payload: services,
});
export const setIsLoadingServices = (value: boolean): IAction => ({
  type: SET_IS_LOADING_SERVICES,
  payload: value,
});

export const resetServices = () => ({ type: RESET_SERVICES });

export const fetchServices = (): any => (dispatch: any) => {
  dispatch(setIsLoadingServices(true));
  axios
    .get(app.BACKEND_URL + "/services")
    .then((res) => {
      dispatch(setServices(res.data.services));
      dispatch(setIsLoadingServices(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingServices(false));
    });
};
