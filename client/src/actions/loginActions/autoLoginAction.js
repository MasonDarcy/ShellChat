import { AUTO_LOGIN, NEW_SERVER_MESSAGE } from "../types";
import keys from "../../constants/constants";
import checkCredentials from "../../authentication/checkCredentials";
import { subscribeToFriendsAction } from "../friendActions/subscribeToFriendsAction";
import { subscribeToAuthAction } from "./subscribeToAuthAction";

export const autoLoginAction = () => async (dispatch) => {
  let { agentName } = await checkCredentials();
  let logOnValue = false;

  !agentName ? (agentName = "null") : (logOnValue = true);

  dispatch({
    type: AUTO_LOGIN,
    payload: {
      isLoggedOn: logOnValue,
      agentName: agentName,
    },
  });

  //Add some logic here to subscribe to the friend service
  //Kind of an issue here, we're validating the users credentials twice
  if (logOnValue) {
    dispatch({
      type: NEW_SERVER_MESSAGE,
      payload: {
        message: `Resumed session as ${agentName}.`,
        eventName: keys.AUTH_SUCCESS_EVENT_KEY,
      },
    });
    dispatch(subscribeToFriendsAction(agentName));
    dispatch(subscribeToAuthAction(agentName));
  }
};
