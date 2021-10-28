import React, { useState, useEffect } from "react";
import sendCommand from "./helpers/sendCommand";

function ChatInput({ channelID }) {
  const prefix = `<${channelID}>`;
  const [command, setCommand] = useState({ contents: "" });
  let { contents } = command;

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendCommand(e, channelID, contents);
            setCommand({ contents: "" });
          }}
        >
          <label htmlFor="commandInput">{`${prefix}`}</label>
          <input
            className="commandInput"
            id="commandInput"
            name="command"
            type="text"
            value={contents}
            onChange={(e) => {
              setCommand({ contents: e.target.value });
            }}
          />
        </form>
      </div>
    </>
  );
}

export default ChatInput;
