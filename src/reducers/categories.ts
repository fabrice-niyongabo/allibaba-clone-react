import { IAction, ICategoriesReducer, ICategory } from "../interfaces";
import {
  SET_CATEGORIES,
  SET_IS_LOADING_CATEGORIES,
  RESET_CATEGORIES,
} from "../actions/categories";

const initialState: ICategoriesReducer = {
  isLoading: false,
  categories: [],
};

const user = (state: ICategoriesReducer = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload as ICategory[] };
    case SET_IS_LOADING_CATEGORIES:
      return { ...state, isLoading: action.payload as boolean };
    case RESET_CATEGORIES:
      return initialState;
    default:
      return state;
  }
};

export default user;
