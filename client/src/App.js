import React, { Fragment, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./components/utility/Auth";
import Terminal from "./components/Terminal";
import CodeEditor from "./components/codemodule/CodeMirrorEditor";
import "./App.css";
import keys from "./constants/constants";
import DemoWidget from "./components/Widgets/DemoWidget";
import { Provider } from "react-redux";
import store from "./store/store";
const App = () => {
  const demoRef = {
    input: useRef(null),
    editor: useRef(null),
    scroll: useRef(null),
  };

  const cmdToggle = (e) => {
    let demoMode = store.getState().agentReducer.demoMode;

    if (e.ctrlKey && e.key === "ArrowDown" && !demoMode) {
      store.dispatch({
        type: "SWAP_COMMAND_STATE",
      });
    }

    if (e.key === "x" && demoMode) {
      console.log("Fired cancel");
      store.dispatch({
        type: "AGENT_CANCELLED_DEMO",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", cmdToggle);

    return () => {
      document.removeEventListener("keydown", cmdToggle);
    };
  });

  return (
    <Provider store={store}>
      <Auth />
      <Router>
        <Fragment>
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <Terminal ref={demoRef} keys={keys} modules={CodeEditor} />
                <DemoWidget store={store} inputElement={demoRef} />
              </>
            )}
          />
          <Route exact path="/proto" render={(props) => <div />} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
