import axios from "axios";
import { app } from "../constants";
import { ICountry } from "../interfaces";

export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_IS_LOADING_COUNTRIES = "SET_IS_LOADING_COUNTRIES";
export const RESET_COUNTRIES = "RESET_COUNTRIES";

interface IAction {
  type: string;
  payload: any;
}
export const setCountries = (countries: ICountry[]): IAction => ({
  type: SET_COUNTRIES,
  payload: countries,
});
export const setIsLoadingCountries = (value: boolean): IAction => ({
  type: SET_IS_LOADING_COUNTRIES,
  payload: value,
});

export const resetCountries = () => ({ type: RESET_COUNTRIES });

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
