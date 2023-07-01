import { IAction, ICountriesReducer } from "../interfaces";
import {
  SET_COUNTRIES,
  SET_IS_LOADING_COUNTRIES,
  RESET_COUNTRIES,
} from "../actions/countries";

const initialState: ICountriesReducer = {
  isLoading: false,
  countries: [],
};

const countries = (
  state: ICountriesReducer = initialState,
  action: IAction
): ICountriesReducer => {
  switch (action.type) {
    case SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case SET_IS_LOADING_COUNTRIES:
      return { ...state, isLoading: action.payload };
    case RESET_COUNTRIES:
      return initialState;
    default:
      return state;
  }
};

export default countries;
