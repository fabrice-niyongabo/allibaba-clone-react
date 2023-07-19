import axios from "axios";
import { app } from "../constants";
import { ICountry } from "../interfaces";

export const SET_BOOKINGS = "SET_BOOKINGS";
export const SET_IS_LOADING_BOOKINGS = "SET_IS_LOADING_BOOKINGS";
export const RESET_BOOKINGS = "RESET_BOOKINGS";

interface IAction {
  type: string;
  payload: any;
}
export const setCountries = (countries: ICountry[]): IAction => ({
  type: SET_BOOKINGS,
  payload: countries,
});
export const setIsLoadingCountries = (value: boolean): IAction => ({
  type: SET_IS_LOADING_BOOKINGS,
  payload: value,
});

export const resetCountries = () => ({ type: RESET_BOOKINGS });

export const fetchCountries = (): any => (dispatch: any) => {
  dispatch(setIsLoadingCountries(true));
  axios
    .get(app.BACKEND_URL + "/countries")
    .then((res) => {
      dispatch(setCountries(res.data.countries));
      dispatch(setIsLoadingCountries(false));
    })
    .catch((error) => {
      dispatch(setIsLoadingCountries(false));
    });
};
