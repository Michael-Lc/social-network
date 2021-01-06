import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

export const PrivateRoute = (props) => {
  const { user, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.object,
  component: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
