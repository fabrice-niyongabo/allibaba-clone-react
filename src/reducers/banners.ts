import {
  SET_BANNERS,
  SET_IS_LOADING_BANNERS,
  RESET_BANNERS,
} from "../actions/banners";
import { IAction, IBannersReducer } from "../interfaces";

const initialState: IBannersReducer = {
  banners: [],
  isLoading: false,
};

const bannersReducer = (
  state = initialState,
  action: IAction
): IBannersReducer => {
  switch (action.type) {
    case SET_BANNERS:
      return { ...state, banners: action.payload };

    case SET_IS_LOADING_BANNERS:
      return { ...state, isLoading: action.payload };

    case RESET_BANNERS:
      return initialState;
    default:
      return state;
  }
};

export default bannersReducer;
