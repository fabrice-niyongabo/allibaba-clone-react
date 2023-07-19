import { IAction, IBookingsReducer } from "../interfaces";
import {
  SET_BOOKINGS,
  SET_IS_LOADING_BOOKINGS,
  RESET_BOOKINGS,
} from "../actions/bookings";

const initialState: IBookingsReducer = {
  isLoading: false,
  bookings: [],
};

const BOOKINGS = (
  state: IBookingsReducer = initialState,
  action: IAction
): IBookingsReducer => {
  switch (action.type) {
    case SET_BOOKINGS:
      return { ...state, bookings: action.payload };
    case SET_IS_LOADING_BOOKINGS:
      return { ...state, isLoading: action.payload };
    case RESET_BOOKINGS:
      return initialState;
    default:
      return state;
  }
};

export default BOOKINGS;
