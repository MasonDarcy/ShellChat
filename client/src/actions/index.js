let {
  subscribeAction,
} = require("./channelActions/authorizedChannelActions/subscribeAction");
let { messageAction } = require("./messageActions/messageAction");
let { helpMessageAction } = require("./messageActions/helpMessageAction");
let { loginAction } = require("./loginActions/loginAction");
let { logoutAction } = require("./loginActions/logoutAction");
let { setAgentNameAction } = require("./setAgentNameAction");
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
let { testAction } = require("./testAction");
let {
  friendMessageAction,
} = require("./friendActions/authorizedFriendActions/friendMessageAction");
let {
  getFriendListAction,
} = require("./friendActions/authorizedFriendActions/getFriendListAction");
module.exports = {
  getFriendListAction,
  authorizedAction,
  testAction,
  subscribeAction,
  unsubscribeAction,
  subscribeToFriendsAction,
  friendRequestAction,
  messageAction,
  setAgentNameAction,
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
