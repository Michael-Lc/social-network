import React from "react";

import NewPost from "./NewPost";

import styles from "./styles/Post.module.css";

function Posts(props) {
  return (
    <>
      {props.data.map((post) => (
        <div key={props.data.indexOf(post)} className={styles.post}>
          <div className={styles.postUser}>
            <img src={post.profileImage} alt="" />
            <span>{post.username}</span>
          </div>
          <div className={styles.postContent}>
            <p>{post.postContent}</p>
          </div>
          <div className={styles.bottomIconsContainer}>comment</div>
        </div>
      ))}
      <NewPost />
    </>
  );
}

export default Posts;
