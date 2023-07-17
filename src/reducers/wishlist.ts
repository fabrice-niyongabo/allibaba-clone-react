import { IAction, IWishlistReducer } from "../interfaces";
import {
  SET_WISHLIST,
  SET_IS_LOADING_WISHLIST,
  RESET_WISHLIST,
} from "../actions/wishlist";

const initialState: IWishlistReducer = {
  isLoading: false,
  list: [],
};

const wishlist = (
  state: IWishlistReducer = initialState,
  action: IAction
): IWishlistReducer => {
  switch (action.type) {
    case SET_WISHLIST:
      return { ...state, list: action.payload };
    case SET_IS_LOADING_WISHLIST:
      return { ...state, isLoading: action.payload };
    case RESET_WISHLIST:
      return initialState;
    default:
      return state;
  }
};

export default wishlist;
