import { IAction, IshopsReducer, Ishop } from "../interfaces";
import { SET_SHOPS, SET_IS_LOADING_SHOPS, RESET_SHOPS } from "../actions/shops";

const initialState: IshopsReducer = {
  isLoading: false,
  shops: [],
};

const shopsReducer = (state = initialState, action: IAction): IshopsReducer => {
  switch (action.type) {
    case SET_SHOPS:
      return { ...state, shops: action.payload };
    case SET_IS_LOADING_SHOPS:
      return { ...state, isLoading: action.payload };
    case RESET_SHOPS:
      return initialState;
    default:
      return state;
  }
};

export default shopsReducer;
