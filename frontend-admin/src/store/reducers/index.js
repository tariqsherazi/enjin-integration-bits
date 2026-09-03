import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import AppReducer from "./App";
import adminReducer from "../slices/admin";

export default combineReducers({
  auth: AuthReducer,
  app: AppReducer,
  adminDetails: adminReducer
});
