import { IUser, IAction } from "../../interfaces";
import {
  SET_USER_NAMES,
  SET_USER_EMAIL,
  SET_USER_TOKEN,
  SET_USER_ROLE,
  RESET_USER,
  SET_USER_PHONE,
  SET_USER_ID,
  SET_USER_IMAGE,
} from "../actions/user";

const initialState: IUser = {
  token: "",
  names: "",
  email: "",
  phone: "",
  image: "",
  role: "" as any,
  userId: 0,
  shopId: null,
  isActive: true,
};

const user = (state: IUser = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload as number };
    case SET_USER_NAMES:
      return { ...state, names: action.payload as string };
    case SET_USER_IMAGE:
      return { ...state, image: action.payload as string };
    case SET_USER_EMAIL:
      return { ...state, email: action.payload as string };
    case SET_USER_PHONE:
      return { ...state, phone: action.payload as string };
    case SET_USER_ROLE:
      return { ...state, role: action.payload as string };
    case SET_USER_TOKEN:
      return { ...state, token: action.payload as string };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
