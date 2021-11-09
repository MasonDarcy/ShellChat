import { LOGIN, NEW_ERROR_MESSAGE } from "./types";
import sendLogin from "../components/helpers/sendLogin";
export const loginAction = (agentName, agentPassword) => (dispatch) => {
  console.log(agentName);
  console.log(agentPassword);

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
};
