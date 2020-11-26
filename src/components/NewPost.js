import React from "react";

import styles from "./styles/NewPost.module.css";

function NewPost() {
  const openMenu = () => {
    const menu = document.getElementById("menu");
    const input = document.getElementById("postContent");
    menu.style.display = "flex";
    document.body.classList += " noScroll";
    input.focus();
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu");
    menu.style.display = "none";
    document.body.classList.remove("noScroll");
  };

  return (
    <>
      <button className={styles.newPostBtn} onClick={openMenu}>
        New Post
      </button>

      <div className={styles.createPostContainer} id="menu">
        <div className={styles.topIconsContainer}>
          <button className={styles.closeBtn} onClick={closeMenu}>
            &times;
          </button>
        </div>
        <div className={styles.inputContainer}>
          <form>
            <div className={styles.formControl}>
              <textarea
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

export default NewPost;
