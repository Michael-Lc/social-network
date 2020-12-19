import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Main from "./Main";

import store from "./store";
console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Main />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
