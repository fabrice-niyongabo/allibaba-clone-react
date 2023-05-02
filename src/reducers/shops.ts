import { IAction, IshopsReducer, Ishop } from "../interfaces";
import { SET_SHOPS, SET_IS_LOADING_SHOPS, RESET_SHOPS } from "../actions/shops";

const initialState: IshopsReducer = {
  isLoading: false,
  shops: [],
};

const shopsReducer = (state: IshopsReducer = initialState, action: IAction) => {
  switch (action.type) {
    case SET_SHOPS:
      return { ...state, shops: action.payload as Ishop[] };
    case SET_IS_LOADING_SHOPS:
      return { ...state, isLoading: action.payload as boolean };
    case RESET_SHOPS:
      return initialState;
    default:
      return state;
  }
};

export default shopsReducer;
