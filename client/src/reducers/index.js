import { combineReducer, combineReducers } from "redux";
import subscribeToChannelReducer from "./subscribeToChannelReducer";
import subscribeToFriendsReducer from "./subscribeToFriendsReducer";

import messageReducer from "./messageReducer";
import agentReducer from "./agentReducer";

export default combineReducers({
  subscribeToChannelReducer,
  subscribeToFriendsReducer,
  messageReducer,
  agentReducer,
});
