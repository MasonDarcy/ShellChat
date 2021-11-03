import { combineReducer, combineReducers } from "redux";
import subscribeToChannelReducer from "./subscribeToChannelReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  subscribeToChannelReducer,
  messageReducer,
});
