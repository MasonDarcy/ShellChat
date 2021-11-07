import { NEW_HELP_MESSAGE } from "./types";

export const helpMessageAction = (message, eventName) => (dispatch) => {
  dispatch({
    type: NEW_HELP_MESSAGE,
    payload: {
      message: message,
      eventName: eventName,
    },
  });
};
