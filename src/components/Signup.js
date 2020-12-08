import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const Signup = () => {
  return <div className="container">Sign Up</div>;
};

Signup.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
