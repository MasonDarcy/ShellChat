import { NEW_ERROR_MESSAGE } from "./types";
import { ERROR_EVENT_KEY } from "../constants/constants";
import checkCredentials from "../authentication/checkCredentials";
export const authorizedAction = (action, parameters) => async (dispatch) => {
  let { agentName } = await checkCredentials();
  if (agentName) {
    parameters ? dispatch(action(...parameters)) : action();
  } else {
    dispatch({
      type: NEW_ERROR_MESSAGE,
      payload: {
        message: "error: authorized command. Please login.",
        eventName: ERROR_EVENT_KEY,
      },
    });
  }
};
