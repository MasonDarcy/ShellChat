import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "../codemodule/CodeMirrorEditor";
import { v4 } from "uuid";

const ChannelModule = React.forwardRef((props, ref) => {
  const { keys, currentModule } = props;
  const currentChannelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const demoMode = useSelector((state) => state.agentReducer.demoMode);

  const agentName = useSelector((state) => state.agentReducer.agentName);
  const editorSizeRef = useRef(null);

  switch (currentModule) {
    case keys.CODE_MODULE_KEY:
      if (demoMode) {
        return (
          <CodeEditor
            currentChannelID={v4()}
            agentName={agentName}
            keys={keys}
            ref={ref}
          ></CodeEditor>
        );
      } else {
        return (
          <CodeEditor
            ref={ref}
            currentChannelID={currentChannelID}
            agentName={agentName}
            keys={keys}
          ></CodeEditor>
        );
      }
    default:
      console.log(`Default. currentModule: ${currentModule}`);
      console.log(`keys.CODE_MODULE_KEY: ${keys.CODE_MODULE_KEY}`);
      return null;
  }
});

export default ChannelModule;
