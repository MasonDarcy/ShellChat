import { NEW_MESSAGE } from "./types";

export const messageAction = (message) => (dispatch) => {
  dispatch({
    type: NEW_MESSAGE,
    payload: { message: message },
  });
};

//IDEA-TODO: Dispatch CSS classes with messages. Break up messages into multiple components (prefix-content)
