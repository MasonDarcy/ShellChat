import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";

function Channel() {
  const channelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

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
        <ChatInput cid={channelID} />
      </div>
    </>
  );
}

export default Channel;
