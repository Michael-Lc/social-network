import React, { useEffect } from "react";
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
import EditProfile from "./components/EditProfile";
import ErrorAlert from "./components/ErrorAlert";
import PrivateRoute from "./components/PrivateRoute";

export const Main = (props) => {
  const { setUser, userLoading } = props;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user.uid);
      }
    });

    return unsubscribe;
  }, [setUser]);

  return (
    <Switch>
      {!userLoading && (
        <>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/user/:id" component={User} />
          <PrivateRoute
            exact
            path="/user/:id/update-profile"
            component={EditProfile}
          />
          <PrivateRoute exact path="/post/:id" component={Comment} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <ErrorAlert />
        </>
      )}
    </Switch>
  );
};

Main.propTypes = {
  setUser: PropTypes.func.isRequired,
  userLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userLoading: state.user.userLoading,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
