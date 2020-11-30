import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../actions/postActions";

import styles from "./styles/NewPost.module.css";

function NewPost({ addPost }) {
  const [postContent, setPostContent] = useState("");

  const openMenu = ({ addPost }) => {
    const menu = document.getElementById("menu");
    const input = document.getElementById("postContent");
    menu.style.left = 0;
    menu.style.display = "flex";
    document.body.classList += " noScroll";
    input.focus();
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu");
    menu.style.left = "100%";

    setTimeout(() => (menu.style.display = "none"), 600);
    document.body.classList.remove("noScroll");
  };

  const createPost = () => {
    addPost(postContent);
    setPostContent("");
    document.getElementById("closeBtn").click();
  };

  return (
    <>
      <button className={styles.newPostBtn} onClick={openMenu}>
        New Post
      </button>

      <div className={styles.createPostContainer} id="menu">
        <div className={styles.topIconsContainer}>
          <button className={styles.closeBtn} onClick={closeMenu} id="closeBtn">
            &times;
          </button>
          <button className={styles.submitBtn} onClick={createPost}>
            post
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
    </>
  );
}

const mapDispatchToProps = {
  addPost,
};

export default connect(null, { ...mapDispatchToProps })(NewPost);
