import { firestore } from "../firebase";
import { FETCH_POSTS, NEW_POST, FETCH_USER_POSTS } from "./types";
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

  firestore
    .collection("posts")
    .get()
    .then((docs) => {
      let docArray = [];
      docs.forEach((doc) => docArray.push(doc.data()));

      dispatch({
        type: FETCH_POSTS,
        payload: docArray,
      });
    })
    .catch((err) => console.log(err));

  // dispatch({
  //   type: FETCH_POSTS,
  //   payload: posts,
  // });
};

export const addPost = (post) => (dispatch) => {
  firestore
    .collection("posts")
    .add({
      ...post,
    })
    .then((docRef) =>
      dispatch({
        type: NEW_POST,
        payload: post,
      })
    )
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
    .get()
    .then((docs) => {
      let docArray = [];
      docs.forEach((doc) => docArray.push(doc.data()));

      dispatch({
        type: FETCH_USER_POSTS,
        payload: docArray,
      });
    });

  // dispatch({
  //   type: FETCH_USER_POSTS,
  //   payload: userPosts,
  // });
};
