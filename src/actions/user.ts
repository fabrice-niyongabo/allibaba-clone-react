import axios from "axios";
import { app } from "../constants";

export const SET_USER_NAMES = "SET_USER_NAMES";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_PHONE = "SET_USER_PHONE";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_ROLE = "SET_USER_ROLE";
export const SET_USER_IMAGE = "SET_USER_IMAGE";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_SHOP_ID = "SET_USER_SHOP_ID";
export const SET_USER_APPLY = "SET_USER_APPLY";
export const RESET_USER = "RESET_USER";

interface IAction {
  type: string;
  payload: any;
}
export const setUserNames = (names: string): IAction => ({
  type: SET_USER_NAMES,
  payload: names,
});
export const setUserApply = (value: boolean): IAction => ({
  type: SET_USER_APPLY,
  payload: value,
});
export const setUserImage = (image: string): IAction => ({
  type: SET_USER_IMAGE,
  payload: image,
});
export const setUserEmail = (value: string): IAction => ({
  type: SET_USER_EMAIL,
  payload: value,
});

export const setUserPhone = (value: string): IAction => ({
  type: SET_USER_PHONE,
  payload: value,
});

export const setUserId = (value: number): IAction => ({
  type: SET_USER_ID,
  payload: value,
});

export const setUserShopId = (value: number | null): IAction => ({
  type: SET_USER_SHOP_ID,
  payload: value,
});

export const setUserToken = (value: string): IAction => ({
  type: SET_USER_TOKEN,
  payload: value,
});

export const setUserRole = (value: string): IAction => ({
  type: SET_USER_ROLE,
  payload: value,
});

export const resetUser = () => ({ type: RESET_USER });

export const saveAppToken = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  try {
    if (user.fbToken.trim() === "") {
      return;
    }
    axios
      .post(app.BACKEND_URL + "/apptokens/", {
        userId: user.userId,
        fbToken: user.fbToken,
        appType: "CLIENT",
      })
      .then((res) => {
        // console.log({res});
      })
      .catch((error) => {
        // console.log({error});
      });
  } catch (error) {}
};
