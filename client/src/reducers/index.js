import { combineReducer, combineReducers } from "redux";
import subscribeToChannelReducer from "./subscribeToChannelReducer";
import subscribeToFriendsReducer from "./subscribeToFriendsReducer";
import subscribeToAuthReducer from "./subscribeToAuthReducer";
import messageReducer from "./messageReducer";
import agentReducer from "./agentReducer";
import codeModuleReducer from "./codeModuleReducer";

export default combineReducers({
  codeModuleReducer,
  subscribeToAuthReducer,
  subscribeToChannelReducer,
  subscribeToFriendsReducer,
  messageReducer,
  agentReducer,
});
