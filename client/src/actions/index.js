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
let { authorizedAction } = require("./authorizedAction");
let { testAction } = require("./testAction");
let {
  friendMessageAction,
} = require("./friendActions/authorizedFriendActions/friendMessageAction");

module.exports = {
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
  friendMessageAction,
};
