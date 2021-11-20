import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Channel from "./Channel";
import ChannelModule from "./ChannelModule";
import SplitPane from "react-split-pane";

function Terminal({ keys }) {
  const currentModule = useSelector(
    (state) => state.subscribeToChannelReducer.currentModule
  );

  const [commandState, setCommandState] = useState(false);

  const dispatch = useDispatch();

  if (currentModule) {
    return (
      <>
        <SplitPane
          split="vertical"
          minSize={300}
          maxSize={1000}
          defaultSize={500}
          style={{
            position: "relative",
            overflow: "hidden",
            borderBottom: "solid",
            borderBottomColor: "#2a5a80",
            tabindex: "-1",
          }}
        >
          <div className="chan">
            <Channel
              keys={keys}
              commandState={commandState}
              setCommandState={setCommandState}
            />
          </div>
          <div className="mod">
            <ChannelModule keys={keys} currentModule={currentModule} />
          </div>
        </SplitPane>
      </>
    );
  } else {
    //Return just the terminal window
    return (
      <>
        <div className="channelBox">
          <Channel
            keys={keys}
            commandState={commandState}
            setCommandState={setCommandState}
          />
        </div>
      </>
    );
  }
}

export default Terminal;
