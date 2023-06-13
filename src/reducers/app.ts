import { IAction, IAppReducer, ICategory } from "../interfaces";
import { RESET_APP, SET_COUNTRY } from "../actions/app";

const initialState: IAppReducer = {
  country: "RWANDA",
};

const user = (
  state: IAppReducer = initialState,
  action: IAction
): IAppReducer => {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.payload };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};

export default user;
