import { combineReducer, combineReducers } from "redux";
import subscribeToChannelReducer from "./subscribeToChannelReducer";
import subscribeToFriendsReducer from "./subscribeToFriendsReducer";
import subscribeToAuthReducer from "./subscribeToAuthReducer";
import messageReducer from "./messageReducer";
import agentReducer from "./agentReducer";

export default combineReducers({
  subscribeToAuthReducer,
  subscribeToChannelReducer,
  subscribeToFriendsReducer,
  messageReducer,
  agentReducer,
});
