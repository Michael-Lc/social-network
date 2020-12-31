import { SET_ERROR, HIDE_ERROR } from "../actions/types";

const initialState = {
  errorMessage: "",
  hideError: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HIDE_ERROR:
      return { ...state, hideError: true };
    case SET_ERROR:
      return { ...state, errorMessage: payload, hideError: false };

    default:
      return state;
  }
};
