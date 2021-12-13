import { types } from "../types";
import runCodeRequest from "../requestHelpers/runCodeRequest";
import keys from "../../constants/constants";

export const runCodeAction =
  (script, agentID, channelID, module) => async (dispatch) => {
    if (module) {
      let res = await runCodeRequest(script, agentID, channelID);
      let output = await res.json();

      dispatch({
        type: types.NEW_CODE_EDITOR_OUTPUT,
        payload: { data: output, time: new Date().toLocaleTimeString() },
      });
    } else {
      dispatch({
        type: types.NEW_ERROR_MESSAGE,
        payload: {
          message:
            "error: no active code module. Join a channel and load CODE.",
          eventName: keys.ERROR_EVENT_KEY,
        },
      });
    }
  };
