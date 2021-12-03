import React from "react";
import { getStyle } from "../helpers/getStyle";

function ChatMessage({
  message,
  agent,
  eventName,
  embedded,
  embedded2,
  channelID,
  keys,
}) {
  let style = getStyle(eventName, keys);
  let channelPrefix = channelID ? channelID : `root`;
  console.log(`eventName: ${eventName}`);
  console.log(`eventName: ${keys.EMBEDDED_COMMAND_SUCCESS_EVENT_KEY}`);

  switch (eventName) {
    case keys.CHAT_EVENT_KEY:
      return (
        <div className={style}>
          {<span className="agentName">{`${agent}`}</span>}
          <span className="channelColor">{`<${channelPrefix}>`}</span>{" "}
          {`${message}`}
        </div>
      );
    case keys.LEFT_CHANNEL_KEY:
      return (
        <div className={style}>
          {" "}
          <span className="agentName">{`<${agent}>`}</span>
          {` has left the channel.`}
        </div>
      );
    case keys.JOINED_CHANNEL_KEY:
      return (
        <div className={style}>
          <span className="agentName">{`<${agent}>`}</span>
          {` has joined the channel.`}
        </div>
      );
    case keys.ERROR_EVENT_KEY:
      return <div className={style}>{`${message}`}</div>;
    case keys.PURE_JSX_EVENT_KEY:
      return message;
    case keys.HELP_EVENT_KEY:
      return <div>{message}</div>;
    case keys.COMMAND_SUCCESS_EVENT_KEY:
      return <div className={style}>{message}</div>;
    case keys.EMBEDDED_COMMAND_SUCCESS_EVENT_KEY:
      return (
        <div className={style}>
          {message}
          <span className="channelColor">{` ${embedded} `}</span>
        </div>
      );
    case keys.FRIEND_HAS_ACCEPTED_KEY:
      return (
        <div className={style}>
          <span className="agentName">{`${embedded} `}</span>
          {message}
        </div>
      );
    case keys.SENT_FRIEND_REQUEST_KEY:
      return (
        <div className={style}>
          {message}
          <span className="agentName">{`${embedded}`}</span>
        </div>
      );
    case keys.NEW_FRIEND_MESSAGE_EVENT_KEY:
      return (
        <div className={style}>
          <span className="agentName">{`<${agent}>`}</span>
          <span className={style}>{message}</span>
        </div>
      );
    case keys.FRIEND_LIST_ITEM_EVENT_KEY:
      if (embedded2 == "online") {
        return (
          <div className={style}>
            <span className="agentName">{`${embedded}`}</span>
            <span className={style}> {message}</span>
            <span className="text-green-300"> {embedded2}</span>
          </div>
        );
      } else {
        return (
          <div className={style}>
            <span className="agentName">{`${embedded}`}</span>
            <span className={style}> {message}</span>
            <span className="text-red-300"> {embedded2}</span>
          </div>
        );
      }
    case keys.CODE_OUTPUT_KEY:
      return <div className={style}>{message}</div>;
    case keys.AUTH_SUCCESS_EVENT_KEY:
      return (
        <div className={style}>
          <span className={style}> {message}</span>
          <span className="agentName">{`${embedded}`}</span>.
        </div>
      );
    case keys.AGENT_ACTION_KEY:
      return (
        <div className={style}>
          {agent}
          {message}
        </div>
      );
    default:
      console.log("components/chatMessage/Logged default: null");
      console.log(`eventName: ${eventName}`);
      console.log(`message: ${message}`);

      return null;
  }
}

export default ChatMessage;
