import { FETCH_POST, FETCH_COMMENTS } from "../actions/types";

const initialState = {
  post: {},
  comments: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POST:
      return { ...state, post: { ...payload } };
    case FETCH_COMMENTS:
      return { ...state, comments: [...payload] };

    default:
      return state;
  }
};
