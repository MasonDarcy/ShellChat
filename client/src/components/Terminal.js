import React from "react";
import Channel from "./Channel";

function Terminal({ keys }) {
  return (
    <>
      <div>
        <Channel keys={keys} />
      </div>
    </>
  );
}

export default Terminal;
