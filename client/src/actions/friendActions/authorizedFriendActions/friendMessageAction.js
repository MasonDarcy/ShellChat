import { NEW_SERVER_MESSAGE, NEW_ERROR_MESSAGE } from "../../types";
import { NEW_FRIEND_MESSAGE_EVENT_KEY } from "../../../constants/constants";
import { sendFriendMessage } from "../../requestHelpers/sendFriendMessage";
export const friendMessageAction =
  (targetAgent, message, agentName) => (dispatch) => {
    //Make a request here

    //Two criteria for this
    //1. Must be on your friends lsit
    //2. Must be online
    //2. (a) have to establish what it means to be "online"
    //2.

    sendFriendMessage(targetAgent, message, agentName)
      .then(() => {
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `<${agentName}>${message}`,
            eventName: NEW_FRIEND_MESSAGE_EVENT_KEY,
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
