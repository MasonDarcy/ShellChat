import React from "react";
import { useSelector } from "react-redux";
import CodeEditor from "./prototypes/CodeMirrorEditor";

function ChannelModule({ keys, currentModule }) {
  const currentChannelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const agentName = useSelector((state) => state.agentReducer.agentName);

  switch (currentModule) {
    case keys.CODE_MODULE_KEY:
      return (
        <div>
          <CodeEditor
            currentChannelID={currentChannelID}
            agentName={agentName}
            keys={keys}
          />
        </div>
      );
    default:
      console.log(`Default. currentModule: ${currentModule}`);
      console.log(`keys.CODE_MODULE_KEY: ${keys.CODE_MODULE_KEY}`);
      return null;
  }
}

export default ChannelModule;
