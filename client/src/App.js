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
        <Route exact path="/" render={(props) => <Terminal channelID={0} />} />
        <Route exact path="/1" render={(props) => <Terminal channelID={1} />} />
        <Route
          exact
          path="/2"
          render={(props) => <Channel {...props} channelID={1} />}
        />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
