import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editPost } from "../actions/postActions";

import styles from "./styles/PostForm.module.css";

export const EditPost = (props) => {
  const { post, editPost, setShowEdit } = props;

  const [postContent, setPostContent] = useState(post.postContent);

  const handlePostEdit = () => {
    const newPost = { ...post, postContent };
    editPost(newPost);
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
          <button className={styles.submitBtn} onClick={handlePostEdit}>
            Edit
          </button>
        </div>
        <div className={styles.inputContainer}>
          <form>
            <div className={styles.formControl}>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
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

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  setShowEdit: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  editPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
