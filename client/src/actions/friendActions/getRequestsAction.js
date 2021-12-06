import { NEW_ERROR_MESSAGE, NEW_SERVER_MESSAGE } from "../types";
import getRequests from "../requestHelpers/getRequests";
import keys from "../../constants/constants";
export const getRequestsAction = () => async (dispatch) => {
  let res = await getRequests();

  switch (res.status) {
    case 200:
      let requestArray = await res.json();

      requestArray.forEach((request) => {
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `has invited you to be friends.`,
            embedded: request.agentName,
            eventName: keys.REQUEST_LIST_ITEM_EVENT_KEY,
          },
        });
      });
      break;
    case 401:
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: "Unauthorized action. Please login.",
          eventName: "ERROR_EVENT",
        },
      });
      break;
    case 404:
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: "You pending requests.",
          eventName: "ERROR_EVENT",
        },
      });
      break;
    default:
      console.log("Should be unreachable");
  }
};
