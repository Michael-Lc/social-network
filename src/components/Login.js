import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./styles/Form.module.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const initialState = {
    email: "",
    password: "",
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
        <h1 className={styles.formTitle}>Log In</h1>
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
            <button type="submit" className={styles.submitBtn}>
              Log In
            </button>
          </div>
          <div className={styles.formGroup}>
            <span>
              Don't have an account?{" "}
              <Link to={{ pathname: `/signup` }}>Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
