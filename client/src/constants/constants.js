/*Some of these are shared with the back-end API.-----------------------*/

//channelEvents
const JOINED_CHANNEL_KEY = "JOINED_CHANNEL";
const LEFT_CHANNEL_KEY = "LEFT_CHANNEL";

//Normal chat
const CHAT_EVENT_KEY = "CHAT_EVENT";

//Command error
const ERROR_EVENT_KEY = "ERROR_EVENT";

//Help event
const HELP_EVENT_KEY = "HELP_EVENT";

//Friend request event
const FRIEND_REQUEST_EVENT_KEY = "FRIEND_REQUEST_EVENT";

//Succesful server action
const COMMAND_SUCCESS_EVENT_KEY = "COMMAND_SUCCESS_EVENT";

//Succesful authentication action
const AUTH_SUCCESS_EVENT_KEY = "AUTH_SUCCESS_EVENT";

//Succesful authentication action
const AGENT_ACTION_KEY = "AGENT_ACTION_KEY";

//Friend request accepted event
const FRIEND_REQUEST_ACCEPTED_EVENT_KEY = "FRIEND_REQUEST_ACCEPTED_EVENT";

//Friend has logged on event
const FRIEND_HAS_LOGGED_ON_EVENT_KEY = "FRIEND_HAS_LOGGED_ON_EVENT";

//Friend has logged off event
const FRIEND_HAS_LOGGED_OFF_EVENT_KEY = "FRIEND_HAS_LOGGED_OFF_EVENT";

//Friend message
const NEW_FRIEND_MESSAGE_EVENT_KEY = "NEW_FRIEND_MESSAGE_EVENT";

//Module keys
const CODE_MODULE_KEY = "CODE";
const LOAD_MODULE_KEY = "LOAD_MODULE";

//CODE OUTPUT
const CODE_OUTPUT_KEY = "CODE_OUTPUT";

//Friend event keys
const FRIEND_HAS_ACCEPTED_KEY = "FRIEND_HAS_ACCEPTED";

/*----------------------------------------------------------------------*/
module.exports = {
  FRIEND_HAS_ACCEPTED_KEY,

  CODE_OUTPUT_KEY,
  AGENT_ACTION_KEY,
  AUTH_SUCCESS_EVENT_KEY,
  JOINED_CHANNEL_KEY,
  LEFT_CHANNEL_KEY,
  CHAT_EVENT_KEY,
  ERROR_EVENT_KEY,
  HELP_EVENT_KEY,
  FRIEND_REQUEST_EVENT_KEY,
  FRIEND_REQUEST_ACCEPTED_EVENT_KEY,
  FRIEND_HAS_LOGGED_ON_EVENT_KEY,
  FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
  NEW_FRIEND_MESSAGE_EVENT_KEY,
  COMMAND_SUCCESS_EVENT_KEY,
  LOAD_MODULE_KEY,
  CODE_MODULE_KEY,
};
