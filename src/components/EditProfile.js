import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../actions/userActions";

import styles from "./styles/Form.module.css";
import { Loading } from "./Icons";

export const EditProfile = (props) => {
  const { user, updateProfile, userLoading, loading, error } = props;
  if (error) {
    alert(error);
  }

  let initialState = {
    username: user.username,
    email: user.email,
    password: "",
    confirmPassword: "",
    reauthPassword: "",
  };

  const [data, setData] = useState(initialState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const credModal = document.getElementById("credentialsModal");
    const input = document.getElementById("reauthPassword");
    credModal.style.display = "block";
    input.focus();

    return;
  };

  const handleCredentialsSubmit = (event) => {
    event.preventDefault();
    document.getElementById("credentialsModal").style.display = "none";
    let newData = { id: user.id, reauthPassword: data.reauthPassword };

    if (data.password !== "" && data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      newData = { ...newData, password: data.password };
    }

    if (data.username !== "" && data.username !== user.username) {
      newData = { ...newData, username: data.username };
    }

    if (data.email !== "" && data.email !== user.email) {
      newData = { ...newData, email: data.email };
    }
    updateProfile(newData);
  };

  if (userLoading) {
    return (
      <div className="container">
        <Loading /> Fetching User Details
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Update Profile</h1>
        {loading && <div>updating...</div>}
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
              placeholder="Leave blank to keep the same"
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
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div className={styles.formGroup}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              Update Profile
            </button>
          </div>
          <div className={styles.formGroup}>
            <span>
              <Link to={{ pathname: `/` }}>Cancel</Link>
            </span>
          </div>
        </form>
      </div>

      <div id="credentialsModal" className={styles.credentialsModal}>
        <div className={styles.closeBtnContainer}>
          <button className={styles.closeBtn}>&times;</button>
        </div>
        <div className={styles.descriptionContainer}>
          <span className={styles.modalDescription}>
            Please enter your password(old) to authorize the updates
          </span>
        </div>
        <form onSubmit={handleCredentialsSubmit}>
          <div className={styles.formGroup}>
            <input
              id="reauthPassword"
              type="password"
              value={data.reauthPassword}
              onChange={handleChange}
              className={styles.formControl}
              placeholder="Enter password..."
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitBtn}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  userLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  error: state.user.authError,
  userLoading: state.user.userLoading,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
