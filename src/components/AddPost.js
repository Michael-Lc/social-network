import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";
import { PostIcon } from "./Icons";

import styles from "./styles/PostForm.module.css";

function AddPost({ user, addPost }) {
  const [postContent, setPostContent] = useState("");

  const openMenu = () => {
    const menu = document.getElementById("menu");
    const input = document.getElementById("postContent");
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

  const createPost = () => {
    const post = {
      userId: user.id,
      // username: user.username,
      // profileImage: user.profilePicture,
      postContent,
    };

    addPost(post);
    setPostContent("");
    document.getElementById("closeBtn").click();
  };

  return (
    <>
      <button className={styles.addPostBtn} onClick={openMenu}>
        <PostIcon />{" "}
        {window.matchMedia("(min-width: 769px)") && <span>New Post</span>}
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
              onClick={createPost}
              disabled={postContent.length === 0}
            >
              <PostIcon />
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
    </>
  );
}

AddPost.propTypes = {
  user: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
