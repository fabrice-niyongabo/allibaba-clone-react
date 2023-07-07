import axios from "axios";
import { app } from "constants";
import { Ishop } from "../interfaces";
import { errorHandler, setHeaders } from "../components/helpers";

export const SET_MY_SHOP = "SET_MY_SHOP";
export const SET_IS_LOADING_MY_SHOP = "SET_IS_LOADING_MY_SHOP";
export const RESET_MY_SHOP = "RESET_MY_SHOP";

interface IAction {
  type: string;
  payload: any;
}
export const setMyShop = (shop: Ishop): IAction => ({
  type: SET_MY_SHOP,
  payload: shop,
});
export const setIsLoadingMyShop = (value: boolean): IAction => ({
  type: SET_IS_LOADING_MY_SHOP,
  payload: value,
});

export const resetMyShop = () => ({ type: RESET_MY_SHOP });

export const fetchMyShop = (): any => (dispatch: any, getState: any) => {
  const { user } = getState();
  dispatch(setIsLoadingMyShop(true));
  axios
    .get(app.BACKEND_URL + "/shops/mine", setHeaders(user.token))
    .then((res) => {
      dispatch(setMyShop(res.data.shop));
      dispatch(setIsLoadingMyShop(false));
    })
    .catch((error) => {
      errorHandler(error);
      dispatch(setIsLoadingMyShop(false));
    });
};
