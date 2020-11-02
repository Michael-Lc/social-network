import React from "react";
import faker from "faker";

import "./styles/Home.css";

function Home() {
  const data = Array.from(Array(20), () => ({
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  }));

  return (
    <div className="container">
      {data.map((post) => (
        <div key={data.indexOf(post)} className="post">
          <div className="post-user">
            <img src={post.profileImage} alt="" />
            <span>{post.username}</span>
          </div>
          <div className="post-content">
            <p>{post.postContent}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
