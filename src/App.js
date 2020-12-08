import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./components/Home";
import User from "./components/User";
import Comment from "./components/Comment";
import Login from "./components/Login";
import Signup from "./components/Signup";

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
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
