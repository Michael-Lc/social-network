import {
  FETCH_USER,
  SET_LOADING,
  FETCH_USER_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "./types";
import { auth, firestore } from "../firebase";
import faker from "faker";

export const setUser = (userId) => (dispatch) => {
  firestore
    .collection("users")
    .where("id", "==", userId)
    .get()
    .then((data) => {
      let userData = {};
      data.forEach((user) => (userData = { ...user.data() }));

      dispatch({
        type: FETCH_USER,
        payload: userData,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchUserDetails = (userId) => (dispatch) => {
  // const user = {
  //   userId: faker.finance.account(8),
  //   username: faker.name.firstName(),
  //   profilePicture: faker.image.avatar(),
  //   description: faker.random.words(10),
  // };

  firestore
    .collection("users")
    .where("id", "==", userId)
    .get()
    .then((data) => {
      let userData = {};
      data.forEach((user) => (userData = { ...user.data() }));

      dispatch({
        type: FETCH_USER_DETAILS,
        payload: userData,
      });
    })
    .catch((err) => console.log(err));

  // dispatch({
  //   type: FETCH_USER_DETAILS,
  //   payload: user,
  // });
};

export const signup = (credentials) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  auth
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((user) => {
      const collection = firestore.collection("users");
      collection
        .add({
          id: user.user.uid,
          username: credentials.username,
          email: credentials.email,
          profilePicture: faker.image.avatar(),
          description: "",
        })
        .then((docRef) => {
          console.log(docRef);

          dispatch({
            type: LOGIN_SUCCESS,
            payload: user.user.uid,
          });
        })
        .catch((err) => dispatch({ type: LOGIN_ERROR, payload: err.code }));
    })
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
