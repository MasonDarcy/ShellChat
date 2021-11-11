import { NEW_MESSAGE } from "./types";
import sendFriendRequest from "./requestHelpers/sendFriendRequest";
import checkCredentials from "../authentication/checkCredentials";
export const friendRequestAction = (targetAgent) => async (dispatch) => {
  //Make an axios request here
  let { agentName } = await checkCredentials();

  if (agentName) {
    sendFriendRequest(agentName, targetAgent);

    dispatch({
      type: NEW_MESSAGE,
      payload: {
        message: `Sent friend request to ${targetAgent}`,
        eventName: "CHAT_EVENT",
      },
    });
  }
};
