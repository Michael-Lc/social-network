import { combineReducers } from "redux";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  posts: postReducer,
  user: userReducer,
  comments: commentReducer,
  error: errorReducer,
});
