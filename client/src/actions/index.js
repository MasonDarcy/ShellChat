let { subscribeAction } = require("./subscribeAction");
let { messageAction } = require("./messageAction");
let { helpMessageAction } = require("./helpMessageAction");
let { loginAction } = require("./loginAction");
let { logoutAction } = require("./logoutAction");
let { setAgentNameAction } = require("./setAgentNameAction");
let { unsubscribeAction } = require("./unsubscribeAction");
let { clearMessagesAction } = require("./clearMessagesAction");
let { channelMessageAction } = require("./channelMessageAction");
let { errorMessageAction } = require("./errorMessageAction");
let { autoLoginAction } = require("./autoLoginAction");
let { friendRequestAction } = require("./friendRequestAction");
let { subscribeToFriendsAction } = require("./subscribeToFriendsAction");

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
