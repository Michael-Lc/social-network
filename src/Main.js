import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { auth } from "./firebase";
import { Route, Switch } from "react-router-dom";
import { setUser } from "./actions/userActions";

import Home from "./components/Home";
import User from "./components/User";
import Comment from "./components/Comment";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const Main = (props) => {
  const { setUser } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user.uid);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser]);

  return (
    <Switch>
      {!loading && (
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/post/:id" component={Comment} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </>
      )}
    </Switch>
  );
};

Main.propTypes = {
  setUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
