import {
  NEW_SERVER_MESSAGE,
  NEW_ERROR_MESSAGE,
  NEW_FRIEND_MESSAGE,
} from "../../types";
import { NEW_FRIEND_MESSAGE_EVENT_KEY } from "../../../constants/constants";
import { sendFriendMessage } from "../../requestHelpers/sendFriendMessage";
export const friendMessageAction =
  (targetAgentID, message, yourName) => async (dispatch) => {
    let res = await sendFriendMessage(targetAgentID, message);

    switch (res.status) {
      case 201:
        dispatch({
          type: NEW_FRIEND_MESSAGE,
          payload: {
            message: `${message}`,
            agent: yourName,
            eventName: NEW_FRIEND_MESSAGE_EVENT_KEY,
          },
        });
        break;
      case 404:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: target user does not exist.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 403:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: target user is not your friend.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 401:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: unauthorized action. Please login.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 418:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: user is offline.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  };
