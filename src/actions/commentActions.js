import { FETCH_POST, FETCH_COMMENTS } from "./types";
import faker from "faker";

export const fetchPost = (postId) => (dispatch) => {
  const post = {
    id: postId,
    userId: faker.finance.account(8),
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  };

  dispatch({
    type: FETCH_POST,
    payload: post,
  });
};

export const fetchComments = (postId) => (dispatch) => {
  const comments = Array.from(Array(3), () => ({
    postId: postId,
    id: faker.finance.account(),
    userId: faker.finance.account(8),
    username: faker.name.firstName(),
    profileImage: faker.image.avatar(),
    content: faker.lorem.sentence(),
  }));

  dispatch({
    type: FETCH_COMMENTS,
    payload: comments,
  });
};
