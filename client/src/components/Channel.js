import React, { useState, useEffect } from "react";
import useSubscribeToChat from "./helpers/subscribe";
import ChatMessage from "./ChatMessage";
import { v4 as iiudv4, v4 } from "uuid";

function Channel({ channelID }) {
  const backendURI = `http://localhost:5000/api/chat/${channelID}`;

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const source = new EventSource(backendURI);
    source.onmessage = function logEvents(event) {
      setMessageList((oldState) => [...oldState, JSON.parse(event.data)]);
    };
  }, []);

  const chatMessages = messageList.map((msg) => (
    <ChatMessage key={v4()} message={msg} />
  ));

  return (
    <>
      <div className="channelBox">{chatMessages}</div>
    </>
  );
}

export default Channel;
