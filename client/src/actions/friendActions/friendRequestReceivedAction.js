import { NEW_SERVER_MESSAGE } from "../types";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../constants/constants";
export const friendRequestReceivedAction = (sourceAgent) => (dispatch) => {
  dispatch({
    type: NEW_SERVER_MESSAGE,
    payload: {
      message: `Received friend request from ${sourceAgent}`,
      eventName: COMMAND_SUCCESS_EVENT_KEY,
    },
  });
};
