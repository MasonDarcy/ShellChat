import store from "../../store/store";
import { SUBSCRIBE_TO_FRIENDS } from "../types";
import ReconnectingEventSource from "reconnecting-eventsource";
import keys from "../../constants/constants";
import {
  setSource,
  setSubscriberCallback,
} from "../subcriberHelpers/setSubscriberListeners";
import { getFriendEventTupleArray } from "../subcriberHelpers/getFriendEventTuples";
import { friendRequestReceivedAction } from "./friendRequestReceivedAction";
import { friendMessageAction } from "./authorizedFriendActions/friendMessageAction";
import { serverMessageAction } from "../messageActions/serverMessageAction";
import { specialServerMessageAction } from "../messageActions/specialServerMessageAction";

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
      {
        friendRequestReceivedAction,
        serverMessageAction,
        logoutAction,
        friendMessageAction,
        specialServerMessageAction,
      },
      keys
    )
  );

  dispatch({
    type: SUBSCRIBE_TO_FRIENDS,
    payload: { friendSource: friendSource, isSubscribed: true },
  });
};
