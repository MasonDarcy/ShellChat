import React, { useState } from "react";
import { ROOT_CONSOLE_VAL } from "../resources/Strings";
import dispatchCommand from "./helpers/commandParser/dispatchCommand";

function ChatInput({ cid }) {
  const [command, setCommand] = useState({ contents: "" });
  let { contents } = command;
  let prefix;
  cid ? (prefix = cid) : (prefix = ROOT_CONSOLE_VAL);

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatchCommand(contents, cid);
            setCommand({ contents: "" });
          }}
        >
          <label htmlFor="commandInput">{`<${prefix}>`}</label>
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
