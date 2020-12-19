import { FETCH_POSTS, FETCH_USER_POSTS, NEW_POST } from "../actions/types";

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
    case NEW_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        userPosts: [payload, ...state.posts],
      };

    default:
      return state;
  }
};
