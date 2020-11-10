import React from "react";
import faker from "faker";

import withNavbar from "../hoc/withNavbar";

import styles from "./styles/Comment.module.css";
import postStyles from "./styles/Home.module.css";

function Comment() {
  const comments = Array.from(Array(3), () => ({
    username: faker.name.firstName(),
    profileImage: faker.image.avatar(),
    content: faker.lorem.sentence(),
  }));

  return (
    <div className="container">
      <div className={styles.post}>
        <div className={postStyles.postUser}>
          <img src="#" alt="" />
          <span>Username</span>
        </div>
        <div className={postStyles.postContent}>
          <p>Post</p>
        </div>
      </div>

      <div className={styles.commentContainer}>
        {comments.map((comment) => (
          <div className={styles.comment} key={comments.indexOf(comment)}>
            <div className={postStyles.postUser}>
              <img src={comment.profileImage} alt="" />
              <span>{comment.username}</span>
            </div>
            <div className={postStyles.postContent}>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withNavbar(Comment);
