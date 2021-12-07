import { NEW_SERVER_MESSAGE, NEW_ERROR_MESSAGE } from "../../types";
import keys from "../../../constants/constants";
import rejectFriendRequest from "../../requestHelpers/rejectFriendRequest";
export const rejectFriendRequestAction =
  (targetAgentID) => async (dispatch) => {
    let res = await rejectFriendRequest(targetAgentID);
    console.log(`rejectFriendRequestAction: ${res.status}`);
    switch (res.status) {
      case 201:
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `Rejected friend request from`,
            embedded: targetAgentID,
            eventName: keys.REJECT_FRIEND_REQUEST_EVENT_KEY,
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
      case 401:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: please login.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 418:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: target agent wasn't trying to be your friend yet.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 403:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: target user is already your friend.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  };
