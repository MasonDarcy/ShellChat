import { AUTO_LOGIN } from "./types";
import checkCredentials from "../authentication/checkCredentials";
import { subscribeToFriendsAction } from "./subscribeToFriendsAction";
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
    dispatch(subscribeToFriendsAction(agentName));
  }
};
