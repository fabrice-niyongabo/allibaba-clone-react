import { IAction, IShippingEstimationsReducer } from "../interfaces";
import {
  SET_SHIPPING_ESTIMATIONS,
  SET_IS_LOADING_SHIPPING_OPTIONS,
  RESET_SHIPPING_ESTIMATIONS,
  SET_SHIPPING_ESTIMATION_SUPPLIER_ID,
} from "../actions/shippingEstimations";

const initialState: IShippingEstimationsReducer = {
  isLoading: false,
  estimaitons: [],
  supplierId: 0,
};

const user = (
  state: IShippingEstimationsReducer = initialState,
  action: IAction
): IShippingEstimationsReducer => {
  switch (action.type) {
    case SET_SHIPPING_ESTIMATIONS:
      return { ...state, estimaitons: action.payload };
    case SET_SHIPPING_ESTIMATION_SUPPLIER_ID:
      return { ...state, supplierId: action.payload };
    case SET_IS_LOADING_SHIPPING_OPTIONS:
      return { ...state, isLoading: action.payload };
    case RESET_SHIPPING_ESTIMATIONS:
      return initialState;
    default:
      return state;
  }
};

export default user;
