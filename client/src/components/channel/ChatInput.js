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
  const [historyIndex, setHistoryIndex] = useState(0);
  const inputEl = useRef(null);
  const commandState = useSelector((state) => state.agentReducer.commandState);
  let { contents } = command;

  const browseHistory = (e) => {
    if (history.length != 0) {
      if (e.key === "ArrowDown" && !e.ctrlKey) {
        if (historyIndex - 2 < 0) {
          setCommand({ contents: "" });
          setHistoryIndex(0);
        } else {
          setCommand({ contents: history[historyIndex - 2] });
          setHistoryIndex((hi) => {
            return hi - 1;
          });
        }
      }
      if (e.key === "ArrowUp" && !e.ctrlKey) {
        if (historyIndex == history.length) {
          setCommand({ contents: history[0] });
          setHistoryIndex(1);
        } else {
          setCommand({ contents: history[historyIndex] });
          setHistoryIndex((hi) => {
            return hi + 1;
          });
        }
      }
    }
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

  useEffect(() => {
    inputEl.current.focus();
  });
  //<div onKeyUp={commandSwap}>
  //<form
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
                return [...newArray];
              });
              setHistoryIndex(0);
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
// if(history.length == MAX_HISTORY) {
//   return [...history.unshift(contents).pop()]
// } else {
//   [...history.unshift(contents)]
// }

// const browseHistory = (e) => {
//   if (history.length != 0) {
//     if (e.key === "ArrowDown" && !e.ctrlKey) {
//       console.log(`historyIndex: ${historyIndex}`);
//       if (Math.abs(historyIndex) % history.length == 1) {
//         setCommand({
//           contents: " ",
//         });
//         setHistoryIndex(-1);
//       } else {
//         setCommand({
//           contents: history[Math.abs(historyIndex - 2) % history.length],
//         });
//         setHistoryIndex((hi) => {
//           return hi - 1;
//         });
//       }
//     }
//     if (e.key === "ArrowUp" && !e.ctrlKey) {
//       console.log(`historyIndex: ${historyIndex}`);

//       setCommand({
//         contents: history[Math.abs(historyIndex) % history.length],
//       });
//       setHistoryIndex((hi) => {
//         return hi + 1;
//       });
//     }
//   }
// };
