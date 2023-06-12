import { IUser, IAction } from "../interfaces";
import {
  SET_USER_NAMES,
  SET_USER_EMAIL,
  SET_USER_TOKEN,
  SET_USER_ROLE,
  RESET_USER,
  SET_USER_PHONE,
  SET_USER_ID,
  SET_USER_IMAGE,
  SET_USER_SHOP_ID,
  SET_USER_APPLY,
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
  apply: false,
};

const user = (state: IUser = initialState, action: IAction): IUser => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    case SET_USER_NAMES:
      return { ...state, names: action.payload };
    case SET_USER_IMAGE:
      return { ...state, image: action.payload };
    case SET_USER_EMAIL:
      return { ...state, email: action.payload };
    case SET_USER_PHONE:
      return { ...state, phone: action.payload };
    case SET_USER_ROLE:
      return { ...state, role: action.payload };
    case SET_USER_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER_SHOP_ID:
      return { ...state, shopId: action.payload };
    case SET_USER_APPLY:
      return { ...state, apply: action.payload };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
