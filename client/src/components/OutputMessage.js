import React from "react";

function OutputMessage({ data }) {
  return <div className="codeOutputMessage">{data.output}</div>;
}

export default OutputMessage;
