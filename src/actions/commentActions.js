import { firestore } from "../firebase";
import { FETCH_POST, FETCH_COMMENTS } from "./types";
import faker from "faker";

export const fetchPost = (postId) => (dispatch) => {
  const post = {
    id: postId,
    userId: faker.finance.account(8),
    username: faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postContent: faker.lorem.sentence(),
  };

  firestore
    .collection("posts")
    .where("id", "==", postId)
    .get()
    .then((docs) => {
      if (docs.size === 1) {
        docs.forEach((doc) =>
          dispatch({ type: FETCH_POST, payload: doc.data() })
        );
      }
    });

  // dispatch({
  //   type: FETCH_POST,
  //   payload: post,
  // });
};

export const fetchComments = (postId) => (dispatch) => {
  const comments = Array.from(Array(3), () => ({
    postId: postId,
    id: faker.finance.account(),
    userId: faker.finance.account(8),
    username: faker.name.firstName(),
    profileImage: faker.image.avatar(),
    content: faker.lorem.sentence(),
  }));

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
