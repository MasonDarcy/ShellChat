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
  }
};
