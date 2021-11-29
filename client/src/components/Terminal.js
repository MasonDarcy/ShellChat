import React, { useState } from "react";
import { useSelector } from "react-redux";
import Channel from "./channel/Channel";
import ChannelModule from "./channel/ChannelModule";
import ConsoleOutputBox from "./codemodule/ConsoleOutputBox";

function Terminal({ keys }) {
  const currentModule = useSelector(
    (state) => state.subscribeToChannelReducer.currentModule
  );

  const outputLog = useSelector((state) => state.codeModuleReducer.outputLog);

  if (currentModule) {
    return (
      <>
        <div draggable={false} className="grid grid-cols-2">
          <div className="columnItem border-solid border-2 border-green-900 p-3">
            <Channel
              draggable={false}
              className="border-solid border-2 border-green-900"
              keys={keys}
            />
          </div>
          <div className="columnItem border-solid border-2 border-green-900">
            <ChannelModule
              draggable={false}
              keys={keys}
              currentModule={currentModule}
            />
          </div>
        </div>

        <ConsoleOutputBox codeOutput={outputLog} />
      </>
    );
  } else {
    //Return just the terminal window
    return (
      <>
        <div className="singleItem  border-solid border-2 border-green-900 p-3">
          <Channel draggable={false} keys={keys} />
        </div>
      </>
    );
  }
}

export default Terminal;
//      <ChannelModule keys={keys} currentModule={currentModule} />

/*

    ;

*/
