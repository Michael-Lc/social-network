import {
  FETCH_USER_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  userDetails: {},
  user: null,
  authError: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case FETCH_USER_DETAILS:
      return { ...state, userDetails: { ...payload } };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
        user: { ...payload },
        loading: false,
      };
    case LOGIN_ERROR:
      return { ...state, authError: payload, loading: false };
    case LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};
