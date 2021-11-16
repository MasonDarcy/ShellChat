import store from "../../store/store";
import { SUBSCRIBE_TO_FRIENDS } from "../types";
import ReconnectingEventSource from "reconnecting-eventsource";
import {
  COMMAND_SUCCESS_EVENT_KEY,
  NEW_FRIEND_MESSAGE_EVENT_KEY,
  FRIEND_HAS_LOGGED_ON_EVENT_KEY,
  FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
} from "../../constants/constants";
import {
  setSource,
  setSubscriberCallback,
} from "../subcriberHelpers/setSubscriberListeners";
import { getFriendEventTupleArray } from "../subcriberHelpers/getFriendEventTuples";
import { friendRequestReceivedAction } from "./friendRequestReceivedAction";
import { serverMessageAction } from "../messageActions/serverMessageAction";
import { logoutAction } from "../loginActions/logoutAction";

export const subscribeToFriendsAction = (agentName) => async (dispatch) => {
  /*Authorization is implicit here because this action only happens
  when the user logs in.*/

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
      { friendRequestReceivedAction, serverMessageAction, logoutAction },
      {
        COMMAND_SUCCESS_EVENT_KEY,
        NEW_FRIEND_MESSAGE_EVENT_KEY,
        FRIEND_HAS_LOGGED_ON_EVENT_KEY,
        FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
      }
    )
  );

  dispatch({
    type: SUBSCRIBE_TO_FRIENDS,
    payload: { friendSource: friendSource, isSubscribed: true },
  });
};
