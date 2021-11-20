import React from "react";
import { useSelector } from "react-redux";
import Channel from "./Channel";
import ChannelModule from "./ChannelModule";
import SplitPane from "react-split-pane";

function Terminal({ keys }) {
  const currentModule = useSelector(
    (state) => state.subscribeToChannelReducer.currentModule
  );

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
            <Channel keys={keys} />
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
          <Channel keys={keys} />
        </div>
      </>
    );
  }
}

export default Terminal;

// return (
//   <>
//     <div className="mainRow">
//       <div className="channelColumn">
//         <Channel keys={keys} />
//       </div>
//       <div className="moduleColumn">
//         <ChannelModule keys={keys} />
//       </div>
//     </div>
//   </>
// );
