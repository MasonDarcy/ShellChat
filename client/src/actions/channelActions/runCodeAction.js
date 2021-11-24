import { types } from "../types";
import runCodeRequest from "../requestHelpers/runCodeRequest";
export const runCodeAction =
  (script, agentID, channelID) => async (dispatch) => {
    let res = await runCodeRequest(script, agentID, channelID);
    let output = await res.json();
    console.log(output);
    console.log(`runCodeAction/output: ${output.output}`);
    console.log(`runCodeAction/statusCode: ${output.statusCode}`);

    dispatch({
      type: types.NEW_CODE_EDITOR_OUTPUT,
      payload: { data: output },
    });
  };
