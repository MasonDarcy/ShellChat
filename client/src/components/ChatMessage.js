import React from "react";
import { getStyle } from "./helpers/getStyle";

function ChatMessage({ message, agent, eventName, channelID, keys }) {
  let style = getStyle(eventName, keys);
  let channelPrefix = channelID ? channelID : `root`;

  switch (eventName) {
    case keys.CHAT_EVENT_KEY:
      return (
        <div className={style}>{`<${agent}><${channelPrefix}>${message}`}</div>
      );
    case keys.LEFT_CHANNEL_KEY:
      return <div className={style}>{`<${agent}> has left the channel.`}</div>;
    case keys.JOINED_CHANNEL_KEY:
      return (
        <div className={style}>{`<${agent}> has joined the channel.`}</div>
      );
    case keys.ERROR_EVENT_KEY:
      return <div className={style}>{`${message}`}</div>;
    case keys.HELP_EVENT_KEY:
      return <div>{message}</div>;
    case keys.COMMAND_SUCCESS_EVENT_KEY:
      return <div className={style}>{message}</div>;
    default:
      return null;
  }
}

export default ChatMessage;
