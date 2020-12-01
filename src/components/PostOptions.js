import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Edit, Delete } from "./Icons";

import styles from "./styles/PostOptions.module.css";

export const PostOptions = () => {
  return (
    <>
      <div className={styles.modal} id="modal">
        <div className={styles.modalContent}>
          <button className={styles.modalBtn}>
            <Edit />
            <span>Edit Post</span>
          </button>
          <button className={styles.modalBtn}>
            <Delete /> <span>Delete Post</span>
          </button>
        </div>
      </div>
    </>
  );
};

PostOptions.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostOptions);
