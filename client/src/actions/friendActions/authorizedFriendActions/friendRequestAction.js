import { NEW_ERROR_MESSAGE, NEW_SERVER_MESSAGE } from "../../types";
import sendFriendRequest from "../../requestHelpers/sendFriendRequest";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../../constants/constants";
export const friendRequestAction = (targetAgentID) => async (dispatch) => {
  let res = await sendFriendRequest(targetAgentID);

  switch (res.status) {
    case 201:
      dispatch({
        type: NEW_SERVER_MESSAGE,
        payload: {
          message: `Sent friend request to ${targetAgentID}`,
          eventName: COMMAND_SUCCESS_EVENT_KEY,
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
    case 401:
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: "Authentication error. Please login.",
          eventName: "ERROR_EVENT",
        },
      });
      break;
    case 403:
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: `${targetAgentID} is already your friend.`,
          eventName: "ERROR_EVENT",
        },
      });
      break;
    case 400:
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: `You've already sent a request to ${targetAgentID}. `,
          eventName: "ERROR_EVENT",
        },
      });
      break;
    default:
      console.log("Should be unreachable");
  }
};
