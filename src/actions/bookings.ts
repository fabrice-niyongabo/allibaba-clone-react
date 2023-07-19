import axios from "axios";
import { app } from "../constants";
import { IBooking } from "../interfaces";
import { setHeaders } from "../helpers";

export const SET_BOOKINGS = "SET_BOOKINGS";
export const SET_IS_LOADING_BOOKINGS = "SET_IS_LOADING_BOOKINGS";
export const RESET_BOOKINGS = "RESET_BOOKINGS";

interface IAction {
  type: string;
  payload: any;
}
export const setBooking = (data: IBooking[]): IAction => ({
  type: SET_BOOKINGS,
  payload: data,
});
export const setIsLoadingBooking = (value: boolean): IAction => ({
  type: SET_IS_LOADING_BOOKINGS,
  payload: value,
});

export const resetBooking = () => ({ type: RESET_BOOKINGS });

export const fetchBooking = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  if (user.token.trim() === "") {
    return;
  }
  dispatch(setIsLoadingBooking(true));
  axios
    .get(app.BACKEND_URL + "/booking", setHeaders(user.token))
    .then((res) => {
      dispatch(setBooking(res.data.booking));
      dispatch(setIsLoadingBooking(false));
    })
    .catch((error) => {
      dispatch(setIsLoadingBooking(false));
    });
};
