import { combineReducers } from "redux";
import user from "./user";
import myShop from "./myShop";
import categories from "./categories";
import shops from "./shops";
const rootReducer = combineReducers({
  user,
  myShop,
  categories,
  shops,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
