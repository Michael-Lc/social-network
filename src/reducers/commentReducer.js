import {
  FETCH_POST,
  FETCH_COMMENTS,
  SET_LOADING,
  NEW_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

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
      return { ...state, post: { ...payload }, loading: false };
    case FETCH_COMMENTS:
      return { ...state, comments: [...payload] };
    case NEW_COMMENT:
      return { ...state, comments: [payload, ...state.comments] };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.map((comment) => {
            if (comment.id === payload.id) {
              return { ...payload };
            } else return comment;
          }),
        ],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments.filter((comment) => comment.id !== payload.id),
        ],
      };

    default:
      return state;
  }
};
