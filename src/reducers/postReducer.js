import { FETCH_POSTS } from "../actions/types";

const initialState = {
  posts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      return { ...state, posts: [...payload] };

    default:
      return state;
  }
};
