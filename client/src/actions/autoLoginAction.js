import { AUTO_LOGIN } from "./types";
import checkCredentials from "../authentication/checkCredentials";
export const autoLoginAction = () => async (dispatch) => {
  let {agentName} = await checkCredentials();
  let logOnValue = false;

  !agentName ? (agentName = "null") : (logOnValue = true);

  dispatch({
    type: AUTO_LOGIN,
    payload: {
      isLoggedOn: logOnValue,
      agentName: agentName,
    },
  });
};
