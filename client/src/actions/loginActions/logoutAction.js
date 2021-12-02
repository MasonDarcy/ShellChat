import { types } from "../types";
import sendLogout from "../../authentication/sendLogout";
import store from "../../store/store";
import keys from "../../constants/constants";

export const logoutAction = (agentID) => async (dispatch) => {
  sendLogout()
    .then(() => {
      dispatch({
        type: types.LOGOUT,
        payload: { agentName: null, isLoggedOn: false },
      });

      dispatch({
        type: types.NEW_SERVER_MESSAGE,
        payload: {
          message: `Logged out from `,
          eventName: keys.AUTH_SUCCESS_EVENT_KEY,
          embedded: agentID,
        },
      });

      let subscriptions =
        store.getState().subscribeToChannelReducer.channelSource;
      if (subscriptions) {
        subscriptions.close();
      }

      let authSubscription = store.getState().subscribeToAuthReducer.authSource;
      authSubscription.close();

      dispatch({
        type: types.UNSUBSCRIBE_TO_CHANNEL,
        payload: {
          channelSource: null,
          currentChannelID: null,
          isSubscribed: false,
        },
      });

      store.getState().subscribeToFriendsReducer.friendSource.close();

      dispatch({
        type: types.UNSUBSCRIBE_TO_FRIENDS,
        payload: {
          friendSource: null,
          currentChannelID: null,
          isSubscribed: false,
        },
      });

      dispatch({
        type: types.UNLOAD_CHANNEL_MODULE,
        payload: {
          currentModule: null,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.NEW_ERROR_MESSAGE,
        payload: {
          message: "error: invalid credentials.",
          eventName: keys.ERROR_EVENT_KEY,
        },
      });
    });
};
