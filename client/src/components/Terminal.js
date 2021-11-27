import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Channel from "./Channel";
import ChannelModule from "./ChannelModule";
import ConsoleOutputBox from "./prototypes/ConsoleOutputBox";

function Terminal({ keys }) {
  const currentModule = useSelector(
    (state) => state.subscribeToChannelReducer.currentModule
  );

  const [commandState, setCommandState] = useState(true);

  if (currentModule) {
    return (
      <>
        <div draggable={false} className="grid grid-cols-2">
          <div className="columnItem border-solid border-2 border-green-900 p-3">
            <Channel
              draggable={false}
              className="border-solid border-2 border-green-900"
              keys={keys}
              commandState={commandState}
              setCommandState={setCommandState}
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

        <ConsoleOutputBox />
      </>
    );
  } else {
    //Return just the terminal window
    return (
      <>
        <div className="singleItem  border-solid border-2 border-green-900 p-3">
          <Channel
            draggable={false}
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
//      <ChannelModule keys={keys} currentModule={currentModule} />

/*

    ;

*/
