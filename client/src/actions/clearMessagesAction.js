import { CLEAR_MESSAGES } from "./types";

export const clearMessagesAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};
