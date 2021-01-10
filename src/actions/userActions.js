import {
  FETCH_USER,
  SET_LOADING,
  FETCH_USER_DETAILS,
  LOGIN_SUCCESS,
  // LOGIN_ERROR,
  LOGOUT,
  UPDATE_PROFILE,
  // UPDATE_ERROR,
  SET_ERROR,
  LOGIN_ERROR,
} from "./types";
import firebase from "firebase/app";
import { auth, firestore } from "../firebase";
import faker from "faker";

export const setUser = (userId) => (dispatch) => {
  firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        dispatch({
          type: FETCH_USER,
          payload: doc.data(),
        });
      } else console.log("No such document");
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};

export const fetchUserDetails = (userId) => (dispatch) => {
  // const user = {
  //   userId: faker.finance.account(8),
  //   username: faker.name.firstName(),
  //   profilePicture: faker.image.avatar(),
  //   description: faker.random.words(10),
  // };

  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        dispatch({
          type: FETCH_USER_DETAILS,
          payload: doc.data(),
        });
      } else dispatch({ type: SET_ERROR, payload: "Unable to find user" });
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
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
      const newUser = firestore.collection("users").doc(user.user.uid);
      newUser
        .set({
          id: user.user.uid,
          username: credentials.username,
          email: credentials.email,
          profilePicture: faker.image.imageUrl(128, 128, "avatar", true),
          description: "",
        })
        .then(
          dispatch({
            type: LOGIN_SUCCESS,
            payload: user.user.uid,
          })
        )
        .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }));
      // .catch((err) => dispatch({ type: LOGIN_ERROR, payload: err.code }));
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }));
  // .catch((err) => dispatch({ type: LOGIN_ERROR, payload: err.code }));
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
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err.message });
      dispatch({ type: LOGIN_ERROR, payload: err.message });
    });
  // .catch((err) =>
  //   dispatch({
  //     type: LOGIN_ERROR,
  //     payload: err.code.replace("auth/", ""),
  //   })
  // );
};

export const logout = () => (dispatch) => {
  auth.signOut().then(
    dispatch({
      type: LOGOUT,
    })
  );
};

export const updateProfile = (credentials) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  const promises = [];
  const user = auth.currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    credentials.reauthPassword
  );

  const reAuth = user
    .reauthenticateWithCredential(cred)
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }));
  // .catch((err) => dispatch({ type: LOGIN_ERROR, payload: err.message }));

  if (credentials.email) {
    promises.push(
      reAuth.then((result) => result.user.updateEmail(credentials.email)),
      firestore
        .collection("users")
        .doc(credentials.id)
        .update({ email: credentials.email })
    );
  }

  if (credentials.username) {
    promises.push(
      reAuth.then(
        firestore
          .collection("users")
          .doc(credentials.id)
          .update({ username: credentials.username })
      )
    );
  }

  if (credentials.password) {
    promises.push(
      reAuth.then((result) => result.user.updatePassword(credentials.password))
    );
  }

  Promise.all(promises)
    .then(() => {
      delete credentials.password;

      dispatch({
        type: UPDATE_PROFILE,
        payload: credentials,
      });
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }));
  // .catch((err) => dispatch({ type: UPDATE_ERROR, payload: err.message }));
};
