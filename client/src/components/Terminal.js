import React from "react";
import Channel from "./Channel";
import ChannelModule from "./ChannelModule";

function Terminal({ keys }) {
  return (
    <>
      <div className="mainRow">
        <div className="channelColumn">
          <Channel keys={keys} />
        </div>
        <div className="moduleColumn">
          <ChannelModule keys={keys} />
        </div>
      </div>
    </>
  );
}

export default Terminal;
