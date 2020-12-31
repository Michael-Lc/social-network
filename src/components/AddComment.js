import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../actions/commentActions";
import { PostIcon } from "./Icons";

import styles from "./styles/PostForm.module.css";

function AddComment({ user, post, addComment }) {
  const [commentContent, setCommentContent] = useState("");

  const openMenu = () => {
    const menu = document.getElementById("menu");
    const input = document.getElementById("commentContent");
    menu.style.left = 0;
    menu.style.display = "flex";
    if (!window.matchMedia("(min-width: 769px)")) {
      document.body.classList += " noScroll";
    }
    input.focus();
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu");
    menu.style.left = "100%";

    setTimeout(() => (menu.style.display = "none"), 600);
    document.body.classList.remove("noScroll");
  };

  const createComment = () => {
    const comment = {
      userId: user.id,
      postId: post.id,
      username: user.username,
      profileImage: user.profilePicture,
      datePosted: Date.now(),
      commentContent,
    };

    addComment(comment);
    setCommentContent("");
    document.getElementById("closeBtn").click();
  };

  return (
    <>
      <button className={styles.addCommentBtn} onClick={openMenu}>
        {/* <CommentIcon /> */} +
      </button>

      <div className={styles.createPostContainer} id="menu">
        <div className={styles.modal}>
          <div className={styles.topIconsContainer}>
            <button
              className={styles.closeBtn}
              onClick={closeMenu}
              id="closeBtn"
            >
              &times;
            </button>
            <button
              className={styles.submitBtn}
              onClick={createComment}
              disabled={commentContent.length === 0}
            >
              <PostIcon />
            </button>
          </div>
          <div className={styles.inputContainer}>
            <form>
              <div className={styles.formControl}>
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className={styles.postInput}
                  id="commentContent"
                  placeholder="Type here..."
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

AddComment.propTypes = {
  user: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
