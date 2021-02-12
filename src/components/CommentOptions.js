import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditIcon, DeleteIcon } from "./Icons";

import styles from "./styles/PostOptions.module.css";
import EditComment from "./EditComment";
import { deleteComment } from "../actions/commentActions";

export const CommentOptions = (props) => {
  const { comment, deleteComment } = props;
  const [showEdit, setShowEdit] = useState(false);
  // console.log(comment);

  const handleDelete = () => {
    document.getElementById("modal").style.display = "none";
    deleteComment(comment);
    return;
  };

  return (
    <>
      <div className={styles.modal} id="modal">
        <div className={styles.modalContent}>
          <button
            className={styles.modalBtn}
            onClick={() => {
              setShowEdit(true);
              document.getElementById("modal").style.display = "none";
            }}
          >
            <EditIcon />
            <span>Edit Comment</span>
          </button>
          <button className={styles.modalBtn} onClick={handleDelete}>
            <DeleteIcon /> <span>Delete Comment</span>
          </button>
        </div>
      </div>
      {showEdit && <EditComment comment={comment} setShowEdit={setShowEdit} />}
    </>
  );
};

CommentOptions.propTypes = {
  comment: PropTypes.object,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentOptions);
