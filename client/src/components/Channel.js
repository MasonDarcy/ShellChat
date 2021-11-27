import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";
import store from "../store/store";
const { Rnd } = require("react-rnd");
function Channel({ keys, commandState, setCommandState }) {
  const channelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const [info, setInfo] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight / 2,
    x: 0,
    y: 8,
  });

  const { x, y, width, height } = info;

  const agentName = useSelector((state) => state.agentReducer.agentName);
  const messageLog = useSelector((state) => state.messageReducer.messageLog);

  const chatMessages = messageLog.map((msgData) => {
    return (
      <ChatMessage
        key={v4()}
        message={msgData.message}
        agent={msgData.agent}
        eventName={msgData.eventName}
        channelID={msgData.channelID}
        keys={keys}
        // {...msgData}
      />
    );
  });

  return (
    <>
      <div className="pl-5 pt-5">
        {" "}
        {chatMessages}
        <div className="chatInput">
          <ChatInput
            cid={channelID}
            agentName={agentName}
            store={store}
            keys={keys}
            commandState={commandState}
            setCommandState={setCommandState}
          />
        </div>
      </div>
    </>
  );
}

export default Channel;
