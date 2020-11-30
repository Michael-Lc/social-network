import { FETCH_POSTS, NEW_POST, FETCH_USER_POSTS } from "./types";
import faker from "faker";

export const fetchPosts = () => (dispatch) => {
  const posts = Array.from(Array(20), () => ({
    id: faker.finance.account(10),
    userId: faker.finance.account(8),
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
    datePosted: faker.date.recent(),
  }));

  dispatch({
    type: FETCH_POSTS,
    payload: posts,
  });
};

export const addPost = (postContent) => (dispatch) => {
  const post = {
    id: faker.finance.account(10),
    userId: faker.finance.account(8),
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    datePosted: faker.date.recent(),
    postContent,
  };

  dispatch({
    type: NEW_POST,
    payload: post,
  });
};

export const fetchUserPosts = (userId) => (dispatch) => {
  const username = faker.name.lastName();
  const profileImage = faker.image.avatar();

  const userPosts = Array.from(Array(5), () => ({
    id: faker.finance.account(10),
    userId: userId,
    username: username,
    profileImage: profileImage,
    postContent: faker.lorem.sentence(),
    datePosted: faker.date.recent(),
  }));

  dispatch({
    type: FETCH_USER_POSTS,
    payload: userPosts,
  });
};
