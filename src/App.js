import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./components/Home";
import User from "./components/User";
import Comment from "./components/Comment";

import store from "./store";
console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/post/:id" component={Comment} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
