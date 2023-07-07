import { IUser, IAction, IMyshopReducer } from "../interfaces";
import {
  SET_MY_SHOP,
  SET_IS_LOADING_MY_SHOP,
  RESET_MY_SHOP,
} from "../actions/myShop";

const initialState: IMyshopReducer = {
  isLoading: false,
  myShop: undefined,
};

const user = (
  state: IMyshopReducer = initialState,
  action: IAction
): IMyshopReducer => {
  switch (action.type) {
    case SET_MY_SHOP:
      return { ...state, myShop: action.payload };
    case SET_IS_LOADING_MY_SHOP:
      return { ...state, isLoading: action.payload };
    case RESET_MY_SHOP:
      return initialState;
    default:
      return state;
  }
};

export default user;
