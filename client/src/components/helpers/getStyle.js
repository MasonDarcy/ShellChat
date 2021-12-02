export const getStyle = (eventName, keys) => {
  switch (eventName) {
    case keys.CHAT_EVENT_KEY:
      return "chatMessage";
    case keys.LEFT_CHANNEL_KEY:
      return "leftChannel";
    case keys.JOINED_CHANNEL_KEY:
      return "joinedChannel";
    case keys.ERROR_EVENT_KEY:
      return "commandError";
    case keys.HELP_EVENT_KEY:
      return "help";
    case keys.COMMAND_SUCCESS_EVENT_KEY:
    case keys.FRIEND_HAS_ACCEPTED_KEY:
    case keys.SENT_FRIEND_REQUEST_KEY:
      return "commandSuccess";
    case keys.NEW_FRIEND_MESSAGE_EVENT_KEY:
    case keys.FRIEND_LIST_ITEM_EVENT_KEY:
      return "friend";
    case keys.AUTH_SUCCESS_EVENT_KEY:
      return "authSuccess";
    case keys.AGENT_ACTION_KEY:
      return "agentAction";
    case keys.CODE_OUTPUT_KEY:
      return "codeOutput";
  }
};
