import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";
import store from "../store/store";

function Channel() {
  const channelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const agentName = useSelector((state) => state.agentReducer.agentName);

  // const oldChannelID = useSelector(
  //   (state) => state.subscribeToChannelReducer.previousChannelID
  // );

  const messageLog = useSelector((state) => state.messageReducer.messageLog);

  const chatMessages = messageLog.map((msg) => {
    return <ChatMessage key={v4()} message={msg} />;
  });

  return (
    <>
      {chatMessages}
      <div className="chatMessage">
        <ChatInput cid={channelID} agentName={agentName} store={store} />
      </div>
    </>
  );
}

export default Channel;
