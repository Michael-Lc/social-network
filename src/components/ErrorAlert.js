import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setHideError } from "../actions/errorActions";

import styles from "./styles/Modal.module.css";

export const ErrorAlert = (props) => {
  const { hideError, errorMessage, setHideError } = props;

  if (hideError) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>!Error</div>
      <div className={styles.modalBody}>{errorMessage}</div>
      <div className={styles.modalBtnContainer}>
        <button className={styles.modalClose} onClick={setHideError}>
          Close
        </button>
      </div>
    </div>
  );
};

ErrorAlert.propTypes = {
  hideError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  errorMessage: state.error.errorMessage,
  hideError: state.error.hideError,
});

const mapDispatchToProps = {
  setHideError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);
