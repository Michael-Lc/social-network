import { firestore } from "../firebase";
import {
  FETCH_POST,
  FETCH_COMMENTS,
  SET_LOADING,
  NEW_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_ERROR,
} from "./types";
import faker from "faker";

export const fetchPost = (postId) => (dispatch) => {
  // const post = {
  //   id: postId,
  //   userId: faker.finance.account(8),
  //   username: faker.name.lastName(),
  //   profileImage: faker.image.avatar(),
  //   postContent: faker.lorem.sentence(),
  // };

  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  firestore
    .collection("posts")
    .doc(postId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        dispatch({ type: FETCH_POST, payload: doc.data() });
      } else {
        console.log("No such document");
      }
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));

  // dispatch({
  //   type: FETCH_POST,
  //   payload: post,
  // });
};

export const fetchComments = (postId) => (dispatch) => {
  // const comments = Array.from(Array(3), () => ({
  //   postId: postId,
  //   id: faker.finance.account(),
  //   userId: faker.finance.account(8),
  //   username: faker.name.firstName(),
  //   profileImage: faker.image.avatar(),
  //   content: faker.lorem.sentence(),
  // }));

  firestore
    .collection("comments")
    .where("postId", "==", postId)
    .get()
    .then((docs) => {
      let docArray = [];

      docs.forEach((doc) => docArray.push(doc.data()));

      dispatch({
        type: FETCH_COMMENTS,
        payload: docArray,
      });
    });

  // dispatch({
  //   type: FETCH_COMMENTS,
  //   payload: comments,
  // });
};

export const addComment = (comment) => (dispatch) => {
  const newComment = firestore.collection("comments").doc();
  comment.id = newComment.id;
  newComment
    .set(comment)
    .then(() =>
      dispatch({
        type: NEW_COMMENT,
        payload: comment,
      })
    )
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};

export const editComment = (comment) => (dispatch) => {
  firestore
    .collection("comments")
    .doc(comment.id)
    .update(comment)
    .then(dispatch({ type: EDIT_COMMENT, payload: comment }))
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};

export const deleteComment = (comment) => (dispatch) => {
  firestore
    .collection("comments")
    .doc(comment.id)
    .delete()
    .then(dispatch({ type: DELETE_COMMENT, payload: comment }))
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));
};
