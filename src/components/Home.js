import React from "react";
import faker from "faker";

import withNavbar from "../hoc/withNavbar";

import styles from "./styles/Home.module.css";

function Home() {
  const data = Array.from(Array(20), () => ({
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  }));

  return (
    <div className="container">
      {data.map((post) => (
        <div key={data.indexOf(post)} className={styles.post}>
          <div className={styles.postUser}>
            <img src={post.profileImage} alt="" />
            <span>{post.username}</span>
          </div>
          <div className={styles.postContent}>
            <p>{post.postContent}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withNavbar(Home);
