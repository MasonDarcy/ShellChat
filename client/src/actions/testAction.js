import { CLEAR_MESSAGES } from "./types";

export const testAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};
