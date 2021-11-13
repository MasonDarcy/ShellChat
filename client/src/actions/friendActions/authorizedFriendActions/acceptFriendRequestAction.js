import { NEW_SERVER_MESSAGE } from "../../types";
import { COMMAND_SUCCESS_EVENT_KEY } from "../../../constants/constants";
import { acceptFriendRequest } from "../../requestHelpers/acceptFriendRequest";
export const acceptFriendRequestAction = (accepteeAgent) => (dispatch) => {
  acceptFriendRequest(accepteeAgent)
    .then(() => {
      dispatch({
        type: NEW_SERVER_MESSAGE,
        payload: {
          message: `Accepted friend request from ${accepteeAgent}`,
          eventName: COMMAND_SUCCESS_EVENT_KEY,
        },
      });
    })
    .catch((err) => {});
};
