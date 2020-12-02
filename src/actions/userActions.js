import { FETCH_USER_DETAILS, LOGIN, LOGOUT } from "./types";
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

export const Login = () => (dispatch) => {
  const user = {
    id: faker.finance.account(8),
    username: faker.name.firstName(),
  };

  dispatch({
    type: LOGIN,
    payload: user,
  });
};

export const Logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
