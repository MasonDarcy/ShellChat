import { NEW_SERVER_MESSAGE } from "../types";

export const specialServerMessageAction =
  (message, embedded, eventName) => (dispatch) => {
    dispatch({
      type: NEW_SERVER_MESSAGE,
      payload: {
        message: message,
        embedded: embedded,
        eventName: eventName,
      },
    });
  };
