import React from "react";
import faker from "faker";

import withNavbar from "../hoc/withNavbar";

import styles from "./styles/Comment.module.css";
import postStyles from "./styles/Post.module.css";

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
          <img src={faker.image.avatar()} alt="profile" />
          <span>{faker.name.lastName()}</span>
        </div>
        <div className={postStyles.postContent}>
          <p>{faker.random.words()}</p>
        </div>
      </div>

      <div className={styles.commentContainer}>
        <span>3 Comments</span>
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
