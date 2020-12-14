import {
  SET_LOADING,
  FETCH_USER_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "./types";
import { auth } from "../firebase";
import faker from "faker";

export const fetchUserDetails = (userId) => (dispatch) => {
  const user = {
    userId: faker.finance.account(8),
    username: faker.name.firstName(),
    profilePicture: faker.image.avatar(),
    description: faker.random.words(10),
  };

  dispatch({
    type: FETCH_USER_DETAILS,
    payload: user,
  });
};

export const signup = (credentials) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  auth
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user.uid,
      })
    )
    .catch((err) => dispatch({ type: LOGIN_ERROR, payload: err.code }));
};

export const login = (credentials) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  auth
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user.uid,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_ERROR,
        payload: err.code.replace("auth/", ""),
      })
    );
};

export const logout = () => (dispatch) => {
  auth.signOut().then(
    dispatch({
      type: LOGOUT,
    })
  );
};
