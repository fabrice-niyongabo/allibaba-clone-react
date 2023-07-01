import { IAction, IProductsReducer, IProduct } from "../interfaces";
import {
  SET_PRODUCTS,
  SET_IS_LOADING_PRODUCTS,
  RESET_PRODUCTS,
} from "../actions/products";

const initialState: IProductsReducer = {
  isLoading: false,
  products: [],
};

const user = (
  state: IProductsReducer = initialState,
  action: IAction
): IProductsReducer => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_IS_LOADING_PRODUCTS:
      return { ...state, isLoading: action.payload };
    case RESET_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};

export default user;
