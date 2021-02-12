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

export const newBatch = () => {
  const batch = firestore.batch();
  batch.set("ref", {});
  batch.commit();
};

export const fetchPosts = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  firestore
    .collection("posts")
    .orderBy("datePosted", "desc")
    .limit(12)
    .get()
    .then((docs) => {
      let docArray = [];
      // docs.forEach((doc) => docArray.push(doc.data()));
      docs.forEach((doc) => {
        const docData = doc.data();
        firestore
          .collection("users")
          .doc(docData.userId)
          .get()
          .then((userData) => {
            docData.username = userData.data().username;
            docData.profileImage = userData.data().profilePicture;
            docArray.push(docData);

            if (docArray.length === docs.size) {
              dispatch({
                type: FETCH_POSTS,
                payload: docArray,
              });
            }
          })
          .catch((err) => console.log(err));
      });

      // dispatch({
      //   type: FETCH_POSTS,
      //   payload: docArray,
      // });
    })
    .catch((err) => dispatch({ type: SET_ERROR, payload: err.message }))
    .catch((err) => console.log(err));

  // dispatch({
  //   type: FETCH_POSTS,
  //   payload: posts,
  // });
};

export const addPost = (post) => (dispatch) => {
  if (post.postContent[0] === " ") {
    return dispatch({
      type: SET_ERROR,
      payload: "Empty post or post beggining with space",
    });
  }

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
