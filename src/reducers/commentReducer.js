import { FETCH_POST, FETCH_COMMENTS, SET_LOADING } from "../actions/types";

const initialState = {
  post: {},
  comments: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case FETCH_POST:
      return { ...state, post: { ...payload } };
    case FETCH_COMMENTS:
      return { ...state, comments: [...payload] };

    default:
      return state;
  }
};
