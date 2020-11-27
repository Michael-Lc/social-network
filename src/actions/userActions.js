import { FETCH_USER } from "./types";
import faker from "faker";

export const fetchUser = () => (dispatch) => {
  const user = {
    userId: faker.finance.account(8),
    username: faker.name.firstName(),
    profilePicture: faker.image.avatar(),
    description: faker.random.words(10),
  };

  dispatch({
    type: FETCH_USER,
    payload: user,
  });
};
