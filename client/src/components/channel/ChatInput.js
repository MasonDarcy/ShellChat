import React, { useState, useEffect, useRef } from "react";
import { ROOT_CONSOLE_VAL } from "../../resources/Strings";
import dispatchCommand from "../helpers/commandParser/dispatchCommand";
import actions from "../../actions";
import sendChat from "../helpers/sendChat";
import { useSelector } from "react-redux";

const ChatInput = React.forwardRef((props, ref) => {
  const { cid, agentName, store, keys } = props;

  const demoMode = useSelector((state) => state.agentReducer.demoMode);

  const MAX_HISTORY = 10;
  const [command, setCommand] = useState({ contents: "" });
  const [history, setHistory] = useState([]);

  /*
  The historyIndex -1 semantically represents the empty string, so
  users can "erase" the input field by pressing down arrow enough times.
  Similar behaviour to BASH
  */
  const [historyIndex, setHistoryIndex] = useState(-1);
  const commandState = useSelector((state) => state.agentReducer.commandState);
  let { contents } = command;

  useEffect(() => {
    ref.input.current.focus();
  });

  useEffect(() => {
    historyIndex == -1
      ? setCommand({ contents: "" })
      : setCommand({ contents: history[historyIndex] });
  }, [historyIndex]);

  const browseHistory = (e) => {
    if (e.key === "ArrowUp" && !e.ctrlKey && !demoMode)
      setHistoryIndex((i) =>
        i + 1 == MAX_HISTORY || i + 1 == history.length ? 0 : i + 1
      );
    if (e.key === "ArrowDown" && !e.ctrlKey && !demoMode)
      setHistoryIndex((i) => (i > -1 ? i - 1 : i));
  };

  let userName;
  agentName ? (userName = agentName) : (userName = "Guest");

  let prefix;
  cid ? (prefix = cid) : (prefix = ROOT_CONSOLE_VAL);

  /*Conditional JSX for the command line----------------------------*/
  let chatJsx = (
    <>
      {<span className="focusAgentName">{`${userName}`}</span>}
      {`<${prefix}> `}
    </>
  );

  let commandJsx = (
    <>
      {<span className="focusAgentName">{`${userName}`}</span>}
      <span className="command">{`<command> `}</span>
    </>
  );
  /*-----------------------------------------------------------------*/

  let output;

  commandState ? (output = commandJsx) : (output = chatJsx);

  return (
    <>
      <div onKeyDown={browseHistory}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!demoMode) {
              dispatchCommand(
                contents,
                cid,
                store,
                actions,
                sendChat,
                keys,
                commandState
              );
              if (commandState) {
                /*If in command mode, save the command in the history.*/
                setHistory((history) => {
                  let newArray = history.slice();
                  newArray.unshift(contents);
                  if (history.length == MAX_HISTORY) newArray.pop();
                  console.log(newArray);
                  return [...newArray];
                });
                setHistoryIndex(-1);
              }
              setCommand({ contents: "" });
            }
          }}
        >
          <label htmlFor="commandInput">{output}</label>
          <input
            ref={ref.input}
            className="commandInput"
            id="commandInput"
            name="command"
            value={contents}
            type="text"
            autoFocus={true}
            onChange={(e) => {
              setCommand({ contents: e.target.value });
            }}
          />
        </form>
      </div>
    </>
  );
});

export default ChatInput;

// let agentPrefix;
// agentName ? (agentPrefix = agentName) : (agentPrefix = "unknown");

// let name;
// agentName ? (name = agentName) : (name = "Guest");
