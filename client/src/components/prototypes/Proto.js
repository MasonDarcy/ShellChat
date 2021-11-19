import React from "react";
import SplitPane from "react-split-pane";
function Proto() {
  return (
    <SplitPane split="vertical" minSize={200} defaultSize={200} maxSize={400}>
      <div className="commandSuccess">WaaWAaa wee waa</div>
      <div className="commandSuccess">WaaWAaa wee waa</div>
    </SplitPane>
  );
}

export default Proto;
