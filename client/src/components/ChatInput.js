import React, { useState, useEffect, useRef } from "react";
import { ROOT_CONSOLE_VAL } from "../resources/Strings";
import dispatchCommand from "./helpers/commandParser/dispatchCommand";
import actions from "../actions";
import sendChat from "./helpers/sendChat";

function ChatInput({
  cid,
  agentName,
  store,
  keys,
  commandState,
  setCommandState,
}) {
  const [command, setCommand] = useState({ contents: "" });
  let { contents } = command;

  let prefix;
  let agentPrefix;
  agentName ? (agentPrefix = agentName) : (agentPrefix = "unknown");
  cid ? (prefix = cid) : (prefix = ROOT_CONSOLE_VAL);

  const commandSwap = (e) => {
    if (e.code == "ArrowDown") {
      setCommandState((prevCheck) => !prevCheck);
    }
  };

  /*Conditional JSX for the command line----------------------------*/
  let chatJsx = (
    <>
      {<span className="focusAgentName">{`${agentName}`}</span>}
      {`<${prefix}>`}
    </>
  );

  let commandJsx = (
    <>
      {<span className="focusAgentName">{`${agentName}`}</span>}
      <span className="command">{`<command> `}</span>
    </>
  );
  /*-----------------------------------------------------------------*/

  let output;

  commandState ? (output = commandJsx) : (output = chatJsx);

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  return (
    <>
      <div onKeyUp={commandSwap}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatchCommand(
              contents,
              cid,
              store,
              actions,
              sendChat,
              keys,
              commandState
            );
            setCommand({ contents: "" });
          }}
        >
          <label htmlFor="commandInput">{output}</label>
          <input
            ref={inputEl}
            className="commandInput"
            id="commandInput"
            name="command"
            type="text"
            autoFocus={true}
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
