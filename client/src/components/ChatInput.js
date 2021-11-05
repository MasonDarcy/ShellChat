import React, { useState } from "react";
import { ROOT_CONSOLE_VAL } from "../resources/Strings";
import dispatchCommand from "./helpers/commandParser/dispatchCommand";
import actions from "../actions";
import sendChat from "./helpers/sendChat";

function ChatInput({ cid, agentName, store, keys }) {
  const [command, setCommand] = useState({ contents: "" });
  let { contents } = command;

  /*This logic may be subject to change later once signup and login are implemented.
  I think it should stay relatively stable.
  */
  let prefix;
  let agentPrefix;
  agentName ? (agentPrefix = agentName) : (agentPrefix = "unknown");
  cid ? (prefix = cid) : (prefix = ROOT_CONSOLE_VAL);

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatchCommand(contents, cid, store, actions, sendChat, keys);
            setCommand({ contents: "" });
          }}
        >
          <label htmlFor="commandInput">{`<${agentName}><${prefix}>`}</label>
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
