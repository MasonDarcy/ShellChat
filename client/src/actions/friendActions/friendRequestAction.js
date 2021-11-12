import {
  NEW_FRIEND_EVENT_MESSAGE,
  NEW_ERROR_MESSAGE,
  NEW_SERVER_MESSAGE,
} from "../types";
import sendFriendRequest from "../requestHelpers/sendFriendRequest";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../constants/constants";
import checkCredentials from "../../authentication/checkCredentials";
import { errorMessageAction } from "../messageActions/errorMessageAction";
export const friendRequestAction = (targetAgent) => async (dispatch) => {
  let { agentName } = await checkCredentials();
  console.log("test");
  if (agentName) {
    sendFriendRequest(agentName, targetAgent)
      .then(() => {
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `Sent friend request to ${targetAgent}`,
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
  }
};
