import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Channel from "./components/Channel";

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={() => <>Base</>} />
      <Route
        exact
        path="/1"
        render={(props) => <Channel {...props} channelID={1} agentID={1} />}
      />
      <Route
        exact
        path="/2"
        render={(props) => <Channel {...props} channelID={2} agentID={2} />}
      />
    </Fragment>
  </Router>
);

export default App;
