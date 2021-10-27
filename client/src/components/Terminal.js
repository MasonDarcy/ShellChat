import React from "react";
import Channel from "./Channel";

function Terminal({ channelID }) {
  return (
    <>
      <div>
        <Channel channelID={channelID} />
      </div>
    </>
  );
}

export default Terminal;
