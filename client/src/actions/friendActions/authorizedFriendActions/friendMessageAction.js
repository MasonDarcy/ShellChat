import { NEW_SERVER_MESSAGE, NEW_ERROR_MESSAGE } from "../../types";
import { NEW_FRIEND_MESSAGE_EVENT_KEY } from "../../../constants/constants";
import { sendFriendMessage } from "../../requestHelpers/sendFriendMessage";
export const friendMessageAction =
  (targetAgent, message, agentName) => async (dispatch) => {
    let res = await sendFriendMessage(targetAgent, message, agentName);

    switch (res.status) {
      case 201:
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `<${agentName}>${message}`,
            eventName: NEW_FRIEND_MESSAGE_EVENT_KEY,
          },
        });
        break;
      case 404:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Target agent does not exist.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 403:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Target agent is not your friend.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 400:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Unauthorized action. Please login.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 418:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Agent is offline.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  };
