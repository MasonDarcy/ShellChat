import React from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { v4 } from "uuid";
import store from "../../store/store";

const Channel = React.forwardRef((props, ref) => {
  const { keys } = props;
  const channelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

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
        embedded={msgData.embedded}
        embedded2={msgData.embedded2}

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
            ref={ref}
          />
        </div>
        <div ref={ref.scroll}></div>
      </div>
    </>
  );
});

export default Channel;
