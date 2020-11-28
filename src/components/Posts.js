import React from "react";
import { Link } from "react-router-dom";

import NewPost from "./NewPost";

import styles from "./styles/Post.module.css";

function Posts(props) {
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
          </div>
          <Link to={{ pathname: `/post/${post.id}`, state: post }}>
            <div className={styles.postContent}>
              <p>{post.postContent}</p>
            </div>
          </Link>
          <div className={styles.bottomIconsContainer}>comment</div>
        </div>
      ))}
      <NewPost />
    </>
  );
}

export default Posts;
