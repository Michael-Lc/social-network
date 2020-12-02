import { FETCH_USER_DETAILS, LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  userDetails: {},
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_DETAILS:
      return { ...state, userDetails: { ...payload } };
    case LOGIN:
      return { ...state, user: { ...payload } };
    case LOGOUT:
      return { ...state, user: {} };

    default:
      return state;
  }
};
