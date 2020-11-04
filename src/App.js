import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import User from "./components/User";
import Comment from "./components/Comment";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
