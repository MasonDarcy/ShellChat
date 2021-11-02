import { NEW_MESSAGE } from "./types";

export const messageAction = (message) => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: { message: message },
  });
};
