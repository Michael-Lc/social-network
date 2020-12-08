import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./styles/Form.module.css";

export const Signup = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(initialState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData(initialState);
    return;
  };

  return (
    <div className="container">
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Create Account</h1>
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              className={styles.formControl}
              type="text"
              value={data.username}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              className={styles.formControl}
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="example@example.com"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              className={styles.formControl}
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              id="confirmPassword"
              className={styles.formControl}
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitBtn}>
              Sign Up
            </button>
          </div>
          <div className={styles.formGroup}>
            <span>
              Already have an account?
              <Link to={{ pathname: `/login` }}>Log In</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

Signup.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
