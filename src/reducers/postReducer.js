import { FETCH_POSTS, FETCH_USER_POSTS } from "../actions/types";

const initialState = {
  posts: [],
  userPosts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return { ...state, posts: [...payload] };
    case FETCH_USER_POSTS:
      return { ...state, userPosts: [...payload] };

    default:
      return state;
  }
};
