import { combineReducer, combineReducers } from "redux";
import subscribeToChannel from "./subscribeToChannel";
import messageReducer from "./messageReducer";

export default combineReducers({
  subscribeToChannel,
  messageReducer,
});
