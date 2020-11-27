import { FETCH_POSTS } from "./types";
import faker from "faker";

export const fetchPosts = () => (dispatch) => {
  const posts = Array.from(Array(20), () => ({
    id: faker.finance.account(10),
    userId: faker.finance.account(8),
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  }));

  dispatch({
    type: FETCH_POSTS,
    payload: posts,
  });
};
