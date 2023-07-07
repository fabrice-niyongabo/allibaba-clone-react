import axios from "axios";
import { app } from "../constants";
import { IShippingEstimation } from "../interfaces";
import { errorHandler, setHeaders } from "../helpers";

export const SET_SHIPPING_ESTIMATIONS = "SET_SHIPPING_ESTIMATIONS";
export const SET_SHIPPING_ESTIMATION_SUPPLIER_ID =
  "SET_SHIPPING_ESTIMATION_SUPPLIER_ID";
export const SET_IS_LOADING_SHIPPING_OPTIONS =
  "SET_IS_LOADING_SHIPPING_OPTIONS";
export const RESET_SHIPPING_ESTIMATIONS = "RESET_SHIPPING_ESTIMATIONS";

interface IAction {
  type: string;
  payload: any;
}
export const setShippingEstimations = (
  estimations: IShippingEstimation[]
): IAction => ({
  type: SET_SHIPPING_ESTIMATIONS,
  payload: estimations,
});
export const setIsLoadingShippingEstimations = (value: boolean): IAction => ({
  type: SET_IS_LOADING_SHIPPING_OPTIONS,
  payload: value,
});

export const setShippingEstimationSupplierId = (id: number): IAction => ({
  type: SET_IS_LOADING_SHIPPING_OPTIONS,
  payload: id,
});

export const resetShippingEstimations = () => ({
  type: RESET_SHIPPING_ESTIMATIONS,
});

export const fetchShippingEstimations =
  (id: number): any =>
  (dispatch: any) => {
    dispatch(setIsLoadingShippingEstimations(true));
    axios
      .get(app.BACKEND_URL + "/estimation/" + id)
      .then((res) => {
        dispatch(setShippingEstimationSupplierId(id));
        dispatch(setShippingEstimations(res.data.estimations));
        dispatch(setIsLoadingShippingEstimations(false));
      })
      .catch((error) => {
        // errorHandler(error);
        dispatch(setIsLoadingShippingEstimations(false));
      });
  };
