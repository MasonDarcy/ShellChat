let { subscribeAction } = require("./channelActions/subscribeAction");
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
let { friendRequestAction } = require("./friendActions/friendRequestAction");
let {
  subscribeToFriendsAction,
} = require("./friendActions/subscribeToFriendsAction");

module.exports = {
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
};
