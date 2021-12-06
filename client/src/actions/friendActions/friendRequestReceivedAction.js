import { NEW_SERVER_MESSAGE } from "../types";
import {
  COMMAND_SUCCESS_EVENT_KEY,
  SENT_FRIEND_REQUEST_KEY,
} from "../../constants/constants";
export const friendRequestReceivedAction = (sourceAgent) => (dispatch) => {
  dispatch({
    type: NEW_SERVER_MESSAGE,
    payload: {
      message: `Received friend request from `,
      embedded: sourceAgent,
      eventName: SENT_FRIEND_REQUEST_KEY,
    },
  });
};
