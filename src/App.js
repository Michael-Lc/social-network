import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Main from "./Main";

import store from "./store";
console.log(store.getState());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
