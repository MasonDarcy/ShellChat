let {
  subscribeAction,
} = require("./channelActions/authorizedChannelActions/subscribeAction");
let { messageAction } = require("./messageActions/messageAction");
let { helpMessageAction } = require("./messageActions/helpMessageAction");
let { loginAction } = require("./loginActions/loginAction");
let { logoutAction } = require("./loginActions/logoutAction");
let { unsubscribeAction } = require("./channelActions/unsubscribeAction");
let { clearMessagesAction } = require("./messageActions/clearMessagesAction");
let { channelMessageAction } = require("./channelActions/channelMessageAction");
let { errorMessageAction } = require("./messageActions/errorMessageAction");
let { autoLoginAction } = require("./loginActions/autoLoginAction");
let {
  friendRequestAction,
} = require("./friendActions/authorizedFriendActions/friendRequestAction");
let {
  subscribeToFriendsAction,
} = require("./friendActions/subscribeToFriendsAction");
let {
  acceptFriendRequestAction,
} = require("./friendActions/authorizedFriendActions/acceptFriendRequestAction");
let {
  rejectFriendRequestAction,
} = require("./friendActions/authorizedFriendActions/rejectFriendRequestAction");
let { authorizedAction } = require("./authorizedAction");
let {
  friendMessageAction,
} = require("./friendActions/authorizedFriendActions/friendMessageAction");
let {
  getFriendListAction,
} = require("./friendActions/authorizedFriendActions/getFriendListAction");
let {
  loadChannelModuleAction,
} = require("./channelActions/authorizedChannelActions/loadChannelModuleAction");
let { runCodeAction } = require("./channelActions/runCodeAction");
let { signupAction } = require("./loginActions/signupAction");
let { runDemoAction } = require("./runDemoAction");
let { serverMessageAction } = require("./messageActions/serverMessageAction");
let {
  specialServerMessageAction,
} = require("./messageActions/specialServerMessageAction");
let { getRequestsAction } = require("./friendActions/getRequestsAction");
module.exports = {
  getRequestsAction,
  specialServerMessageAction,
  serverMessageAction,
  runDemoAction,
  signupAction,
  runCodeAction,
  loadChannelModuleAction,
  getFriendListAction,
  authorizedAction,
  subscribeAction,
  unsubscribeAction,
  subscribeToFriendsAction,
  friendRequestAction,
  messageAction,
  clearMessagesAction,
  channelMessageAction,
  helpMessageAction,
  errorMessageAction,
  loginAction,
  autoLoginAction,
  logoutAction,
  acceptFriendRequestAction,
  rejectFriendRequestAction,
  friendMessageAction,
};
