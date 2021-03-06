import { LOGIN, NEW_ERROR_MESSAGE, NEW_SERVER_MESSAGE } from "../types";
import sendLogin from "../../authentication/sendLogin";
import { subscribeToFriendsAction } from "../friendActions/subscribeToFriendsAction";
import { subscribeToAuthAction } from "./subscribeToAuthAction";
import types from "../../constants/constants";

import store from "../../store/store";
export const loginAction = (agentName, agentPassword) => async (dispatch) => {
  if (store.getState().agentReducer.isLoggedOn) {
    dispatch({
      type: NEW_ERROR_MESSAGE,
      payload: {
        message: "error: currently logged in. Please logout first.",
        eventName: "ERROR_EVENT",
      },
    });
  } else {
    let res = await sendLogin(agentName, agentPassword);

    switch (res.status) {
      case 201:
        dispatch({
          type: LOGIN,
          payload: { agentName: agentName, isLoggedOn: true },
        });
        dispatch({
          type: NEW_SERVER_MESSAGE,
          payload: {
            message: `Logged on as `,
            eventName: types.AUTH_SUCCESS_EVENT_KEY,
            embedded: agentName,
          },
        });
        dispatch(subscribeToFriendsAction(agentName));
        dispatch(subscribeToAuthAction(agentName));

        break;
      case 404:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: user does not exist.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 400:
      case 401:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "error: invalid credentials.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  }
};
