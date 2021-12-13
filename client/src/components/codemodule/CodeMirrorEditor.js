import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { types } from "../../actions/types";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";

const CodeEditor = React.forwardRef(
  ({ currentChannelID, agentName, keys }, ref) => {
    const [EditorRef, setEditorRef] = useState(null);
    const [code, setCode] = useState("");

    const dispatch = useDispatch();

    const handleEditorDidMount = (editor) => {
      setEditorRef(editor);
      editor.setSize("100%", "65%");
    };

    useEffect(() => {
      if (EditorRef) {
        dispatch({
          type: types.SET_EDITOR_REF,
          payload: {
            codeEditorRef: EditorRef,
          },
        });
        const ydoc = new Y.Doc(); //create a ydoc
        let provider = null;

        try {
          provider = new WebrtcProvider(currentChannelID, ydoc, {
            signaling: [
              "wss://signaling.yjs.dev",
              "wss://y-webrtc-signaling-eu.herokuapp.com",
              "wss://y-webrtc-signaling-us.herokuapp.com",
            ],
          });
          const yText = ydoc.getText("codemirror");
          const awareness = provider.awareness;

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
          dispatch({
            type: types.SET_EDITOR_REF,
            payload: {
              codeEditorRef: null,
            },
          });
        };
      }
    }, [EditorRef]);

    return (
      //  <div ref={ref} className="p-6">
      <div className="p-6">
        <CodeMirrorEditor
          onChange={(editor, data, value) => {
            setCode(value);
          }}
          value=""
          options={{
            mode: "text/javascript",
            lineNumbers: true,
            theme: "dracula",
          }}
          editorDidMount={(editor) => {
            handleEditorDidMount(editor);
            ref.editor = editor;
          }}
        ></CodeMirrorEditor>
      </div>
    );
  }
);

export default CodeEditor;
