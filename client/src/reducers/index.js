import { combineReducer, combineReducers } from "redux";
import subscribeToChannelReducer from "./subscribeToChannelReducer";
import messageReducer from "./messageReducer";
import agentReducer from "./agentReducer";

export default combineReducers({
  subscribeToChannelReducer,
  messageReducer,
  agentReducer,
});
