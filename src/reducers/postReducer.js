import {
  FETCH_POSTS,
  FETCH_USER_POSTS,
  NEW_POST,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  userPosts: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case FETCH_POSTS:
      return { ...state, posts: [...payload], loading: false };
    case FETCH_USER_POSTS:
      return { ...state, userPosts: [...payload], loading: false };
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
