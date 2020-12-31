import { HIDE_ERROR } from "./types";

export const setHideError = () => (dispatch) => {
  dispatch({ type: HIDE_ERROR, payload: true });
};
