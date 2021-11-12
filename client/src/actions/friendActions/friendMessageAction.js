import { NEW_FRIEND_MESSAGE } from "../types";

export const friendMessageAction = (message, eventName) => (dispatch) => {
  dispatch({
    type: NEW_FRIEND_EVENT_MESSAGE,
    payload: {
      message: message,
      eventName: eventName,
    },
  });
};
