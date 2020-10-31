import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import User from "./components/User";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={User} />
      </Switch>
    </Router>
  );
}

export default App;
