import { NEW_ERROR_MESSAGE, NEW_SERVER_MESSAGE } from "../../types";
import sendFriendRequest from "../../requestHelpers/sendFriendRequest";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../../constants/constants";
export const friendRequestAction =
  (agentName, targetAgent) => async (dispatch) => {
    sendFriendRequest(agentName, targetAgent)
      .then(() => {
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `Sent friend request to ${targetAgent}.`,
            eventName: COMMAND_SUCCESS_EVENT_KEY,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Target agent does not exist.",
            eventName: "ERROR_EVENT",
          },
        });
      });
  };
