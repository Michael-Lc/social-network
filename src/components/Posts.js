import React from "react";
import { Link } from "react-router-dom";

import NewPost from "./NewPost";
import PostOptions from "./PostOptions";

import styles from "./styles/Post.module.css";

function Posts(props) {
  const toggleOptions = () => {
    const modal = document.getElementById("modal");

    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <>
      {props.data.map((post) => (
        <div key={props.data.indexOf(post)} className={styles.post}>
          <div className={styles.postUser}>
            <Link to={{ pathname: `/user/${post.userId}` }}>
              <img
                src={post.profileImage}
                alt=""
                className={styles.profileImage}
              />
            </Link>
            <span className={styles.username}>
              <Link to={{ pathname: `/user/${post.userId}` }}>
                {post.username}
              </Link>
            </span>
            <button
              className={styles.openOptions}
              id="openOptions"
              onClick={toggleOptions}
            >
              <i className="down"></i>
            </button>
          </div>
          <Link to={{ pathname: `/post/${post.id}`, state: post }}>
            <div className={styles.postContent}>
              <p>{post.postContent}</p>
            </div>
          </Link>
          <div className={styles.bottomIconsContainer}>comment</div>
        </div>
      ))}
      <PostOptions />
      <NewPost />
    </>
  );
}

export default Posts;
