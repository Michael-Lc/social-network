import {
  FETCH_USER_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_LOADING,
  FETCH_USER,
  UPDATE_PROFILE,
  UPDATE_ERROR,
} from "../actions/types";

const initialState = {
  userDetails: {},
  user: null,
  authError: null,
  userLoading: true,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        user: payload === null ? null : { ...payload },
        userLoading: false,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    case FETCH_USER_DETAILS:
      return { ...state, userDetails: { ...payload }, loading: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
        user: { ...payload },
        loading: false,
      };
    case UPDATE_ERROR:
    case LOGIN_ERROR:
      return { ...state, authError: payload, loading: false };
    case LOGOUT:
      return { ...state, user: null };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...payload },
        loading: false,
        authError: null,
      };
    default:
      return state;
  }
};
