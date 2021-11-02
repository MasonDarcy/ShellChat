import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";
import sendChat from "./helpers/sendChat";

function Channel() {
  const [messageList, setMessageList] = useState([]);
  const channelID = useSelector(
    (state) => state.subscribeToChannel.currentChannelID
  );
  const oldChannelID = useSelector(
    (state) => state.subscribeToChannel.previousChannelID
  );
  const messageLog = useSelector((state) => state.messageReducer.messageLog);

  //Changed this to MESSAGE LOG from messageList
  const chatMessages = messageLog.map((msg) => {
    return <ChatMessage key={v4()} message={msg} />;
  });

  return (
    <>
      {chatMessages}
      <div className="chatMessage">
        <ChatInput cid={channelID} setMessageList={setMessageList} />
      </div>
    </>
  );
}

export default Channel;
