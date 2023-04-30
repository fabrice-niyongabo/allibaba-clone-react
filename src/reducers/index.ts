import { combineReducers } from "redux";
import user from "./user";
import myShop from "./myShop";
const rootReducer = combineReducers({
  user,
  myShop,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
