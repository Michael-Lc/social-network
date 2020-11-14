import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./components/Home";
import User from "./components/User";
import Comment from "./components/Comment";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
