import { IAction, IServicesReducer } from "../interfaces";
import {
  SET_SERVICES,
  SET_IS_LOADING_SERVICES,
  RESET_SERVICES,
} from "../actions/services";

const initialState: IServicesReducer = {
  isLoading: false,
  services: [],
};

const user = (
  state: IServicesReducer = initialState,
  action: IAction
): IServicesReducer => {
  switch (action.type) {
    case SET_SERVICES:
      return { ...state, services: action.payload };
    case SET_IS_LOADING_SERVICES:
      return { ...state, isLoading: action.payload };
    case RESET_SERVICES:
      return initialState;
    default:
      return state;
  }
};

export default user;
