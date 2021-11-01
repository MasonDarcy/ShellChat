import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";
import sendChat from "./helpers/sendChat";

function Channel() {
  const [messageList, setMessageList] = useState([]);
  //const [previousChannel, setPreviousChannel] = useState(null);

  const channelID = useSelector(
    (state) => state.subscribeToChannel.currentChannelID
  );

  const oldChannelID = useSelector(
    (state) => state.subscribeToChannel.previousChannelID
  );

  //Subscribe to incoming chat messages on a given channel identifier
  useEffect(() => {
    if (channelID) {
      sendChat("User has left the channel.", oldChannelID);

      const source = new EventSource(
        `http://localhost:5000/api/chat/${channelID}`
      );

      source.onmessage = function logEvents(event) {
        setMessageList((oldState) => [...oldState, JSON.parse(event.data)]);
      };

      return () => source.close();
    }
  }, [channelID]);

  const chatMessages = messageList.map((msg) => (
    <ChatMessage key={v4()} message={msg} />
  ));

  return (
    <>
      {chatMessages}
      <div className="chatMessage">
        <ChatInput
          cid={channelID}
          setMessageList={setMessageList}
          setMessageList={setMessageList}
        />
      </div>
    </>
  );
}

export default Channel;
