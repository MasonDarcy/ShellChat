import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import useSubscribeToChat from "./helpers/subscribe";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";
//import { v4 as iiudv4, v4 } from "uuid";

function Channel() {

  const [messageList, setMessageList] = useState([]);
  const channelID = useSelector(state => state.subscribeToChannel.currentChannelID);
  
  useEffect(() => {

    if(channelID) {
    
    const source = new EventSource(`http://localhost:5000/api/chat/${channelID.channelID}`);
    source.onmessage = function logEvents(event) {
      setMessageList((oldState) => [...oldState, JSON.parse(event.data)]);
    };
    }
  }, channelID);

  const chatMessages = messageList.map((msg) => ( 
    <ChatMessage key={v4()} message={msg} />
  ));

  return (
    <>
      {chatMessages}
      <div className="chatMessage">
        <ChatInput />
      </div>
    </>
  );
}


export default Channel;
