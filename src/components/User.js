import React from "react";
import faker from "faker";

import withNavbar from "../hoc/withNavbar";
import Posts from "./Posts";

import styles from "./styles/User.module.css";

function User() {
  const data = Array.from(Array(5), () => ({
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  }));

  return (
    <div className="container">
      <div className={styles.details}>
        {/* <div className={styles.profilePicture}>Profile Picture</div> */}
        <img
          src={faker.image.avatar()}
          className={styles.profilePicture}
          alt="Profile"
        />
        <div>Name</div>
        <div>Description</div>
      </div>
      <Posts data={data} />
    </div>
  );
}

export default withNavbar(User);
