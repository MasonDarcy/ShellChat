import { NEW_ERROR_MESSAGE } from "./types";

export const errorMessageAction = (message, eventName) => (dispatch) => {
  dispatch({
    type: NEW_ERROR_MESSAGE,
    payload: {
      message: message,
      eventName: eventName,
    },
  });
};
