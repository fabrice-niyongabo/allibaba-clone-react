import { combineReducers } from "redux";
import user from "./user";
import myShop from "./myShop";
import categories from "./categories";
const rootReducer = combineReducers({
  user,
  myShop,
  categories,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
