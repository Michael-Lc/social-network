import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editComment } from "../actions/commentActions";

import styles from "./styles/PostForm.module.css";

export const EditComment = (props) => {
  const { comment, editComment, setShowEdit } = props;

  const [commentContent, setCommentContent] = useState(comment.commentContent);

  const handlePostEdit = () => {
    if (comment.commentContent === commentContent) {
      return;
    }
    const newComment = { ...comment, commentContent };
    editComment(newComment);
    setShowEdit(false);
  };

  return (
    <div className={styles.createPostContainer} style={{ display: "flex" }}>
      <div className={styles.modal}>
        <div className={styles.topIconsContainer}>
          <button
            className={styles.closeBtn}
            onClick={() => setShowEdit(false)}
            id="closeBtn"
          >
            &times;
          </button>
          <button
            className={styles.submitBtn}
            onClick={handlePostEdit}
            disabled={commentContent.length === 0}
          >
            Edit
          </button>
        </div>
        <div className={styles.inputContainer}>
          <form>
            <div className={styles.formControl}>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className={styles.postInput}
                id="postContent"
                placeholder="Type here..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  setShowEdit: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  editComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
