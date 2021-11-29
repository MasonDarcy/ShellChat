import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "../codemodule/CodeMirrorEditor";

function ChannelModule({ keys, currentModule }) {
  const currentChannelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const agentName = useSelector((state) => state.agentReducer.agentName);
  const editorSizeRef = useRef(null);

  switch (currentModule) {
    case keys.CODE_MODULE_KEY:
      return (
        <CodeEditor
          ref={editorSizeRef}
          currentChannelID={currentChannelID}
          agentName={agentName}
          keys={keys}
        ></CodeEditor>
      );
    default:
      console.log(`Default. currentModule: ${currentModule}`);
      console.log(`keys.CODE_MODULE_KEY: ${keys.CODE_MODULE_KEY}`);
      return null;
  }
}

export default ChannelModule;
