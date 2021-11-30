import React, { useState, useEffect, useRef } from "react";
import { ROOT_CONSOLE_VAL } from "../../resources/Strings";
import dispatchCommand from "../helpers/commandParser/dispatchCommand";
import actions from "../../actions";
import sendChat from "../helpers/sendChat";
import { useSelector } from "react-redux";

function ChatInput({ cid, agentName, store, keys }) {
  const MAX_HISTORY = 10;
  const [command, setCommand] = useState({ contents: "" });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputEl = useRef(null);
  const commandState = useSelector((state) => state.agentReducer.commandState);
  let { contents } = command;

  useEffect(() => {
    inputEl.current.focus();
  });
  useEffect(() => {
    historyIndex == -1
      ? setCommand({ contents: "" })
      : setCommand({ contents: history[historyIndex] });
  }, [historyIndex]);

  const browseHistory = (e) => {
    if (e.key === "ArrowUp" && !e.ctrlKey)
      setHistoryIndex((i) =>
        i + 1 == MAX_HISTORY || i + 1 == history.length ? 0 : i + 1
      );
    if (e.key === "ArrowDown" && !e.ctrlKey)
      setHistoryIndex((i) => (i > -1 ? i - 1 : i));
  };

  let prefix;
  let agentPrefix;
  agentName ? (agentPrefix = agentName) : (agentPrefix = "unknown");
  cid ? (prefix = cid) : (prefix = ROOT_CONSOLE_VAL);

  /*Conditional JSX for the command line----------------------------*/
  let chatJsx = (
    <>
      {<span className="focusAgentName">{`${agentName}`}</span>}
      {`<${prefix}> `}
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

  return (
    <>
      <div onKeyDown={browseHistory}>
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
            if (commandState) {
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
          }}
        >
          <label htmlFor="commandInput">{output}</label>
          <input
            ref={inputEl}
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
}

export default ChatInput;
