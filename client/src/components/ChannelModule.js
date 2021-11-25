import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "./prototypes/CodeMirrorEditor";
import ScrunchPanel from "./prototypes/ScrunchPanel";

function ChannelModule({ keys, currentModule }) {
  const currentChannelID = useSelector(
    (state) => state.subscribeToChannelReducer.currentChannelID
  );

  const agentName = useSelector((state) => state.agentReducer.agentName);
  const scrunchyTopRef = useRef(null);
  const editorSizeRef = useRef(null);

  const [outputHeight, setOutputHeight] = useState(10);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      console.log(
        `ResizeObserve called: ${
          entries[0].target.getBoundingClientRect().height
        }`
      );
      setOutputHeight(entries[0].target.getBoundingClientRect().height);

      //lol
      // scrunchyTopRef.current.box.style.top = `${
      //   entries[0].target.getBoundingClientRect().height
      // }px`;
      //    scrunchyTopRef.current.box.style.top = `${entries[0].target.clientHeight}px`;

      //   scrunchyTopRef.current.handle.style.top = `${entries[0].target.clientHeight}px`;
    });
    console.log(`editorSizeRef.current: ${typeof editorSizeRef.current}`);
    resizeObserver.observe(editorSizeRef.current);

    return () => {
      resizeObserver.unobserve(editorSizeRef.current);
    };
  }, []);

  switch (currentModule) {
    case keys.CODE_MODULE_KEY:
      return (
        <>
          <CodeEditor
            ref={editorSizeRef}
            currentChannelID={currentChannelID}
            agentName={agentName}
            keys={keys}
          ></CodeEditor>
          <ScrunchPanel
            editorHeight={outputHeight}
            ref={scrunchyTopRef}
          ></ScrunchPanel>
        </>
      );
    default:
      console.log(`Default. currentModule: ${currentModule}`);
      console.log(`keys.CODE_MODULE_KEY: ${keys.CODE_MODULE_KEY}`);
      return null;
  }
}

export default ChannelModule;
