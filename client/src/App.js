import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./components/utility/Auth";
import Terminal from "./components/Terminal";
import CodeEditor from "./components/codemodule/CodeMirrorEditor";
import "./App.css";
import keys from "./constants/constants";
//redux
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  const cmdToggle = (e) => {
    if (e.ctrlKey && e.key === "ArrowDown") {
      //dispatch an action
      store.dispatch({
        type: "SWAP_COMMAND_STATE",
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
            render={(props) => <Terminal keys={keys} modules={CodeEditor} />}
          />
          <Route exact path="/proto" render={(props) => <div />} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
