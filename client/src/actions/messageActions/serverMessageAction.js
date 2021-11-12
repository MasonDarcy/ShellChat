import { NEW_SERVER_MESSAGE } from "../types";

export const serverMessageAction = (message, eventName) => (dispatch) => {
  dispatch({
    type: NEW_SERVER_MESSAGE,
    payload: {
      message: message,
      eventName: eventName,
    },
  });
};
