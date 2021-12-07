import { NEW_ERROR_MESSAGE, NEW_SERVER_MESSAGE } from "../../types";
import getFriendListRequest from "../../requestHelpers/getFriendListRequest";
import { FRIEND_LIST_ITEM_EVENT_KEY } from "../../../constants/constants";
export const getFriendListAction = () => async (dispatch) => {
  let res = await getFriendListRequest();
  // console.log(`res: ${res.friendTupleArray}`);

  switch (res.status) {
    case 200:
      let friendTupleArray = await res.json();

      friendTupleArray.forEach((friend) => {
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `is `,
            embedded: friend.agentName,
            embedded2: `${friend.agentStatus ? "online" : "offline."}`,
            eventName: FRIEND_LIST_ITEM_EVENT_KEY,
          },
        });
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
    case 404:
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message:
            "error: you have no friends. Try the add friendName command.",
          eventName: "ERROR_EVENT",
        },
      });
      break;
    default:
      console.log("Should be unreachable");
  }
};
