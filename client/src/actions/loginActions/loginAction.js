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
        message: "error: currently logged in. Please /logout first.",
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
            message: `Logged on as ${agentName}.`,
            eventName: types.AUTH_SUCCESS_EVENT_KEY,
          },
        });
        dispatch(subscribeToFriendsAction(agentName));
        dispatch(subscribeToAuthAction(agentName));

        break;
      case 404:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Agent does not exist.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      case 400:
      case 401:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Invalid credentials.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log("Should be unreachable");
    }
  }
};

//   sendLogin(agentName, agentPassword)
//     .then(() => {
//       dispatch({
//         type: LOGIN,
//         payload: { agentName: agentName, isLoggedOn: true },
//       });

//       dispatch(subscribeToFriendsAction(agentName));
//       dispatch(subscribeToAuthAction(agentName));
//     })
//     .catch((err) => {
//       dispatch({
//         type: NEW_ERROR_MESSAGE,
//         payload: {
//           message: "error: invalid credentials.",
//           eventName: "ERROR_EVENT",
//         },
//       });
//     });
// }
