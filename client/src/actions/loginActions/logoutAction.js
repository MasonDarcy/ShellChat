import {
  NEW_ERROR_MESSAGE,
  LOGOUT,
  UNSUBSCRIBE_TO_CHANNEL,
  UNSUBSCRIBE_TO_FRIENDS,
} from "../types";
import sendLogout from "../../authentication/sendLogout";
import store from "../../store/store";
import { ERROR_EVENT_KEY } from "../../constants/constants";

export const logoutAction = () => async (dispatch) => {
  sendLogout()
    .then(() => {
      dispatch({
        type: LOGOUT,
        payload: { agentName: null, isLoggedOn: false },
      });

      let subscriptions =
        store.getState().subscribeToChannelReducer.channelSource;
      if (subscriptions) {
        subscriptions.close();
      }

      let authSubscription = store.getState().subscribeToAuthReducer.authSource;
      authSubscription.close();

      dispatch({
        type: UNSUBSCRIBE_TO_CHANNEL,
        payload: {
          channelSource: null,
          currentChannelID: null,
          isSubscribed: false,
        },
      });

      store.getState().subscribeToFriendsReducer.friendSource.close();

      dispatch({
        type: UNSUBSCRIBE_TO_FRIENDS,
        payload: {
          friendSource: null,
          currentChannelID: null,
          isSubscribed: false,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: "error: invalid credentials.",
          eventName: ERROR_EVENT_KEY,
        },
      });
    });
};
