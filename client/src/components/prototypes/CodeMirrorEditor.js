import React, { useState, useEffect } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";

function CodeEditor({ currentChannelID, agentName }) {
  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    if (EditorRef) {
      const ydoc = new Y.Doc(); //create a ydoc
      let provider = null;
      try {
        console.log(`ChannelID in code component:${currentChannelID} `);
        provider = new WebrtcProvider(currentChannelID, ydoc);
        const yText = ydoc.getText("codemirror");
        const awareness = provider.awareness;
        // signaling: [
        //   "wss://signaling.yjs.dev",
        //   'wss://y-webrtc-signaling-eu.herokuapp.com',
        //   'wss://y-webrtc-signaling-us.herokuapp.com'
        //
        console.log(`agentID in codemirror: ${agentName}`);
        awareness.setLocalStateField("user", {
          name: agentName,
          color: "#000000",
        });
        const getBinding = new CodemirrorBinding(yText, EditorRef, awareness);
      } catch (err) {
        alert(`Error:${err}`);
      }
      return () => {
        if (provider) {
          provider.disconnect();
          ydoc.destroy();
        }
      };
    }
  }, [EditorRef]);

  return (
    <div>
      <CodeMirrorEditor
        onChange={(editor, data, value) => {
          setCode(value);
        }}
        value=""
        options={{
          mode: "text/javascript",
          theme: "dracula",
          lineNumbers: true,
        }}
        editorDidMount={(editor) => {
          handleEditorDidMount(editor);
          editor.setSize("100vw", "100%");
        }}
      />
    </div>
  );
}

export default CodeEditor;
