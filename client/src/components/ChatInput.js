import React, { useState } from "react";
import sendChat from "./helpers/sendChat";
import { useDispatch, useSelector } from "react-redux";
import { ROOT_CONSOLE_VAL } from "../resources/Strings";
import getDispatchArgument from "./helpers/commandParser/getDispatchArgument";

function ChatInput({ cid, setMessageList }) {
  const [command, setCommand] = useState({ contents: "" });

  let { contents } = command;
  let dispatch = useDispatch();
  let prefix;
  cid ? (prefix = cid) : (prefix = ROOT_CONSOLE_VAL);

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            let action = getDispatchArgument(contents);

            if (action) {
              action.status === "success"
                ? dispatch(action.cb(...action.args))
                : setMessageList((oldState) => [
                    ...oldState,
                    `<${prefix}>${action.errMessage}`,
                  ]);
            } else {
              cid
                ? sendChat(contents, cid)
                : setMessageList((oldState) => [
                    ...oldState,
                    `<${prefix}>${contents}`,
                  ]);
            }

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
