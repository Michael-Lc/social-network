import React from "react";
import { Link } from "react-router-dom";
import faker from "faker";

import withNavbar from "../hoc/withNavbar";

import styles from "./styles/Comment.module.css";
import postStyles from "./styles/Post.module.css";

function Comment() {
  const comments = Array.from(Array(3), () => ({
    userId: faker.finance.account(8),
    username: faker.name.firstName(),
    profileImage: faker.image.avatar(),
    content: faker.lorem.sentence(),
  }));

  return (
    <div className="container">
      <div className={styles.post}>
        <div className={postStyles.postUser}>
          <Link to={{ pathname: `/user/${faker.finance.account(8)}` }}>
            <img
              src={faker.image.avatar()}
              alt=""
              className={postStyles.profileImage}
            />
          </Link>
          <Link to={{ pathname: `/user/${faker.finance.account(8)}` }}>
            <span className={postStyles.username}>{faker.name.lastName()}</span>
          </Link>
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
              <Link to={{ pathname: `/user/${comment.userId}` }}>
                <img
                  src={comment.profileImage}
                  alt=""
                  className={postStyles.profileImage}
                />
              </Link>
              <Link to={{ pathname: `/user/${comment.userId}` }}>
                <span className={postStyles.username}>{comment.username}</span>
              </Link>
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
