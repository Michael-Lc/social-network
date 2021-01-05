import { firestore, timestamp } from "../firebase";
import {
  FETCH_POSTS,
  NEW_POST,
  FETCH_USER_POSTS,
  SET_LOADING,
  DELETE_POST,
  EDIT_POST,
  SET_ERROR,
} from "./types";
import faker from "faker";

export const newPostsBatch = () => {
  const batch = firestore.batch();

  const posts = Array.from(Array(20), () => ({
    id: faker.finance.account(10),
    userId: faker.finance.account(8),
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
    datePosted: faker.date.recent(),
  }));

  posts.forEach((post) => {
    const ref = firestore.collection("posts").doc();
    batch.set(ref, post);
  });

  batch
    .commit()
    .then((a) => console.log(a))
    .catch((err) => console.log(err));
};

export const fetchPosts = () => (dispatch) => {
  // const posts = Array.from(Array(20), () => ({
  //   id: faker.finance.account(10),
  //   userId: faker.finance.account(8),
  //   username: faker.name.lastName(),
  //   profileImage: faker.image.avatar(),
  //   postContent: faker.lorem.sentence(),
  //   datePosted: faker.date.recent(),
  // }));
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  firestore
    .collection("posts")
    .orderBy("datePosted", "desc")
    .get()
    .then((docs) => {
      let docArray = [];
      docs.forEach((doc) => docArray.push(doc.data()));
      // docs.forEach((doc) => {
      //   const docData = doc.data();
      //   firestore
      //     .collection("users")
      //     .doc(docData.userId)
      //     .get()
      //     .then((userData) => {
      //       docData.username = userData.data().username;
      //       docData.profileImage = userData.data().profilePicture;
      //       docArray.push(docData);

      // if (docArray.length === docs.size) {
      //   dispatch({
      //     type: FETCH_POSTS,
      //     payload: docArray,
      //   });
      // }
      //     })
      //     .catch((err) => console.log(err));
      // });

      dispatch({
        type: FETCH_POSTS,
        payload: docArray,
      });
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));

  // dispatch({
  //   type: FETCH_POSTS,
  //   payload: posts,
  // });
};

export const addPost = (post) => (dispatch) => {
  const newPost = firestore.collection("posts").doc();
  post.id = newPost.id;
  post.datePosted = timestamp.now();
  newPost
    .set(post)
    .then(() =>
      dispatch({
        type: NEW_POST,
        payload: post,
      })
    )
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};

export const fetchUserPosts = (userId) => (dispatch) => {
  // const username = faker.name.lastName();
  // const profileImage = faker.image.avatar();

  // const userPosts = Array.from(Array(5), () => ({
  //   id: faker.finance.account(10),
  //   userId: userId,
  //   username: username,
  //   profileImage: profileImage,
  //   postContent: faker.lorem.sentence(),
  //   datePosted: faker.date.recent(),
  // }));

  firestore
    .collection("posts")
    .where("userId", "==", userId)
    .orderBy("datePosted", "desc")
    .get()
    .then((docs) => {
      let docArray = [];
      firestore
        .collection("users")
        .doc(userId)
        .get()
        .then((userData) => {
          docs.forEach((doc) => {
            const docData = doc.data();
            docData.username = userData.data().username;
            docData.profileImage = userData.data().profilePicture;
            docArray.push(docData);
          });

          dispatch({
            type: FETCH_USER_POSTS,
            payload: docArray,
          });
        })
        .catch((err) => console.log(err));
      // docs.forEach((doc) => docArray.push(doc.data()));
    });

  // dispatch({
  //   type: FETCH_USER_POSTS,
  //   payload: userPosts,
  // });
};

export const editPost = (post) => (dispatch) => {
  firestore
    .collection("posts")
    .doc(post.id)
    .update(post)
    .then(dispatch({ type: EDIT_POST, payload: post }))
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};

export const deletePost = (post) => (dispatch) => {
  firestore
    .collection("posts")
    .doc(post.id)
    .delete()
    .then(dispatch({ type: DELETE_POST, payload: post }))
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};
