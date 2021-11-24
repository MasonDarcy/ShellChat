import React from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import OutputMessage from "../OutputMessage";

function CodeOutput({ keys }) {
  const outputLog = useSelector((state) => state.codeModuleReducer.outputLog);

  const outputStatements = outputLog.map((msgData) => {
    console.log(msgData);
    return <OutputMessage key={v4()} data={msgData.data} />;
  });

  return <div>{outputStatements}</div>;
}

export default CodeOutput;
