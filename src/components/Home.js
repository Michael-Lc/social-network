import React from "react";
import faker from "faker";

import Posts from "./Posts";

import withNavbar from "../hoc/withNavbar";

function Home() {
  const data = Array.from(Array(20), () => ({
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  }));

  return (
    <div className="container">
      <Posts data={data} />
    </div>
  );
}

export default withNavbar(Home);
