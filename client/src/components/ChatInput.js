import React, { useState, useEffect } from "react";
import sendCommand from "./helpers/sendCommand";
import { useDispatch, useSelector} from "react-redux";
import {subscribeToChannel} from "../actions/subscribe";

function ChatInput() {
  const rootPrefixContent = `root`;
  let prefix = `<${rootPrefixContent}>`;
  const [command, setCommand] = useState({ contents: "" });
  let { contents } = command;
  const dispatch = useDispatch();
  let testFlag = true;


  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if(testFlag) {
            dispatch(subscribeToChannel({channelID:1}));
            testFlag = false;
            }
            sendCommand(e, contents);
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
