import { FETCH_USER } from "./types";
import faker from "faker";

export const fetchUser = () => (dispatch) => {
  const user = {
    username: faker.name.firstName(),
    profilePicture: faker.image.avatar(),
    description: faker.random.words(10),
  };

  dispatch({
    type: FETCH_USER,
    payload: user,
  });
};
