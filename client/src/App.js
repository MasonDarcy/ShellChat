import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Channel from "./components/Channel";
import Terminal from "./components/Terminal";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Route exact path="/" render={(props) => <Terminal />} />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
