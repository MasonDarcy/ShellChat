import { NEW_SERVER_MESSAGE, NEW_ERROR_MESSAGE } from "../../types";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../../constants/constants";
import { acceptFriendRequest } from "../../requestHelpers/acceptFriendRequest";
export const acceptFriendRequestAction =
  (accepteeAgent) => async (dispatch) => {
    let res = await acceptFriendRequest(accepteeAgent);

    switch (res.status) {
      case 201:
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `Accepted friend request from ${accepteeAgent}`,
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
            message: "Authentication error, please login.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 418:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Target agent does not want to be your friend yet.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  };
