import React from "react";
import { useSelector } from "react-redux";
import CodeEditor from "./prototypes/CodeMirrorEditor";
import ResizePanel from "react-resize-panel";

function ChannelModule({ keys }) {
  const currentModule = useSelector(
    (state) => state.subscribeToChannelReducer.currentModule
  );

  const currentChannelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const agentName = useSelector((state) => state.agentReducer.agentName);

  switch (currentModule) {
    case keys.CODE_MODULE_KEY:
      return (
        <div className="module">
          <CodeEditor
            currentChannelID={currentChannelID}
            agentName={agentName}
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

{
  /* <div className="module">
            <CodeEditor
              currentChannelID={currentChannelID}
              agentName={agentName}
            />
          </div> */
}
