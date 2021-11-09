import { LOGIN, NEW_ERROR_MESSAGE } from "./types";
import sendLogin from "../authentication/sendLogin";
import store from "../store/store";
export const loginAction = (agentName, agentPassword) => (dispatch) => {
  if (store.getState().agentReducer.isLoggedOn) {
    dispatch({
      type: NEW_ERROR_MESSAGE,
      payload: {
        message: "error: currently logged in. Please /logout first.",
        eventName: "ERROR_EVENT",
      },
    });
  } else {
    sendLogin(agentName, agentPassword)
      .then(() => {
        dispatch({
          type: LOGIN,
          payload: { agentName: agentName, isLoggedOn: true },
        });
      })
      .catch((err) => {
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: invalid credentials.",
            eventName: "ERROR_EVENT",
          },
        });
      });
  }
};
