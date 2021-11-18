import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Terminal from "./components/Terminal";
import CodeEditor from "./components/prototypes/CodeMirrorEditor";

import "./App.css";
import keys from "./constants/constants";

//redux
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => (
  <Provider store={store}>
    <Auth />
    <Router>
      <Fragment>
        <Route
          exact
          path="/"
          render={(props) => <Terminal keys={keys} modules={CodeEditor} />}
        />
      </Fragment>
    </Router>
  </Provider>
);

export default App;

{
  /* <Route
exact
path="/proto"
render={(props) => (
  <>
    <CodeEditor />
  </>
)}
/> */
}
