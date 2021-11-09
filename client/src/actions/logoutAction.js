import { NEW_ERROR_MESSAGE, LOGOUT, UNSUBSCRIBE_TO_CHANNEL } from "./types";
import sendLogout from "../authentication/sendLogout";
import store from "../store/store";

export const logoutAction = () => async (dispatch) => {
  sendLogout()
    .then(() => {
      dispatch({
        type: LOGOUT,
        payload: { agentName: null, isLoggedOn: false },
      });

      let subscriptions = store.getState().subscribeToChannelReducer.source;
      if (subscriptions) {
        subscriptions.close();
      }

      dispatch({
        type: UNSUBSCRIBE_TO_CHANNEL,
        payload: { source: null, currentChannelID: null, isSubscribed: false },
      });
    })
    .catch((err) => {
      console.log("are we in here howd we get here");
      console.log(`Error: ${err}`);

      dispatch({
        type: NEW_ERROR_MESSAGE,
        payload: {
          message: "error: invalid credentials.",
          eventName: "ERROR_EVENT",
          //Fix this
        },
      });
    });
};
