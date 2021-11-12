import store from "../../store/store";
import { SUBSCRIBE_TO_FRIENDS, NEW_MESSAGE, NEW_ERROR_MESSAGE } from "../types";
import ReconnectingEventSource from "reconnecting-eventsource";
import {
  ERROR_EVENT_KEY,
  COMMAND_SUCCESS_EVENT_KEY,
} from "../../constants/constants";
import {
  setSource,
  setSubscriberCallback,
} from "../subcriberHelpers/setSubscriberListeners";
import { getFriendEventTupleArray } from "../subcriberHelpers/getFriendEventTuples";
import checkCredentials from "../../authentication/checkCredentials";
import { friendRequestReceivedAction } from "./friendRequestReceivedAction";
import { serverMessageAction } from "../messageActions/serverMessageAction";

export const subscribeToFriendsAction = (agentName) => async (dispatch) => {
  let { agentName } = await checkCredentials();

  if (agentName) {
    let friendSource = setSource(
      "http://localhost:5000/api/friends",
      [agentName],
      ReconnectingEventSource
    );
    setSubscriberCallback(
      friendSource,
      null,
      getFriendEventTupleArray(
        store,
        { friendRequestReceivedAction, serverMessageAction },
        { COMMAND_SUCCESS_EVENT_KEY }
      )
    );

    dispatch({
      type: SUBSCRIBE_TO_FRIENDS,
      payload: { friendSource: friendSource, isSubscribed: true },
    });
  } else {
    dispatch({
      type: NEW_ERROR_MESSAGE,
      payload: {
        message: "error: authorized command. Please login.",
        eventName: ERROR_EVENT_KEY,
      },
    });
  }
};
