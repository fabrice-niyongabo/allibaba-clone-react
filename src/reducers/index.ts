import { combineReducers } from "redux";
import user from "./user";
import myShop from "./myShop";
import categories from "./categories";
import shops from "./shops";
import products from "./products";
import appReducer from "./appReducer";
import countries from "./countries";
import estimations from "./shippingEstimations";
import wishlist from "./wishlist";
const rootReducer = combineReducers({
  user,
  myShop,
  categories,
  shops,
  products,
  appReducer,
  countries,
  estimations,
  wishlist,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
