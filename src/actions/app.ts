import { ICategory } from "../interfaces";

export const SET_COUNTRY = "SET_COUNTRY";
export const RESET_APP = "RESET_APP";

interface IAction {
  type: string;
  payload: any;
}
export const setCountry = (country: string): IAction => ({
  type: SET_COUNTRY,
  payload: country,
});

export const resetApp = () => ({
  type: RESET_APP,
});
