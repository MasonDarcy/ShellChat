import { types } from "../types";
import sendSignup from "../../authentication/sendSignup";
import { loginAction } from "./loginAction";
import keys from "../../constants/constants";

import store from "../../store/store";
export const signupAction = (agentName, agentPassword) => async (dispatch) => {
  if (store.getState().agentReducer.isLoggedOn) {
    dispatch({
      type: types.NEW_ERROR_MESSAGE,
      payload: {
        message:
          "error: currently logged in. Please sign out to create a new account.",
        eventName: keys.ERROR_EVENT_KEY,
      },
    });
  } else {
    let res = await sendSignup(agentName, agentPassword);

    switch (res.status) {
      case 201:
        dispatch({
          type: types.NEW_SERVER_MESSAGE,
          payload: {
            message: `Account successfully created.`,
            eventName: keys.COMMAND_SUCCESS_EVENT_KEY,
          },
        });
        dispatch(loginAction(agentName, agentPassword));
        break;
      case 400:
        dispatch({
          type: types.NEW_ERROR_MESSAGE,
          payload: {
            message:
              "Agent name already exists, please select a new user name.",
            eventName: keys.ERROR_EVENT_KEY,
          },
        });
        break;
      case 418:
        let errors = await res.json();
        console.log(`Errors:${errors}`);
        dispatch({
          type: types.NEW_ERROR_MESSAGE,
          payload: {
            message: `error: ${errors.err}`,
            eventName: keys.ERROR_EVENT_KEY,
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  }
};
