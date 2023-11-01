import {
  SET_CART,
  ADD_CART_ITEM,
  RESET_CART,
  REMOVE_CART_ITEM,
} from "../actions/cart";
import { IAction, ICartItem, ICartReducer } from "../interfaces";

const initialState: ICartReducer = {
  cart: [],
};

const cartReducer = (state = initialState, action: IAction): ICartReducer => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };
    case ADD_CART_ITEM: {
      const payload: ICartItem = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productId === payload.productId
      );
      if (index >= 0) {
        let newCart = state.cart;
        newCart[index] = payload;
        return { ...state, cart: newCart };
      } else {
        return { ...state, cart: [...state.cart, { ...payload }] };
      }
    }
    case REMOVE_CART_ITEM:
      const newCart = state.cart.filter(
        (item) => item.productId != action.payload.productId
      );
      return { ...state, cart: newCart };
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
