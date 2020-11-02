import React from "react";

import styles from "./styles/User.module.css";

function User() {
  return (
    <div className="container">
      <div className={styles.details}>
        <div className={styles.profilePicture}>Profile Picture</div>
        <div>Name</div>
        <div>Description</div>
      </div>
      <div>Posts</div>
    </div>
  );
}

export default User;
