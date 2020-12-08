import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditIcon, DeleteIcon } from "./Icons";

import styles from "./styles/PostOptions.module.css";

export const PostOptions = () => {
  return (
    <>
      <div className={styles.modal} id="modal">
        <div className={styles.modalContent}>
          <button className={styles.modalBtn}>
            <EditIcon />
            <span>Edit Post</span>
          </button>
          <button className={styles.modalBtn}>
            <DeleteIcon /> <span>Delete Post</span>
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
