import { NEW_HELP_MESSAGE } from "../types";

export const helpMessageAction = (helpJsx, eventName) => (dispatch) => {
  dispatch({
    type: NEW_HELP_MESSAGE,
    payload: {
      message: helpJsx,
      eventName: eventName,
    },
  });
};
